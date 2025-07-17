#!/bin/bash

echo "🐳 Démarrage de MongoDB avec Docker..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier si le conteneur MongoDB existe déjà
if docker ps -a --format 'table {{.Names}}' | grep -q "mongodb-shop"; then
    echo "🔄 Conteneur MongoDB existant trouvé..."
    
    # Démarrer le conteneur existant
    docker start mongodb-shop
    echo "✅ Conteneur MongoDB démarré"
else
    echo "🆕 Création d'un nouveau conteneur MongoDB..."
    
    # Créer et démarrer un nouveau conteneur MongoDB
    docker run -d \
        --name mongodb-shop \
        -p 27017:27017 \
        -e MONGO_INITDB_DATABASE=shop \
        -v mongodb_data:/data/db \
        mongo:latest
    
    echo "✅ Conteneur MongoDB créé et démarré"
fi

echo "⏳ Attente du démarrage de MongoDB..."
sleep 5

echo "🔍 Vérification de la connexion MongoDB..."
if docker exec mongodb-shop mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
    echo "✅ MongoDB est prêt !"
    echo "📊 URL de connexion: mongodb://localhost:27017/shop"
else
    echo "❌ Erreur de connexion à MongoDB"
    exit 1
fi

echo ""
echo "🚀 Vous pouvez maintenant démarrer l'API avec:"
echo "   cd api && npm start"
echo ""
echo "🌐 Et le panel d'administration avec:"
echo "   cd admin-panel && npm run dev"