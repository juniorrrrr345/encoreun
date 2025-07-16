# 🛍️ Boutique E-commerce avec Panel Admin

Un système e-commerce complet avec une boutique moderne et un panel d'administration, connecté à MongoDB Atlas.

## 🚀 Démarrage rapide

### Option 1: Démarrage automatique (recommandé)
```bash
npm run start-all
```

### Option 2: Démarrage manuel
```bash
# 1. Démarrer l'API
npm run api

# 2. Dans un autre terminal, démarrer la boutique
npm run dev

# 3. Dans un autre terminal, démarrer le panel admin
npm run admin
```

## 📁 Structure du projet

```
├── src/                    # Boutique principale (React + Vite)
├── admin-panel/           # Panel d'administration (React + Vite)
├── api/                   # API backend (Node.js + Express + MongoDB)
├── start-all.sh          # Script de démarrage automatique
└── README.md             # Ce fichier
```

## 🔧 Configuration

### Variables d'environnement

#### API (.env dans /api)
```env
MONGODB_URI=mongodb+srv://Junior:db_UARypMbzrcr3Qlpf@cluster0.tj6hxtb.mongodb.net/boutique-admin
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost:5174
JWT_SECRET=votre_secret_jwt_tres_securise_ici
JWT_EXPIRE=7d
```

#### Boutique (.env à la racine)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Boutique E-commerce
VITE_APP_VERSION=1.0.0
```

#### Panel Admin (.env dans /admin-panel)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Panel Admin
VITE_APP_VERSION=1.0.0
```

## 🗄️ Base de données

### Initialisation
```bash
npm run init-db
```

### Données de test créées
- **6 catégories** : Vêtements, Beauté, Maison, Bijoux, Tech, Sport
- **6 produits** : T-shirt Premium, Crème hydratante, Vase décoratif, Bracelet en argent, Écouteurs sans fil, Leggings de sport
- **1 utilisateur admin** : admin@example.com / admin123

## 🌐 URLs

- **Boutique** : http://localhost:5173
- **Panel Admin** : http://localhost:5174
- **API** : http://localhost:5000
- **Documentation API** : http://localhost:5000/api-docs

## 🔑 Identifiants Admin

- **Email** : admin@example.com
- **Mot de passe** : admin123

## 📱 Fonctionnalités

### Boutique
- ✅ Navigation par catégories
- ✅ Affichage des produits
- ✅ Détails des produits
- ✅ Interface responsive
- ✅ Animations fluides

### Panel Admin
- ✅ Dashboard avec statistiques
- ✅ Gestion des produits (CRUD)
- ✅ Gestion des commandes
- ✅ Gestion des catégories
- ✅ Interface moderne et intuitive

### API
- ✅ RESTful API complète
- ✅ Connexion MongoDB Atlas
- ✅ Authentification JWT
- ✅ Validation des données
- ✅ Gestion des erreurs
- ✅ Rate limiting
- ✅ CORS configuré

## 🛠️ Technologies utilisées

### Frontend
- **React 18** avec hooks
- **Vite** pour le build
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Router** pour la navigation
- **Zustand** pour la gestion d'état
- **Axios** pour les requêtes HTTP

### Backend
- **Node.js** avec Express
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **bcryptjs** pour le hashage des mots de passe
- **Multer** pour l'upload de fichiers
- **Helmet** pour la sécurité
- **CORS** configuré

## 📊 Structure de la base de données

### Collections MongoDB
- **users** : Utilisateurs et administrateurs
- **products** : Produits de la boutique
- **categories** : Catégories de produits
- **orders** : Commandes des clients

## 🔧 Scripts disponibles

```bash
# Démarrage
npm run start-all          # Démarre tous les services
npm run dev               # Démarre la boutique
npm run api               # Démarre l'API
npm run admin             # Démarre le panel admin

# Base de données
npm run init-db           # Initialise la base de données

# Build
npm run build             # Build de la boutique
```

## 🚨 Résolution de problèmes

### Ports déjà utilisés
Si vous obtenez une erreur de port déjà utilisé :
```bash
# Vérifier les processus
lsof -i :5000
lsof -i :5173
lsof -i :5174

# Tuer les processus si nécessaire
kill -9 <PID>
```

### Erreur de connexion MongoDB
Vérifiez que l'URL MongoDB dans `api/.env` est correcte et que votre réseau autorise les connexions MongoDB Atlas.

### Erreur CORS
Vérifiez que les URLs dans `CORS_ORIGIN` correspondent à vos ports de développement.

## 📝 Développement

### Ajouter une nouvelle fonctionnalité
1. Créer le modèle dans `api/src/models/`
2. Créer les routes dans `api/src/routes/`
3. Ajouter les contrôleurs dans `api/src/controllers/`
4. Mettre à jour le frontend si nécessaire

### Structure des commits
```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactorisation
test: tests
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
1. Vérifiez la documentation
2. Consultez les issues existantes
3. Créez une nouvelle issue avec les détails du problème

---

**Développé avec ❤️ pour une expérience e-commerce moderne et performante**