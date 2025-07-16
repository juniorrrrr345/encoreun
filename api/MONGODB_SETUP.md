# Configuration MongoDB Atlas

## 🚀 Étape 1 : Créer un compte MongoDB Atlas

1. **Aller sur MongoDB Atlas**
   - Visitez [mongodb.com/atlas](https://mongodb.com/atlas)
   - Cliquez sur "Try Free"

2. **Créer un compte**
   - Remplissez vos informations
   - Choisissez "Free" (Shared Cluster)
   - Cliquez sur "Create"

## 🏗️ Étape 2 : Créer un cluster

1. **Choisir le type de cluster**
   - Sélectionnez "FREE" (M0 Sandbox)
   - Choisissez un provider (AWS, Google Cloud, ou Azure)
   - Sélectionnez une région proche de vous
   - Cliquez sur "Create"

2. **Configurer la sécurité**
   - Créez un utilisateur de base de données :
     - Username: `admin`
     - Password: `votre_mot_de_passe_securise`
   - Ajoutez votre IP actuelle dans "Network Access"
   - Ou cliquez sur "Allow Access from Anywhere" (0.0.0.0/0) pour le développement

## 🔗 Étape 3 : Obtenir l'URI de connexion

1. **Dans votre cluster**
   - Cliquez sur "Connect"
   - Choisissez "Connect your application"
   - Copiez l'URI de connexion

2. **Modifier l'URI**
   - Remplacez `<password>` par votre mot de passe
   - Remplacez `<dbname>` par `boutique_admin`

Exemple d'URI final :
```
mongodb+srv://admin:votre_mot_de_passe_securise@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority
```

## ⚙️ Étape 4 : Configurer l'API

1. **Créer le fichier .env**
```bash
cd api
cp .env.example .env
```

2. **Modifier le fichier .env**
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

## 🚀 Étape 5 : Tester la connexion

1. **Installer les dépendances**
```bash
cd api
npm install
```

2. **Initialiser la base de données**
```bash
npm run seed
```

3. **Démarrer l'API**
```bash
npm run dev
```

## ✅ Vérification

Si tout fonctionne, vous devriez voir :
```
🚀 Serveur démarré sur le port 5000
📦 MongoDB connecté: cluster0.xxxxx.mongodb.net
✅ Utilisateur admin créé avec succès
📧 Email: admin@boutique.com
🔑 Mot de passe: admin123
```

## 🔧 Dépannage

### Erreur de connexion
- Vérifiez que votre IP est autorisée dans Network Access
- Vérifiez le mot de passe dans l'URI
- Vérifiez que le cluster est actif

### Erreur d'authentification
- Vérifiez que l'utilisateur de base de données existe
- Vérifiez les permissions de l'utilisateur

## 📊 Monitoring

Dans MongoDB Atlas, vous pouvez :
- Voir les statistiques de votre cluster
- Monitorer les requêtes
- Voir les logs d'erreur
- Configurer des alertes