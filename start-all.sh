#!/bin/bash

# Script de démarrage pour CBD Shop
echo "🌿 Démarrage de CBD Shop..."

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
print_message() {
    echo -e "${GREEN}[CBD Shop]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERREUR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Vérifier si MongoDB est installé
if ! command -v mongod &> /dev/null; then
    print_warning "MongoDB n'est pas installé. Tentative de démarrage avec Docker..."
    
    # Vérifier si Docker est installé
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé. Veuillez installer MongoDB ou Docker."
        exit 1
    fi
    
    # Démarrer MongoDB avec Docker
    print_info "Démarrage de MongoDB avec Docker..."
    docker run -d --name mongodb-cbd-shop -p 27017:27017 \
        -e MONGO_INITDB_DATABASE=cbd_shop \
        -v mongodb_cbd_data:/data/db \
        mongo:latest
    
    if [ $? -eq 0 ]; then
        print_message "MongoDB démarré avec Docker sur le port 27017"
    else
        # Le conteneur existe peut-être déjà
        print_info "Tentative de redémarrage du conteneur existant..."
        docker start mongodb-cbd-shop
    fi
else
    # Démarrer MongoDB local
    print_info "Démarrage de MongoDB local..."
    mongod --dbpath ./data/db --fork --logpath ./mongodb.log
fi

# Attendre que MongoDB soit prêt
print_info "Attente de MongoDB..."
sleep 5

# Vérifier la connexion MongoDB
print_info "Test de connexion MongoDB..."
mongosh --eval "db.adminCommand('ping')" --quiet
if [ $? -eq 0 ]; then
    print_message "MongoDB est prêt ✅"
else
    print_error "Impossible de se connecter à MongoDB ❌"
    exit 1
fi

# Démarrer l'API en arrière-plan
print_info "Démarrage de l'API CBD Shop..."
cd api
npm install > /dev/null 2>&1
npm run dev &
API_PID=$!
cd ..

# Attendre que l'API soit prête
print_info "Attente de l'API..."
sleep 10

# Tester l'API
API_RESPONSE=$(curl -s http://localhost:5000/health)
if [[ $API_RESPONSE == *"success"* ]]; then
    print_message "API CBD Shop prête sur http://localhost:5000 ✅"
else
    print_error "L'API ne répond pas correctement ❌"
fi

# Démarrer le panel admin
print_info "Démarrage du Panel Admin..."
cd admin-panel
npm install > /dev/null 2>&1
npm run dev &
ADMIN_PID=$!
cd ..

# Démarrer la boutique
print_info "Démarrage de la Boutique..."
npm install > /dev/null 2>&1
npm run dev &
SHOP_PID=$!

# Afficher les informations de connexion
sleep 5
echo ""
print_message "🌿 CBD Shop démarré avec succès!"
echo ""
print_info "📱 Boutique Client:    http://localhost:3000"
print_info "👨‍💼 Panel Admin:        http://localhost:3001"
print_info "🔧 API Backend:        http://localhost:5000"
print_info "📊 API Health:         http://localhost:5000/health"
echo ""
print_warning "Pour arrêter tous les services, utilisez: ./stop-all.sh"
echo ""
print_message "Appuyez sur Ctrl+C pour arrêter tous les services"

# Fonction pour arrêter proprement les services
cleanup() {
    echo ""
    print_info "Arrêt des services..."
    kill $API_PID $ADMIN_PID $SHOP_PID 2>/dev/null
    print_message "Services arrêtés ✅"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre indéfiniment
while true; do
    sleep 1
done