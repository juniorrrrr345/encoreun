# Avec Amour - Boutique E-commerce

Une boutique e-commerce moderne et élégante développée avec React, Tailwind CSS et des animations fluides.

## 🌟 Fonctionnalités

- **Interface moderne** avec animations Framer Motion
- **Authentification complète** (inscription, connexion, déconnexion)
- **Gestion des produits** et catégories
- **Panier d'achat** avec localStorage
- **Interface d'administration** pour les admins
- **Design responsive** adapté à tous les appareils
- **Thème sombre** avec dégradés roses et violets
- **Notifications toast** pour une meilleure UX

## 🛠 Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **React Router** - Navigation côté client
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animations
- **Zustand** - Gestion d'état simple et efficace
- **Axios** - Client HTTP pour les requêtes API
- **React Hot Toast** - Notifications élégantes
- **React Icons** - Icônes modernes
- **Vite** - Build tool rapide

## 🚀 Installation et démarrage

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd avecamour-boutique
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer l'application en développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   L'application sera disponible sur `http://localhost:3000`

## 📱 Pages disponibles

### Pages publiques
- **/** - Page d'accueil avec présentation de la boutique
- **/category** - Affichage des catégories de produits
- **/product** - Liste de tous les produits
- **/product/:id** - Détail d'un produit spécifique
- **/category/:category** - Produits d'une catégorie
- **/cart** - Panier d'achat
- **/contact** - Formulaire de contact
- **/login** - Connexion utilisateur
- **/signup** - Inscription utilisateur

### Pages privées
- **/secret-dashboard** - Interface d'administration (admin uniquement)

## 🎨 Design et UX

### Thème visuel
- **Couleurs principales** : Roses et violets avec dégradés
- **Arrière-plan** : Image de fond avec overlay sombre
- **Police personnalisée** : Great Vibes pour les titres
- **Animations** : Transitions fluides avec Framer Motion

### Responsive Design
- **Mobile First** : Optimisé pour tous les appareils
- **Navigation** : Menu de navigation fixe en bas
- **Safe Areas** : Support des écrans avec encoches

## 🔧 API Configuration

L'application est configurée pour se connecter à l'API :
```
https://avecamour.wikiplug.com/api
```

### Endpoints utilisés
- `POST /auth/signup` - Inscription
- `POST /auth/login` - Connexion  
- `POST /auth/logout` - Déconnexion
- `GET /auth/profile` - Profil utilisateur
- `POST /auth/refresh-token` - Renouvellement token
- `GET /products` - Liste des produits
- `GET /products/:id` - Détail produit
- `GET /categories` - Liste des catégories

## 🛒 Fonctionnalités du panier

- **Stockage local** : Le panier est sauvegardé dans localStorage
- **Gestion des quantités** : Ajout/suppression/modification
- **Calcul automatique** : Total et nombre d'articles
- **Notifications** : Feedback utilisateur pour chaque action

## 👑 Interface d'administration

Accessible uniquement aux utilisateurs avec le rôle `admin` :
- **Dashboard** : Vue d'ensemble des statistiques
- **Gestion produits** : CRUD des produits (à développer)
- **Gestion utilisateurs** : Administration des comptes (à développer)
- **Commandes** : Suivi des ventes (à développer)

## 🔐 Authentification

### Système de tokens
- **Access tokens** : Gestion automatique
- **Refresh tokens** : Renouvellement automatique
- **Intercepteurs Axios** : Gestion transparente de l'expiration

### Rôles utilisateurs
- **Utilisateur standard** : Accès aux fonctionnalités de base
- **Administrateur** : Accès complet + interface d'admin

## 📦 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Loader.jsx      # Composant de chargement
│   └── Navigation.jsx  # Navigation principale
├── hooks/              # Hooks personnalisés
│   └── useCart.js      # Gestion du panier
├── lib/                # Utilitaires et configurations
│   └── axios.js        # Configuration API
├── pages/              # Pages de l'application
├── store/              # Gestion d'état Zustand
│   ├── useAuthStore.js # État d'authentification
│   └── useProductStore.js # État des produits
├── App.jsx             # Composant principal
├── main.jsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 🎯 Prochaines fonctionnalités

- [ ] Système de paiement intégré
- [ ] Gestion complète des commandes
- [ ] Système de reviews et notes
- [ ] Recherche avancée avec filtres
- [ ] Wishlist/favoris
- [ ] Système de promotions
- [ ] Notifications push
- [ ] Mode hors ligne (PWA)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir des issues pour signaler des bugs
- Proposer de nouvelles fonctionnalités
- Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence MIT.

---

Développé avec ❤️ pour une expérience d'achat unique et moderne.