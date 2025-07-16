# 🚀 Démarrage Rapide - API Boutique

## Option 1 : MongoDB Atlas (Recommandé)

### 1. Créer un compte MongoDB Atlas
- Allez sur [mongodb.com/atlas](https://mongodb.com/atlas)
- Créez un compte gratuit
- Créez un cluster gratuit (M0 Sandbox)

### 2. Configurer l'API
```bash
cd api
cp .env.example .env
```

Éditez `.env` avec votre URI MongoDB Atlas :
```env
MONGODB_URI=mongodb+srv://admin:votre_mot_de_passe@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority
```

### 3. Installer et démarrer
```bash
npm install
npm run test-db    # Tester la connexion
npm run seed       # Initialiser les données
npm run dev        # Démarrer l'API
```

## Option 2 : MongoDB Local avec Docker

### 1. Lancer MongoDB
```bash
cd api
docker-compose up -d mongodb
```

### 2. Configurer l'API
```bash
cp .env.example .env
```

Éditez `.env` :
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/boutique_admin?authSource=admin
```

### 3. Installer et démarrer
```bash
npm install
npm run test-db
npm run seed
npm run dev
```

## Option 3 : Tout avec Docker

### 1. Lancer l'API et MongoDB
```bash
cd api
docker-compose up -d
```

### 2. Initialiser les données
```bash
docker-compose exec api npm run seed
```

## ✅ Vérification

L'API devrait être accessible sur :
- **URL** : http://localhost:5000
- **Health Check** : http://localhost:5000/health
- **Documentation** : http://localhost:5000

### Identifiants de test
- **Email** : admin@boutique.com
- **Mot de passe** : admin123

## 🔧 Commandes utiles

```bash
# Tester la connexion MongoDB
npm run test-db

# Initialiser les données
npm run seed

# Démarrer en développement
npm run dev

# Démarrer en production
npm start

# Avec Docker
docker-compose up -d          # Démarrer
docker-compose down           # Arrêter
docker-compose logs -f api    # Voir les logs
```

## 📊 Interface d'administration

Pour l'interface d'administration :
```bash
cd ../admin-panel
npm install
npm run dev
```

Puis allez sur : http://localhost:3001

## 🔗 Endpoints principaux

- **Authentification** : `POST /api/auth/login`
- **Produits** : `GET /api/products`
- **Commandes** : `GET /api/orders`
- **Statistiques** : `GET /api/orders/stats`

## 🛠️ Dépannage

### Erreur de connexion MongoDB
```bash
npm run test-db
```

### Redémarrer les services
```bash
# Local
sudo systemctl restart mongod

# Docker
docker-compose restart
```

### Voir les logs
```bash
# API
npm run dev

# Docker
docker-compose logs -f
```