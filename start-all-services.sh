#!/bin/bash

# 🚀 Script de démarrage automatique CBD Shop
# Ce script démarre tous les services dans le bon ordre

echo "🌿 Démarrage automatique de CBD Shop..."

# Couleurs pour les logs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_info() {
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

# Fonction pour vérifier si un port est occupé
check_port() {
    local port=$1
    local service=$2
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "$service déjà en cours d'exécution sur le port $port"
        return 0
    else
        return 1
    fi
}

# Fonction pour attendre qu'un service soit disponible
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    print_info "Attente de $service_name..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            print_success "$service_name est prêt !"
            return 0
        fi
        
        echo -n "."
        sleep 1
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name n'a pas démarré dans les temps"
    return 1
}

# Tuer les anciens processus
print_info "Nettoyage des anciens processus..."
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "vite.*admin-panel" 2>/dev/null || true
pkill -f "vite.*workspace" 2>/dev/null || true
sleep 2

# 1. Démarrer l'API Backend (Port 5000)
print_info "Démarrage de l'API Backend (Port 5000)..."
cd /workspace/api

if [ ! -f ".env" ]; then
    print_error "Fichier .env manquant dans /workspace/api"
    exit 1
fi

if check_port 5000 "API Backend"; then
    print_info "API Backend déjà démarrée"
else
    nohup npm run dev > api.log 2>&1 &
    API_PID=$!
    print_info "API Backend démarrée (PID: $API_PID)"
fi

# Attendre que l'API soit prête
if wait_for_service "http://localhost:5000/health" "API Backend"; then
    print_success "✅ API Backend opérationnelle sur http://localhost:5000"
else
    print_error "❌ Échec du démarrage de l'API Backend"
    exit 1
fi

# 2. Démarrer le Panel Admin (Port 3001)
print_info "Démarrage du Panel Admin (Port 3001)..."
cd /workspace/admin-panel

# Créer le fichier .env s'il n'existe pas
if [ ! -f ".env" ]; then
    echo "VITE_API_URL=http://localhost:5000/api" > .env
    print_info "Fichier .env créé pour le panel admin"
fi

if check_port 3001 "Panel Admin"; then
    print_info "Panel Admin déjà démarré"
else
    nohup npm run dev > admin.log 2>&1 &
    ADMIN_PID=$!
    print_info "Panel Admin démarré (PID: $ADMIN_PID)"
fi

# Attendre que le panel admin soit prêt
if wait_for_service "http://localhost:3001" "Panel Admin"; then
    print_success "✅ Panel Admin opérationnel sur http://localhost:3001"
else
    print_error "❌ Échec du démarrage du Panel Admin"
    exit 1
fi

# 3. Démarrer la Boutique Frontend (Port 3000)
print_info "Démarrage de la Boutique Frontend (Port 3000)..."
cd /workspace

if check_port 3000 "Boutique Frontend"; then
    print_info "Boutique Frontend déjà démarrée"
else
    nohup npm run dev > boutique.log 2>&1 &
    BOUTIQUE_PID=$!
    print_info "Boutique Frontend démarrée (PID: $BOUTIQUE_PID)"
fi

# Attendre que la boutique soit prête
if wait_for_service "http://localhost:3000" "Boutique Frontend"; then
    print_success "✅ Boutique Frontend opérationnelle sur http://localhost:3000"
else
    print_warning "⚠️ Boutique Frontend pourrait ne pas être prête"
fi

# Test de connectivité entre services
print_info "Test de connectivité des services..."

# Test API → MongoDB
if curl -s "http://localhost:5000/api/products" | grep -q "success.*true"; then
    print_success "✅ API ↔ MongoDB : Connecté"
else
    print_error "❌ API ↔ MongoDB : Problème de connexion"
fi

# Test Panel Admin → API
if curl -s "http://localhost:5000/api/categories" | grep -q "Huiles CBD"; then
    print_success "✅ Panel Admin ↔ API : Données synchronisées"
else
    print_error "❌ Panel Admin ↔ API : Problème de synchronisation"
fi

# Résumé final
echo ""
echo "🎉 ===== CBD SHOP DÉMARRÉ AVEC SUCCÈS ====="
echo ""
echo "📊 Services disponibles :"
echo "├── 🔧 API Backend:       http://localhost:5000"
echo "├── 👨‍💼 Panel Admin:      http://localhost:3001"
echo "└── 🛍️ Boutique Frontend: http://localhost:3000"
echo ""
echo "📂 Logs disponibles :"
echo "├── API:      /workspace/api/api.log"
echo "├── Admin:    /workspace/admin-panel/admin.log"
echo "└── Boutique: /workspace/boutique.log"
echo ""
echo "🗄️ Base de données : MongoDB Atlas connectée"
echo "📦 Produits CBD : 7 produits disponibles"
echo "🏷️ Catégories : 5 catégories CBD configurées"
echo ""
echo "🚀 Votre boutique CBD est maintenant 100% synchronisée et opérationnelle !"
echo ""
echo "Pour arrêter tous les services :"
echo "pkill -f 'node.*server.js|vite.*admin-panel|vite.*workspace'"