# Installation MongoDB Local

## 🖥️ Option 1 : Installation via Package Manager

### Ubuntu/Debian
```bash
# Importer la clé publique MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Ajouter le repository MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Mettre à jour les packages
sudo apt-get update

# Installer MongoDB
sudo apt-get install -y mongodb-org

# Démarrer MongoDB
sudo systemctl start mongod

# Activer MongoDB au démarrage
sudo systemctl enable mongod

# Vérifier le statut
sudo systemctl status mongod
```

### macOS (avec Homebrew)
```bash
# Installer MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Démarrer MongoDB
brew services start mongodb/brew/mongodb-community

# Vérifier le statut
brew services list | grep mongodb
```

### Windows
1. Téléchargez MongoDB depuis [mongodb.com/try/download/community](https://mongodb.com/try/download/community)
2. Installez avec l'installateur
3. MongoDB démarrera automatiquement

## 🐳 Option 2 : Docker (Recommandé)

### Installer Docker
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# macOS
brew install docker docker-compose

# Windows
# Téléchargez Docker Desktop depuis docker.com
```

### Lancer MongoDB avec Docker
```bash
# Créer un dossier pour les données
mkdir -p ~/mongodb-data

# Lancer MongoDB
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v ~/mongodb-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  mongo:6.0

# Vérifier que le container fonctionne
docker ps
```

### Avec Docker Compose
Créer un fichier `docker-compose.yml` :
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6.0
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Lancer avec :
```bash
docker-compose up -d
```

## ⚙️ Configuration de l'API

### Pour MongoDB local sans authentification
```env
MONGODB_URI=mongodb://localhost:27017/boutique_admin
```

### Pour MongoDB local avec authentification
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/boutique_admin?authSource=admin
```

### Pour MongoDB Docker
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/boutique_admin?authSource=admin
```

## 🚀 Tester la connexion

1. **Vérifier que MongoDB fonctionne**
```bash
# Se connecter à MongoDB
mongosh
# ou
mongo

# Dans le shell MongoDB
use boutique_admin
db.test.insertOne({test: "Hello MongoDB!"})
db.test.find()
exit
```

2. **Tester avec l'API**
```bash
cd api
npm install
npm run seed
npm run dev
```

## 🔧 Dépannage

### MongoDB ne démarre pas
```bash
# Vérifier les logs
sudo journalctl -u mongod

# Redémarrer le service
sudo systemctl restart mongod
```

### Erreur de connexion
- Vérifiez que MongoDB écoute sur le port 27017
- Vérifiez les paramètres d'authentification
- Vérifiez que l'utilisateur a les bonnes permissions

### Avec Docker
```bash
# Voir les logs du container
docker logs mongodb

# Redémarrer le container
docker restart mongodb

# Accéder au shell MongoDB
docker exec -it mongodb mongosh
```

## 📊 Outils de gestion

### MongoDB Compass (Interface graphique)
1. Téléchargez [MongoDB Compass](https://mongodb.com/try/download/compass)
2. Installez et lancez
3. Connectez-vous avec votre URI

### Studio 3T (Alternative)
1. Téléchargez [Studio 3T](https://studio3t.com/)
2. Installez et lancez
3. Connectez-vous avec votre URI