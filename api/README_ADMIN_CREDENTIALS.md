# 🔐 Système de Gestion des Identifiants Administrateur

## 📋 Résumé des Scripts Créés

### 1. `create-admin-users.js` - Création Multiple d'Administrateurs
**Commande :** `npm run create-admin`
- Crée automatiquement 4 comptes administrateur
- Génère des mots de passe sécurisés de 12 caractères
- Crée un fichier de sauvegarde avec tous les identifiants
- Comptes créés :
  - **Super Administrateur** (superadmin@boutique.com) - Accès complet
  - **Manager Principal** (manager@boutique.com) - Gestion des produits
  - **Admin Support** (support@boutique.com) - Support client
  - **Admin Marketing** (marketing@boutique.com) - Marketing

### 2. `create-single-admin.js` - Création Interactive d'un Administrateur
**Commande :** `npm run create-single-admin`
- Interface interactive pour créer un administrateur personnalisé
- Validation des données saisies
- Choix du rôle (admin/manager)
- Option de génération automatique de mot de passe

### 3. `manage-admin-users.js` - Gestion des Utilisateurs
**Commande :** `npm run manage-admin`
- Lister tous les utilisateurs existants
- Modifier les informations d'un utilisateur
- Supprimer un utilisateur
- Afficher les statistiques
- Interface interactive complète

### 4. `demo-admin-credentials.js` - Démonstration
**Commande :** `npm run demo-admin`
- Démonstration sans MongoDB
- Génère des identifiants de test
- Crée un fichier de sauvegarde
- Parfait pour tester le système

## 🔑 Types de Rôles

### 👑 Administrateur (admin)
- **Accès complet** à toutes les fonctionnalités
- Gestion des utilisateurs
- Configuration système
- Accès aux statistiques avancées

### 👤 Manager (manager)
- **Accès limité** aux fonctionnalités de gestion
- Gestion des produits et commandes
- Gestion des catégories
- Accès aux rapports de base

## 🚀 Utilisation Rapide

### Démonstration (Sans MongoDB)
```bash
npm run demo-admin
```

### Création d'Administrateurs (Avec MongoDB)
```bash
# 1. Configurer MongoDB
npm run test-db

# 2. Créer les administrateurs
npm run create-admin

# 3. Ou créer un seul administrateur
npm run create-single-admin
```

### Gestion des Utilisateurs
```bash
npm run manage-admin
```

## 📊 Exemple de Sortie

```
🔐 IDENTIFIANTS ADMINISTRATEUR CRÉÉS
=====================================

1. Super Administrateur
   📧 Email: superadmin@boutique.com
   🔑 Mot de passe: Nj*@NKQgyC41
   👤 Rôle: admin
   📝 Description: Accès complet à toutes les fonctionnalités

2. Manager Principal
   📧 Email: manager@boutique.com
   🔑 Mot de passe: K2ByVE&YQcmn
   👤 Rôle: manager
   📝 Description: Gestion des produits et commandes

⚠️  IMPORTANT:
- Changez ces mots de passe après la première connexion
- Stockez ces identifiants de manière sécurisée
- Ne partagez pas ces informations publiquement
```

## 🔒 Sécurité

### Mots de Passe Sécurisés
- **Longueur :** 12 caractères par défaut
- **Caractères :** Lettres, chiffres, symboles spéciaux
- **Hachage :** bcrypt avec 12 rounds de salage
- **Validation :** Minimum 6 caractères requis

### Bonnes Pratiques
1. **Changez les mots de passe** après la première connexion
2. **Stockez les identifiants** de manière sécurisée
3. **Ne partagez pas** les mots de passe publiquement
4. **Supprimez** les fichiers de sauvegarde après utilisation
5. **Utilisez des mots de passe forts** pour la production

## 📁 Fichiers Créés

### Scripts Principaux
- `create-admin-users.js` - Création multiple d'administrateurs
- `create-single-admin.js` - Création interactive d'un administrateur
- `manage-admin-users.js` - Gestion des utilisateurs existants
- `demo-admin-credentials.js` - Démonstration sans base de données

### Documentation
- `ADMIN_USERS_GUIDE.md` - Guide complet d'utilisation
- `README_ADMIN_CREDENTIALS.md` - Ce fichier de résumé

### Configuration
- `.env` - Variables d'environnement pour MongoDB
- `package.json` - Scripts npm ajoutés

## ⚙️ Configuration Requise

### Variables d'Environnement (.env)
```env
MONGODB_URI=mongodb://localhost:27017/boutique-admin
JWT_SECRET=votre-secret-jwt-super-securise
BCRYPT_ROUNDS=12
```

### Dépendances
```json
{
  "bcryptjs": "^2.4.3",
  "mongoose": "^7.5.0",
  "dotenv": "^16.3.1"
}
```

## 🛠️ Dépannage

### Erreurs Courantes

**Module dotenv non trouvé :**
```bash
npm install
```

**Connexion MongoDB échouée :**
```bash
# Vérifier la variable d'environnement
echo $MONGODB_URI

# Tester la connexion
npm run test-db
```

**Utilisateur déjà existant :**
- Le script détecte automatiquement les doublons
- Utilisez `npm run manage-admin` pour modifier l'existant

## 📞 Support

Pour toute question :
1. Consultez `ADMIN_USERS_GUIDE.md` pour le guide complet
2. Vérifiez les logs d'erreur
3. Testez la connexion MongoDB
4. Contactez l'équipe de développement

---

**🎉 Système prêt à l'emploi !** Tous les scripts sont fonctionnels et sécurisés.