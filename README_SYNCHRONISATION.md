# 🚀 Guide de Synchronisation des Catégories

## 📋 Vue d'ensemble

Ce système permet de gérer les catégories de la boutique depuis le panel admin avec une synchronisation automatique vers la boutique.

## 🔧 Configuration

### URLs d'API
- **Boutique**: `https://avecamour.wikiplug.com/api`
- **Panel Admin**: `https://avecamour.wikiplug.com/api`

Les deux applications utilisent maintenant la même URL d'API pour assurer la synchronisation.

## 🎯 Fonctionnalités

### Panel Admin (`/admin-panel`)
- ✅ Ajouter des catégories
- ✅ Modifier des catégories existantes
- ✅ Supprimer des catégories
- ✅ Activer/Désactiver des catégories
- ✅ Upload d'images pour les catégories
- ✅ Notifications de succès/erreur
- ✅ Gestion des catégories parent/enfant

### Boutique (`/src`)
- ✅ Affichage des catégories actives uniquement
- ✅ Synchronisation automatique (rafraîchissement toutes les 30 secondes)
- ✅ Gestion des images de catégories
- ✅ Couleurs dynamiques pour les catégories
- ✅ Pagination des catégories

## 🚀 Démarrage rapide

### Option 1: Script automatique
```bash
./start-apps.sh
```

### Option 2: Démarrage manuel
```bash
# Terminal 1 - Boutique
cd src && npm run dev

# Terminal 2 - Panel Admin
cd admin-panel && npm run dev
```

## 📱 Accès aux applications

- **Boutique**: http://localhost:5173
- **Panel Admin**: http://localhost:5174

## 🔄 Synchronisation

### Comment ça marche
1. **Ajout de catégorie** dans le panel admin → Apparaît immédiatement dans la boutique
2. **Modification de catégorie** → Changements visibles dans la boutique en quelques secondes
3. **Suppression de catégorie** → Disparaît automatiquement de la boutique
4. **Activation/Désactivation** → Catégorie apparaît/disparaît de la boutique

### Rafraîchissement automatique
- La boutique rafraîchit les catégories toutes les 30 secondes
- Les changements sont visibles sans rechargement de page

## 🎨 Personnalisation des catégories

### Propriétés disponibles
- **Nom**: Nom de la catégorie (obligatoire)
- **Description**: Description de la catégorie
- **Image**: Image de fond de la catégorie
- **Catégorie parent**: Pour créer une hiérarchie
- **Ordre de tri**: Pour organiser l'affichage
- **Active/Inactive**: Contrôle la visibilité
- **Mise en avant**: Pour les catégories spéciales

### Couleurs automatiques
Les catégories reçoivent automatiquement une couleur de fond basée sur leur position dans la liste.

## 🛠️ Dépannage

### Problème: Les catégories ne s'affichent pas
1. Vérifiez que l'API est accessible
2. Vérifiez les logs de la console
3. Assurez-vous que les catégories sont marquées comme "actives"

### Problème: Les changements ne se synchronisent pas
1. Vérifiez la connexion internet
2. Vérifiez que l'URL de l'API est correcte
3. Attendez 30 secondes pour le rafraîchissement automatique

### Problème: Erreur d'upload d'image
1. Vérifiez le format de l'image (JPG, PNG, etc.)
2. Vérifiez la taille de l'image (< 5MB recommandé)
3. Vérifiez les permissions du dossier uploads

## 📝 Notes importantes

- ✅ Les données de démonstration ont été supprimées
- ✅ Seules les catégories actives s'affichent dans la boutique
- ✅ Les images sont automatiquement redimensionnées
- ✅ Les erreurs sont affichées avec des notifications
- ✅ La synchronisation est bidirectionnelle

## 🔒 Sécurité

- Les routes d'administration nécessitent une authentification
- Les uploads d'images sont validés côté serveur
- Les données sont sanitizées avant sauvegarde

## 📞 Support

En cas de problème, vérifiez :
1. Les logs de la console du navigateur
2. Les logs du serveur API
3. La connectivité réseau
4. Les permissions des dossiers