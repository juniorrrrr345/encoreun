# 🔗 Guide de Connexion MongoDB pour le Panel Administratif

## 🎯 Vue d'ensemble

Votre panel administratif a besoin d'une base de données MongoDB pour stocker :
- **Utilisateurs** : Administrateurs et managers
- **Produits** : Catalogue de la boutique
- **Commandes** : Suivi des ventes
- **Catégories** : Organisation des produits

## 🗄️ Option 1 : MongoDB Atlas (Recommandé)

### Étape 1 : Créer un compte Atlas
1. Allez sur [mongodb.com/atlas](https://mongodb.com/atlas)
2. Cliquez sur "Try Free"
3. Créez votre compte

### Étape 2 : Créer un cluster
1. Choisissez "FREE" (M0 Sandbox)
2. Sélectionnez un provider (AWS, Google Cloud, Azure)
3. Choisissez une région proche de vous
4. Cliquez sur "Create"

### Étape 3 : Configurer la sécurité
1. **Créer un utilisateur de base de données :**
   - Username: `admin`
   - Password: `votre_mot_de_passe_securise`
   - Cliquez sur "Create User"

2. **Autoriser l'accès réseau :**
   - Dans "Network Access"
   - Cliquez sur "Add IP Address"
   - Cliquez sur "Allow Access from Anywhere" (0.0.0.0/0)
   - Cliquez sur "Confirm"

### Étape 4 : Obtenir l'URI de connexion
1. Cliquez sur "Connect" dans votre cluster
2. Choisissez "Connect your application"
3. Copiez l'URI de connexion

**Exemple d'URI :**
```
mongodb+srv://admin:votre_mot_de_passe_securise@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority
```

### Étape 5 : Configurer l'API
```bash
cd api
cp .env.example .env
```

Éditez le fichier `.env` :
```env
# Configuration du serveur
PORT=5000
NODE_ENV=development

# Base de données MongoDB Atlas
MONGODB_URI=mongodb+srv://admin:votre_mot_de_passe_securise@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=votre_jwt_secret_tres_securise_ici
JWT_EXPIRES_IN=7d

# Configuration CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:5173

# Configuration des uploads
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Configuration de sécurité
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🐳 Option 2 : MongoDB avec Docker

### Étape 1 : Installer Docker
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# macOS
brew install docker docker-compose

# Windows
# Téléchargez Docker Desktop depuis docker.com
```

### Étape 2 : Lancer MongoDB
```bash
cd api
docker-compose up -d mongodb
```

### Étape 3 : Configurer l'API
```bash
cp .env.example .env
```

Éditez le fichier `.env` :
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/boutique_admin?authSource=admin
```

## 🧪 Étape 3 : Tester la connexion

### 1. Installer les dépendances
```bash
cd api
npm install
```

### 2. Tester la connexion MongoDB
```bash
npm run test-db
```

**Résultat attendu :**
```
🔍 Test de connexion MongoDB...

✅ Connexion MongoDB réussie !
📦 Base de données: boutique_admin
🔗 URI: mongodb://***:***@localhost:27017/boutique_admin?authSource=admin
✅ Test d'écriture réussi !
✅ Test de suppression réussi !

🎉 MongoDB est prêt à être utilisé !
```

### 3. Initialiser les données
```bash
npm run seed
```

**Résultat attendu :**
```
🌱 Initialisation de la base de données...

✅ Utilisateur admin créé avec succès
📧 Email: admin@boutique.com
🔑 Mot de passe: admin123

✅ Catégorie "Électronique" créée
✅ Catégorie "Vêtements" créée
✅ Catégorie "Maison & Jardin" créée
✅ Catégorie "Sport & Loisirs" créée

✅ Produit "Smartphone Galaxy S23" créé
✅ Produit "T-shirt Premium Cotton" créé
✅ Produit "Lampadaire Design Moderne" créé
✅ Produit "Ballon de Football Pro" créé

✅ Base de données initialisée avec succès !

📊 Données créées:
- 1 utilisateur admin
- 4 catégories
- 4 produits de démonstration

🚀 Vous pouvez maintenant démarrer l'API !
```

### 4. Démarrer l'API
```bash
npm run dev
```

**Résultat attendu :**
```
🚀 Serveur démarré sur le port 5000
📊 Environnement: development
🔗 URL: http://localhost:5000
🌐 CORS autorisé pour: http://localhost:3000,http://localhost:3001,http://localhost:5173
📝 Documentation: http://localhost:5000/api-docs
```

## 🔧 Étape 4 : Tester le panel administratif

### 1. Démarrer l'interface d'administration
```bash
cd ../admin-panel
npm install
npm run dev
```

### 2. Se connecter au panel
- **URL** : http://localhost:3001
- **Email** : admin@boutique.com
- **Mot de passe** : admin123

## 📊 Étape 5 : Vérifier les données

### Via l'API
```bash
# Tester l'API
curl http://localhost:5000/health

# Se connecter
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@boutique.com","password":"admin123"}'
```

### Via MongoDB Atlas
1. Allez dans votre cluster Atlas
2. Cliquez sur "Browse Collections"
3. Vous devriez voir les collections : `users`, `products`, `orders`, `categories`

## 🔧 Dépannage

### Erreur : "ECONNREFUSED"
**Solution :** MongoDB n'est pas démarré
```bash
# Avec Docker
docker-compose up -d mongodb

# Local
sudo systemctl start mongod
```

### Erreur : "Authentication failed"
**Solution :** Vérifiez les identifiants dans l'URI
```env
# Vérifiez que le mot de passe est correct
MONGODB_URI=mongodb+srv://admin:bon_mot_de_passe@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority
```

### Erreur : "Network is unreachable"
**Solution :** Vérifiez l'accès réseau dans Atlas
1. Allez dans "Network Access"
2. Ajoutez votre IP ou "Allow Access from Anywhere"

### Erreur : "Invalid connection string"
**Solution :** Vérifiez le format de l'URI
- Assurez-vous que le mot de passe ne contient pas de caractères spéciaux
- Utilisez l'encodage URL si nécessaire

## 🎯 Prochaines étapes

Une fois MongoDB connecté :

1. **Tester l'API** : http://localhost:5000/health
2. **Accéder au panel** : http://localhost:3001
3. **Gérer les produits** via l'interface
4. **Suivre les commandes** en temps réel
5. **Voir les statistiques** du tableau de bord

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs : `npm run dev`
2. Testez la connexion : `npm run test-db`
3. Consultez la documentation MongoDB Atlas
4. Vérifiez les paramètres de sécurité