#!/bin/bash

echo "🚀 Démarrage de tous les services..."

# Fonction pour vérifier si un port est utilisé
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Le port $1 est déjà utilisé"
        return 1
    else
        return 0
    fi
}

# Fonction pour attendre qu'un service soit prêt
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo "⏳ Attente de $service_name..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo "✅ $service_name est prêt!"
            return 0
        fi
        echo "   Tentative $attempt/$max_attempts..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "❌ $service_name n'a pas démarré dans le temps imparti"
    return 1
}

# Vérifier les ports
echo "🔍 Vérification des ports..."
check_port 5000 || exit 1
check_port 3000 || exit 1
check_port 3001 || exit 1

# Démarrer l'API
echo "🔌 Démarrage de l'API..."
cd api
npm run dev &
API_PID=$!
cd ..

# Attendre que l'API soit prête
wait_for_service "http://localhost:5000/health" "API"

# Initialiser la base de données si nécessaire
echo "🗄️  Initialisation de la base de données..."
cd api
npm run init-db
cd ..

# Démarrer la boutique
echo "🛍️  Démarrage de la boutique..."
npm run dev &
SHOP_PID=$!

# Démarrer le panel admin
echo "⚙️  Démarrage du panel admin..."
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
echo "🛑 Pour arrêter tous les services, appuyez sur Ctrl+C"

# Fonction de nettoyage
cleanup() {
    echo ""
    echo "🛑 Arrêt des services..."
    kill $API_PID 2>/dev/null
    kill $SHOP_PID 2>/dev/null
    kill $ADMIN_PID 2>/dev/null
    echo "✅ Services arrêtés"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre indéfiniment
wait