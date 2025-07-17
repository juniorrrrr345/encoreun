#!/bin/bash

# Script de déploiement Vercel automatique

echo "🚀 Déploiement Vercel - Panel Admin et Boutique"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI n'est pas installé"
    echo "Installez-le avec: npm i -g vercel"
    exit 1
fi

# Vérifier que l'utilisateur est connecté
if ! vercel whoami &> /dev/null; then
    print_warning "Vous n'êtes pas connecté à Vercel"
    echo "Connectez-vous avec: vercel login"
    exit 1
fi

print_status "Configuration vérifiée"

# Build et déploiement du Panel Admin
echo ""
echo "📱 Déploiement du Panel Admin..."

cd admin-panel

print_status "Build du panel admin..."
if npm run build; then
    print_status "Build réussi"
else
    print_error "Erreur de build du panel admin"
    exit 1
fi

print_status "Déploiement du panel admin..."
if vercel --prod --yes; then
    print_status "Panel admin déployé avec succès"
else
    print_error "Erreur de déploiement du panel admin"
    exit 1
fi

cd ..

# Build et déploiement de la Boutique
echo ""
echo "🛍️  Déploiement de la Boutique..."

cd boutique

print_status "Build de la boutique..."
if npm run build; then
    print_status "Build réussi"
else
    print_error "Erreur de build de la boutique"
    exit 1
fi

print_status "Déploiement de la boutique..."
if vercel --prod --yes; then
    print_status "Boutique déployée avec succès"
else
    print_error "Erreur de déploiement de la boutique"
    exit 1
fi

cd ..

echo ""
print_status "🎉 Déploiement terminé !"
echo ""
echo "📋 URLs de déploiement :"
echo "   Panel Admin: https://admin-votre-projet.vercel.app"
echo "   Boutique: https://boutique-votre-projet.vercel.app"
echo ""
echo "🔧 Pour configurer les variables d'environnement :"
echo "   vercel env add VITE_API_URL"
echo ""
echo "📊 Pour voir les logs :"
echo "   vercel logs --follow"