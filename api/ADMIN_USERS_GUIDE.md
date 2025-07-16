# 🔐 Guide de Gestion des Utilisateurs Administrateur

Ce guide explique comment créer et gérer les identifiants administrateur pour votre boutique e-commerce.

## 📋 Scripts Disponibles

### 1. Création Multiple d'Administrateurs
```bash
npm run create-admin
```
**Fonctionnalités :**
- Crée automatiquement 4 comptes administrateur avec des mots de passe sécurisés
- Génère un fichier de sauvegarde avec tous les identifiants
- Comptes créés :
  - **Super Administrateur** (admin@boutique.com) - Accès complet
  - **Manager Principal** (manager@boutique.com) - Gestion des produits
  - **Admin Support** (support@boutique.com) - Support client
  - **Admin Marketing** (marketing@boutique.com) - Marketing et promotions

### 2. Création d'un Seul Administrateur
```bash
npm run create-single-admin
```
**Fonctionnalités :**
- Interface interactive pour créer un administrateur personnalisé
- Choix du nom, email, rôle et mot de passe
- Validation des données saisies
- Génération automatique de mot de passe sécurisé (optionnel)

### 3. Gestion des Utilisateurs Existants
```bash
npm run manage-admin
```
**Fonctionnalités :**
- Lister tous les utilisateurs
- Modifier les informations d'un utilisateur
- Supprimer un utilisateur
- Afficher les statistiques
- Interface interactive complète

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

### Première Configuration
1. **Assurez-vous que MongoDB est configuré**
   ```bash
   # Vérifier la connexion
   npm run test-db
   ```

2. **Créer les administrateurs par défaut**
   ```bash
   npm run create-admin
   ```

3. **Démarrer l'API**
   ```bash
   npm run dev
   ```

4. **Se connecter avec les identifiants générés**

### Création d'un Administrateur Personnalisé
```bash
npm run create-single-admin
```
Suivez les instructions à l'écran pour :
- Saisir le nom complet
- Entrer l'email
- Choisir le rôle (admin ou manager)
- Définir le mot de passe

### Gestion des Utilisateurs Existants
```bash
npm run manage-admin
```
Menu interactif avec les options :
1. **Lister** tous les utilisateurs
2. **Modifier** un utilisateur existant
3. **Supprimer** un utilisateur
4. **Statistiques** des utilisateurs

## 🔒 Sécurité

### Mots de Passe Sécurisés
- **Longueur minimale :** 6 caractères
- **Génération automatique :** 12 caractères avec caractères spéciaux
- **Hachage :** bcrypt avec 12 rounds de salage

### Bonnes Pratiques
1. **Changez les mots de passe** après la première connexion
2. **Stockez les identifiants** de manière sécurisée
3. **Ne partagez pas** les mots de passe publiquement
4. **Supprimez** les fichiers de sauvegarde après utilisation
5. **Utilisez des mots de passe forts** pour la production

## 📊 Structure des Données

### Modèle Utilisateur
```javascript
{
  name: String,           // Nom complet
  email: String,          // Email unique
  password: String,       // Mot de passe hashé
  role: String,           // 'admin' ou 'manager'
  isActive: Boolean,      // Statut actif/inactif
  lastLogin: Date,        // Dernière connexion
  avatar: String,         // Avatar (optionnel)
  createdAt: Date,        // Date de création
  updatedAt: Date         // Date de modification
}
```

## ⚠️ Avertissements Importants

### Production
- **Changez TOUS les mots de passe** par défaut
- **Utilisez des emails réels** pour les administrateurs
- **Activez l'authentification à deux facteurs** si possible
- **Surveillez les connexions** régulièrement

### Développement
- Les mots de passe par défaut sont pour le développement uniquement
- Ne pas utiliser en production sans modification
- Testez toujours la sécurité avant le déploiement

## 🛠️ Dépannage

### Erreurs Courantes

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

**Mot de passe trop court :**
- Minimum 6 caractères requis
- Utilisez la génération automatique pour des mots de passe sécurisés

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs d'erreur
2. Testez la connexion MongoDB
3. Consultez la documentation de l'API
4. Contactez l'équipe de développement

---

**🔐 Sécurité d'abord !** Gardez vos identifiants en sécurité et changez les mots de passe par défaut.