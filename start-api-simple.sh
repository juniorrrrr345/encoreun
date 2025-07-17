#!/bin/bash

echo "🌿 Démarrage de l'API CBD Shop (Mode Autonome)"
echo "=================================================="
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

print_info "Version Node.js: $(node --version)"

# Aller dans le dossier API
cd api

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    print_info "Installation des dépendances..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dépendances installées"
    else
        print_error "Erreur lors de l'installation des dépendances"
        exit 1
    fi
else
    print_success "Dépendances déjà installées"
fi

# Créer le dossier uploads s'il n'existe pas
if [ ! -d "uploads" ]; then
    mkdir uploads
    print_info "Dossier uploads créé"
fi

# Créer le dossier data s'il n'existe pas
if [ ! -d "data" ]; then
    mkdir data
    print_info "Dossier data créé"
fi

print_info "Démarrage de l'API en mode autonome..."
print_warning "✋ Mode sans MongoDB - Base de données en mémoire avec persistance JSON"
echo ""

# Démarrer l'API
npm run dev

echo ""
print_info "Pour arrêter l'API, appuyez sur Ctrl+C"