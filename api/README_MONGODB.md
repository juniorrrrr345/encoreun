# 🗄️ Connexion MongoDB pour le Panel Administratif

## 🎯 Résumé Rapide

Votre panel administratif a besoin de MongoDB pour stocker les données de votre boutique. Voici comment le configurer :

## 🚀 Démarrage Rapide (5 minutes)

### 1. Configuration automatique
```bash
cd api
npm run setup
```

Le script vous guidera pour choisir votre option MongoDB et configurer automatiquement l'API.

### 2. Ou configuration manuelle

#### Option A : MongoDB Atlas (Recommandé)
1. Créez un compte sur [mongodb.com/atlas](https://mongodb.com/atlas)
2. Créez un cluster gratuit
3. Obtenez l'URI de connexion
4. Configurez dans `.env`

#### Option B : MongoDB avec Docker
```bash
cd api
docker-compose up -d mongodb
```

### 3. Tester et initialiser
```bash
npm run test-db    # Tester la connexion
npm run seed       # Initialiser les données
npm run dev        # Démarrer l'API
```

### 4. Accéder au panel
- **URL** : http://localhost:3001
- **Email** : admin@boutique.com
- **Mot de passe** : admin123

## 📊 Ce que MongoDB stocke

### Collections principales :
- **users** : Administrateurs et managers
- **products** : Catalogue de produits
- **orders** : Commandes et ventes
- **categories** : Organisation des produits

### Données de test incluses :
- 1 utilisateur admin
- 4 catégories (Électronique, Vêtements, Maison & Jardin, Sport & Loisirs)
- 4 produits de démonstration

## 🔧 Configuration détaillée

### MongoDB Atlas (Recommandé)

**Avantages :**
- ✅ Gratuit (512MB)
- ✅ Pas d'installation locale
- ✅ Sauvegardes automatiques
- ✅ Interface web de gestion

**Étapes :**
1. Allez sur [mongodb.com/atlas](https://mongodb.com/atlas)
2. Créez un compte gratuit
3. Créez un cluster "FREE" (M0 Sandbox)
4. Configurez la sécurité :
   - Créez un utilisateur (admin/votre_mot_de_passe)
   - Autorisez l'accès depuis n'importe où (0.0.0.0/0)
5. Obtenez l'URI de connexion
6. Configurez dans `.env`

**Exemple d'URI Atlas :**
```
mongodb+srv://admin:votre_mot_de_passe@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority
```

### MongoDB Local avec Docker

**Avantages :**
- ✅ Contrôle total
- ✅ Gratuit
- ✅ Pas de limite de stockage

**Étapes :**
```bash
# Installer Docker
sudo apt-get install docker.io docker-compose

# Lancer MongoDB
cd api
docker-compose up -d mongodb

# Configurer l'API
cp .env.example .env
# Éditer .env avec : MONGODB_URI=mongodb://admin:password123@localhost:27017/boutique_admin?authSource=admin
```

## 🧪 Tests et vérification

### Tester la connexion
```bash
npm run test-db
```

**Résultat attendu :**
```
✅ Connexion MongoDB réussie !
📦 Base de données: boutique_admin
✅ Test d'écriture réussi !
✅ Test de suppression réussi !
🎉 MongoDB est prêt à être utilisé !
```

### Initialiser les données
```bash
npm run seed
```

**Résultat attendu :**
```
✅ Utilisateur admin créé avec succès
📧 Email: admin@boutique.com
🔑 Mot de passe: admin123
✅ 4 catégories créées
✅ 4 produits créés
```

### Démarrer l'API
```bash
npm run dev
```

**Résultat attendu :**
```
🚀 Serveur démarré sur le port 5000
📦 MongoDB connecté: cluster0.xxxxx.mongodb.net
🌐 CORS autorisé pour: http://localhost:3000,http://localhost:3001,http://localhost:5173
```

## 🔗 Endpoints de test

Une fois l'API démarrée, testez :

### Health Check
```bash
curl http://localhost:5000/health
```

### Connexion admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@boutique.com","password":"admin123"}'
```

### Obtenir les produits
```bash
curl -H "Authorization: Bearer VOTRE_TOKEN" \
  http://localhost:5000/api/products
```

## 🎯 Interface d'administration

### Démarrer l'interface
```bash
cd ../admin-panel
npm install
npm run dev
```

### Se connecter
- **URL** : http://localhost:3001
- **Email** : admin@boutique.com
- **Mot de passe** : admin123

## 🔧 Dépannage

### Erreur "ECONNREFUSED"
**Solution :** MongoDB n'est pas démarré
```bash
# Avec Docker
docker-compose up -d mongodb

# Local
sudo systemctl start mongod
```

### Erreur "Authentication failed"
**Solution :** Vérifiez les identifiants
```env
# Vérifiez le mot de passe dans l'URI
MONGODB_URI=mongodb+srv://admin:bon_mot_de_passe@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority
```

### Erreur "Network is unreachable"
**Solution :** Vérifiez l'accès réseau dans Atlas
1. Allez dans "Network Access"
2. Ajoutez votre IP ou "Allow Access from Anywhere"

## 📊 Monitoring

### MongoDB Atlas
- Voir les statistiques de votre cluster
- Monitorer les requêtes
- Voir les logs d'erreur
- Configurer des alertes

### MongoDB Compass (Interface graphique)
1. Téléchargez [MongoDB Compass](https://mongodb.com/try/download/compass)
2. Connectez-vous avec votre URI
3. Explorez vos collections

## 🚀 Prochaines étapes

Une fois MongoDB connecté :

1. **Gérer les produits** via l'interface
2. **Suivre les commandes** en temps réel
3. **Voir les statistiques** du tableau de bord
4. **Configurer les catégories** et promotions
5. **Gérer les utilisateurs** administrateurs

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs : `npm run dev`
2. Testez la connexion : `npm run test-db`
3. Consultez la documentation MongoDB Atlas
4. Vérifiez les paramètres de sécurité

---

**🎉 Votre panel administratif est maintenant connecté à MongoDB et prêt à gérer votre boutique !**