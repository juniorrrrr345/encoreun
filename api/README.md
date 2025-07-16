# API d'Administration de la Boutique

API RESTful complète pour gérer l'administration de votre boutique e-commerce.

## 🚀 Fonctionnalités

### 🔐 Authentification & Autorisation
- Connexion sécurisée avec JWT
- Gestion des rôles (admin, manager)
- Protection des routes sensibles
- Changement de mot de passe

### 📦 Gestion des Produits
- CRUD complet des produits
- Gestion des images et médias
- Contrôle du stock
- Système de promotions et réductions
- Recherche et filtrage avancés
- Statistiques des produits

### 📋 Gestion des Commandes
- Suivi des commandes en temps réel
- Gestion des statuts (en attente, confirmée, expédiée, etc.)
- Suivi des paiements
- Ajout de numéros de suivi
- Export des données
- Statistiques des ventes

### 📊 Tableau de Bord
- Statistiques en temps réel
- Vue d'ensemble des ventes
- Alertes de stock faible
- Commandes récentes

## 🛠️ Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
cd api
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditer le fichier `.env` avec vos configurations :
```env
# Configuration du serveur
PORT=5000
NODE_ENV=development

# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/boutique_admin

# JWT Secret (changez ceci en production)
JWT_SECRET=votre_jwt_secret_tres_securise_ici
JWT_EXPIRES_IN=7d

# Configuration CORS
CORS_ORIGIN=http://localhost:3000
```

4. **Initialiser la base de données**
```bash
npm run seed
```

5. **Démarrer l'API**
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 📚 Documentation des Endpoints

### 🔐 Authentification

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@boutique.com",
  "password": "admin123"
}
```

#### Obtenir le profil
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Mettre à jour le profil
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Nouveau nom",
  "email": "nouveau@email.com"
}
```

### 📦 Produits

#### Obtenir tous les produits
```http
GET /api/products?page=1&limit=10&search=smartphone&category=Électronique
Authorization: Bearer <token>
```

#### Créer un produit
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Nouveau Produit",
  "description": "Description du produit",
  "price": 99.99,
  "category": "Électronique",
  "stock": 50,
  "sku": "PROD-001",
  "images": ["url1", "url2"],
  "mainImage": "url1"
}
```

#### Mettre à jour un produit
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Produit Modifié",
  "price": 89.99
}
```

#### Supprimer un produit
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

#### Mettre à jour le stock
```http
PATCH /api/products/:id/stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "stock": 25
}
```

#### Activer/Désactiver un produit
```http
PATCH /api/products/:id/toggle-status
Authorization: Bearer <token>
```

#### Statistiques des produits
```http
GET /api/products/stats/overview
Authorization: Bearer <token>
```

### 📋 Commandes

#### Obtenir toutes les commandes
```http
GET /api/orders?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

#### Obtenir une commande
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

#### Mettre à jour le statut
```http
PATCH /api/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipped",
  "adminNotes": "Expédié via Colissimo"
}
```

#### Mettre à jour le statut de paiement
```http
PATCH /api/orders/:id/payment-status
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentStatus": "paid"
}
```

#### Ajouter un numéro de suivi
```http
PATCH /api/orders/:id/tracking
Authorization: Bearer <token>
Content-Type: application/json

{
  "trackingNumber": "TRK123456789"
}
```

#### Statistiques des commandes
```http
GET /api/orders/stats
Authorization: Bearer <token>
```

#### Commandes récentes
```http
GET /api/orders/recent?limit=5
Authorization: Bearer <token>
```

#### Exporter les commandes
```http
GET /api/orders/export?startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <token>
```

## 🔧 Scripts Disponibles

```bash
# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start

# Initialiser la base de données
npm run seed

# Lancer les tests
npm test
```

## 🛡️ Sécurité

- **Rate Limiting** : Protection contre les attaques par déni de service
- **Helmet** : Headers de sécurité HTTP
- **CORS** : Configuration des origines autorisées
- **Validation** : Validation des données d'entrée
- **JWT** : Authentification sécurisée
- **Bcrypt** : Hashage sécurisé des mots de passe

## 📊 Structure de la Base de Données

### Utilisateurs (Users)
- Informations d'authentification
- Rôles et permissions
- Profil utilisateur

### Produits (Products)
- Informations détaillées
- Gestion des images
- Stock et prix
- Catégorisation

### Commandes (Orders)
- Informations client
- Articles commandés
- Statuts et suivi
- Paiements

### Catégories (Categories)
- Hiérarchie des catégories
- Métadonnées SEO
- Organisation des produits

## 🚀 Déploiement

### Variables d'environnement de production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-production-db
JWT_SECRET=your-super-secure-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Recommandations de sécurité
1. Utilisez un JWT_SECRET fort et unique
2. Configurez HTTPS en production
3. Utilisez une base de données MongoDB sécurisée
4. Configurez les limites de rate limiting appropriées
5. Surveillez les logs d'erreur

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

---

**Note** : Cette API est conçue pour fonctionner avec un panel d'administration frontend séparé. Assurez-vous de configurer correctement les origines CORS pour votre interface d'administration.