#!/bin/bash

echo "🚀 Démarrage du système e-commerce complet..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher un message avec couleur
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si les ports sont disponibles
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "Le port $1 est déjà utilisé"
        return 1
    else
        return 0
    fi
}

# Attendre qu'un service soit prêt
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    print_status "Attente de $service_name..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            print_success "$service_name est prêt!"
            return 0
        fi
        echo "   Tentative $attempt/$max_attempts..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name n'a pas démarré dans le temps imparti"
    return 1
}

# Vérifier les ports
print_status "Vérification des ports..."
check_port 5000 || exit 1
check_port 5173 || exit 1
check_port 5174 || exit 1

# Démarrer l'API
print_status "Démarrage de l'API..."
cd api
npm run dev &
API_PID=$!
cd ..

# Attendre que l'API soit prête
wait_for_service "http://localhost:5000/health" "API"

# Démarrer la boutique
print_status "Démarrage de la boutique..."
npm run dev &
SHOP_PID=$!

# Démarrer le panel admin
print_status "Démarrage du panel admin..."
cd admin-panel
npm run dev &
ADMIN_PID=$!
cd ..

# Attendre que tous les services soient prêts
wait_for_service "http://localhost:5173" "Boutique"
wait_for_service "http://localhost:5174" "Panel Admin"

echo ""
echo "🎉 Tous les services sont démarrés!"
echo ""
echo "📱 Boutique: http://localhost:5173"
echo "⚙️  Panel Admin: http://localhost:5174"
echo "🔌 API: http://localhost:5000"
echo ""
echo "🔑 Identifiants admin:"
echo "   Email: admin@example.com"
echo "   Mot de passe: admin123"
echo ""
echo "📊 Données disponibles:"
echo "   - 6 catégories (Vêtements, Beauté, Maison, Bijoux, Tech, Sport)"
echo "   - 6 produits avec images et descriptions"
echo "   - Statistiques complètes"
echo ""
echo "🛑 Pour arrêter tous les services, appuyez sur Ctrl+C"

# Fonction de nettoyage
cleanup() {
    echo ""
    print_status "Arrêt des services..."
    kill $API_PID 2>/dev/null
    kill $SHOP_PID 2>/dev/null
    kill $ADMIN_PID 2>/dev/null
    print_success "Services arrêtés"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre indéfiniment
wait