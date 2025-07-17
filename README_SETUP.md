# Guide de Configuration - Boutique en Ligne

Ce guide vous explique comment configurer et démarrer le système de boutique en ligne avec le panel d'administration.

## 🚀 Démarrage Rapide

### 1. Prérequis

- **Node.js** (version 16 ou supérieure)
- **Docker** (pour MongoDB)
- **Git**

### 2. Installation et Démarrage

#### Option A: Démarrage Automatique (Recommandé)

```bash
# 1. Démarrer MongoDB avec Docker
./start-mongodb.sh

# 2. Dans un nouveau terminal, démarrer l'API
cd api
npm install
npm start

# 3. Dans un autre terminal, démarrer le panel d'administration
cd admin-panel
npm install
npm run dev

# 4. Dans un autre terminal, démarrer la boutique
npm install
npm run dev
```

#### Option B: Démarrage Manuel

```bash
# 1. Démarrer MongoDB
docker run -d --name mongodb-shop -p 27017:27017 -e MONGO_INITDB_DATABASE=shop -v mongodb_data:/data/db mongo:latest

# 2. Ajouter les données de test
cd api
npm install
node src/utils/seed-data.js

# 3. Démarrer l'API
npm start

# 4. Démarrer le panel d'administration
cd ../admin-panel
npm install
npm run dev

# 5. Démarrer la boutique
cd ..
npm install
npm run dev
```

## 📊 URLs d'Accès

- **Boutique**: http://localhost:3000
- **Panel d'Administration**: http://localhost:5173
- **API**: http://localhost:5000

## 🔧 Configuration

### Variables d'Environnement

L'API utilise les variables d'environnement suivantes (définies dans `api/.env`):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shop
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

### Données de Test

Le système inclut des données de test automatiques :

- **5 catégories** (Vêtements, Chaussures, Accessoires, Électronique, Maison & Jardin)
- **5 produits** avec variantes de prix et images

## 🛠️ Fonctionnalités du Panel d'Administration

### Pages Disponibles

1. **Tableau de bord** - Vue d'ensemble des statistiques
2. **Produits** - Gestion complète des produits
   - Ajout/Modification/Suppression
   - Gestion des variantes de prix
   - Upload d'images
   - Gestion du stock
3. **Catégories** - Gestion des catégories
   - Ajout/Modification/Suppression
   - Upload d'images de fond
   - Hiérarchie des catégories
4. **Informations** - Gestion de la page contact
   - Modification du contenu
   - Gestion des réseaux sociaux
5. **Commandes** - Gestion des commandes
6. **Profil** - Gestion du profil administrateur

### Fonctionnalités Avancées

- **Upload d'images** pour les produits et catégories
- **Variantes de prix** pour les produits (tailles, couleurs, etc.)
- **Gestion des stocks** en temps réel
- **Système de promotions** (prix barrés, pourcentages)
- **Filtres et recherche** avancés
- **Interface responsive** pour mobile et desktop

## 🔍 Dépannage

### Erreurs Courantes

1. **Erreur de connexion MongoDB**
   ```bash
   # Vérifier que MongoDB est démarré
   docker ps | grep mongodb
   
   # Redémarrer MongoDB si nécessaire
   docker restart mongodb-shop
   ```

2. **Erreur CORS**
   - Vérifier que les URLs dans `CORS_ORIGIN` correspondent à vos ports
   - Redémarrer l'API après modification

3. **Erreur de chargement des données**
   - Vérifier que l'API est démarrée sur le port 5000
   - Vérifier la console du navigateur pour les erreurs

### Logs Utiles

```bash
# Voir les logs MongoDB
docker logs mongodb-shop

# Voir les logs de l'API
cd api && npm start

# Voir les logs du panel admin
cd admin-panel && npm run dev
```

## 📝 Structure des Données

### Produits
```javascript
{
  name: "Nom du produit",
  description: "Description complète",
  shortDescription: "Description courte",
  price: 29.99,
  originalPrice: 39.99,
  category: "Vêtements",
  subcategory: "T-shirts",
  stock: 45,
  sku: "TSH-001",
  images: ["url1", "url2"],
  mainImage: "url_principale",
  priceVariants: [
    { name: "S", price: 29.99, originalPrice: 39.99, isActive: true }
  ],
  isActive: true,
  isFeatured: true,
  isOnSale: true,
  salePercentage: 25
}
```

### Catégories
```javascript
{
  name: "Vêtements",
  description: "Collection de vêtements",
  slug: "vetements",
  image: "url_image_fond",
  isActive: true,
  isFeatured: true,
  sortOrder: 1
}
```

## 🚀 Déploiement

### Production

1. **Configurer les variables d'environnement**
2. **Utiliser une base de données MongoDB Atlas**
3. **Configurer un reverse proxy (Nginx)**
4. **Utiliser PM2 pour Node.js**

### Variables de Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shop
JWT_SECRET=your-super-secret-production-key
CORS_ORIGIN=https://votre-domaine.com
```

## 📞 Support

Pour toute question ou problème :

1. Vérifier les logs dans la console
2. Consulter la documentation MongoDB
3. Vérifier la configuration des variables d'environnement

---

**Note**: Ce système est conçu pour le développement et les tests. Pour la production, assurez-vous de configurer correctement la sécurité et les performances.