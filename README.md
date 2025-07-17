# 🛍️ CBD Shop - Boutique E-commerce Complète

Boutique e-commerce moderne pour produits CBD avec panel d'administration et API backend.

## 📁 Structure du Projet

```
├── 🛍️ Boutique Frontend (/)          # Interface client (React + Vite)
├── 👨‍💼 Panel Admin (/admin-panel)     # Interface administration (React + Vite)
└── 🔧 API Backend (/api)              # Serveur Node.js + MongoDB
```

## 🚀 Démarrage Rapide

### 1. Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- Git

### 2. Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd cbd-shop

# Installer les dépendances
npm install                    # Boutique frontend
cd admin-panel && npm install  # Panel admin
cd ../api && npm install       # API backend
```

### 3. Configuration MongoDB

Créez un fichier `api/.env` :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cbd_shop
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=development
```

### 4. Lancement

```bash
# Terminal 1 - API Backend (port 5000)
cd api
npm run dev

# Terminal 2 - Boutique Frontend (port 3000)
npm run dev

# Terminal 3 - Panel Admin (port 3001)
cd admin-panel
npm run dev
```

## 🌐 URLs d'accès

| Service | URL | Port | Description |
|---------|-----|------|-------------|
| **🛍️ Boutique Frontend** | http://localhost:3000 | 3000 | Interface client React + Vite |
| **👨‍💼 Panel Admin** | http://localhost:3001 | 3001 | Administration React + Vite |
| **🔧 API Backend** | http://localhost:5000 | 5000 | Node.js + MongoDB Atlas |
| **❤️ API Health** | http://localhost:5000/health | 5000 | Statut de l'API |
| **📊 API Endpoints** | http://localhost:5000/api | 5000 | Endpoints REST |

## 📋 Fonctionnalités

### 🛍️ Boutique Frontend
- Catalogue de produits CBD
- Filtrage par catégories
- Panier d'achat
- Pages produit détaillées
- Interface responsive

### 👨‍💼 Panel Administration
- Gestion des produits
- Gestion des catégories
- Gestion des commandes
- Tableau de bord
- Interface CRUD complète

### 🔧 API Backend
- Authentification JWT
- CRUD produits/catégories
- Gestion des commandes
- Upload d'images
- Validation des données

## 🛠️ Technologies

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentification**: JWT
- **Upload**: Multer
- **Validation**: Express Validator

## 📚 Documentation API

### Endpoints principaux :

#### Produits
- `GET /api/products` - Liste des produits
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit

#### Catégories
- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie
- `PUT /api/categories/:id` - Modifier une catégorie
- `DELETE /api/categories/:id` - Supprimer une catégorie

#### Commandes
- `GET /api/orders` - Liste des commandes
- `POST /api/orders` - Créer une commande
- `PUT /api/orders/:id` - Modifier une commande

## 🔧 Résolution des Problèmes

### Problèmes d'API
- Vérifiez que MongoDB est démarré
- Vérifiez le fichier `.env` dans `/api`
- Consultez les logs : `cd api && npm run dev`

### Problèmes de connexion
- Port 5000 : API Backend
- Port 3000 : Boutique Frontend  
- Port 3001 : Panel Admin

### Base de données vide
```bash
cd api
npm run seed  # Ajoute des données de test
```

## 📄 License

MIT

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

---

**🎉 Votre boutique CBD est maintenant prête !**