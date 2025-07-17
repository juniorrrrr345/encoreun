#!/bin/bash

# 🧪 Test de cohérence des URLs CBD Shop
# Ce script vérifie que toutes les URLs sont cohérentes dans tous les fichiers

echo "🧪 Test de cohérence des URLs CBD Shop..."

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Test 1: Vérifier les URLs dans les fichiers de configuration
print_test "Vérification des URLs dans les fichiers de configuration..."

# Vérifier .env de l'API
if grep -q "CORS_ORIGIN=http://localhost:3000,http://localhost:3001" api/.env; then
    print_success "URLs CORS correctes dans api/.env"
else
    print_error "URLs CORS incorrectes dans api/.env"
fi

# Vérifier .env du panel admin
if grep -q "VITE_API_URL=http://localhost:5000/api" admin-panel/.env; then
    print_success "URL API correcte dans admin-panel/.env"
else
    print_error "URL API incorrecte dans admin-panel/.env"
fi

# Vérifier .env de la boutique
if grep -q "VITE_API_URL=http://localhost:5000/api" .env; then
    print_success "URL API correcte dans .env (boutique)"
else
    print_error "URL API incorrecte dans .env (boutique)"
fi

# Test 2: Vérifier les ports dans vite.config.js
print_test "Vérification des ports dans les configurations Vite..."

if grep -q "port: 3000" vite.config.js; then
    print_success "Port 3000 correct pour la boutique"
else
    print_error "Port incorrect pour la boutique"
fi

if grep -q "port: 3001" admin-panel/vite.config.js; then
    print_success "Port 3001 correct pour le panel admin"
else
    print_error "Port incorrect pour le panel admin"
fi

# Test 3: Vérifier les URLs dans le script de démarrage
print_test "Vérification du script de démarrage..."

if grep -q "http://localhost:5000" start-all-services.sh && 
   grep -q "http://localhost:3001" start-all-services.sh && 
   grep -q "http://localhost:3000" start-all-services.sh; then
    print_success "URLs correctes dans start-all-services.sh"
else
    print_error "URLs incorrectes dans start-all-services.sh"
fi

# Test 4: Tester la connectivité des services
print_test "Test de connectivité des services..."

# Test API Backend
if curl -s "http://localhost:5000/health" >/dev/null 2>&1; then
    print_success "API Backend accessible sur http://localhost:5000"
else
    print_error "API Backend non accessible sur http://localhost:5000"
fi

# Test Panel Admin
if curl -s "http://localhost:3001" >/dev/null 2>&1; then
    print_success "Panel Admin accessible sur http://localhost:3001"
else
    print_error "Panel Admin non accessible sur http://localhost:3001"
fi

# Test Boutique Frontend
if curl -s "http://localhost:3000" >/dev/null 2>&1; then
    print_success "Boutique Frontend accessible sur http://localhost:3000"
else
    print_error "Boutique Frontend non accessible sur http://localhost:3000"
fi

# Test 5: Vérifier la cohérence dans package.json
print_test "Vérification des package.json..."

if grep -q "cbd-shop" package.json && 
   grep -q "cbd-shop" admin-panel/package.json && 
   grep -q "cbd-shop" api/package.json; then
    print_success "Noms cohérents dans les package.json"
else
    print_error "Noms incohérents dans les package.json"
fi

# Test 6: Vérifier le fichier config.json
print_test "Vérification du fichier config.json central..."

if [ -f "config.json" ] && jq -e '.services.api.url == "http://localhost:5000"' config.json >/dev/null 2>&1; then
    print_success "Configuration centrale cohérente"
else
    print_error "Configuration centrale manquante ou incorrecte"
fi

echo ""
echo "🎯 Résumé des URLs CBD Shop :"
echo "├── API Backend:       http://localhost:5000"
echo "├── Panel Admin:       http://localhost:3001"
echo "├── Boutique Frontend: http://localhost:3000"
echo "├── API Health:        http://localhost:5000/health"
echo "└── API Endpoints:     http://localhost:5000/api"
echo ""
echo "📋 Configuration CORS autorise :"
echo "├── http://localhost:3000 (Boutique)"
echo "├── http://localhost:3001 (Admin)"
echo "├── http://localhost:5173 (Vite dev)"
echo "└── http://localhost:4173 (Vite preview)"
echo ""
echo "✅ Test de cohérence terminé !"