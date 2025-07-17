#!/bin/bash

# Script pour démarrer la boutique et le panel admin en parallèle

echo "🚀 Démarrage de la boutique et du panel admin..."

# Fonction pour arrêter tous les processus
cleanup() {
    echo "🛑 Arrêt des applications..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Capturer Ctrl+C pour arrêter proprement
trap cleanup SIGINT

# Démarrer la boutique
echo "📱 Démarrage de la boutique..."
cd boutique && npm run dev &
BOUTIQUE_PID=$!

# Attendre un peu puis démarrer le panel admin
sleep 2
echo "⚙️  Démarrage du panel admin..."
cd ../admin-panel && npm run dev &
ADMIN_PID=$!

echo "✅ Applications démarrées !"
echo "📱 Boutique: http://localhost:5173"
echo "⚙️  Panel Admin: http://localhost:5174"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les applications"

# Attendre que tous les processus se terminent
wait