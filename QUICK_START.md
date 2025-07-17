# 🚀 Guide de Démarrage Rapide

## Démarrage en une commande

```bash
npm start
```

Cette commande démarre automatiquement :
- ✅ **API Backend** (port 5000)
- ✅ **Boutique** (port 5173)
- ✅ **Panel Admin** (port 5174)

## 🌐 URLs d'accès

| Service | URL | Description |
|---------|-----|-------------|
| **Boutique** | http://localhost:5173 | Interface client |
| **Panel Admin** | http://localhost:5174 | Interface d'administration |
| **API** | http://localhost:5000 | Backend REST API |

## 🔑 Identifiants Admin

- **Email** : `admin@example.com`
- **Mot de passe** : `admin123`

## 📊 Données disponibles

### Catégories (6)
- 🎽 **Vêtements** - Mode et accessoires
- 💄 **Beauté** - Produits de beauté
- 🏠 **Maison** - Décoration et accessoires
- 💍 **Bijoux** - Bijoux et accessoires
- 📱 **Tech** - Gadgets et accessoires
- 🏃 **Sport** - Équipements sportifs

### Produits (6)
- **T-shirt Premium** - 29.99€ (en promotion)
- **Crème hydratante** - 24.99€ (en promotion)
- **Vase décoratif** - 45.00€
- **Bracelet en argent** - 89.99€
- **Écouteurs sans fil** - 129.99€ (en promotion)
- **Leggings de sport** - 34.99€

## 🛠️ Fonctionnalités

### Boutique
- ✅ Navigation par catégories
- ✅ Affichage des produits
- ✅ Détails des produits
- ✅ Interface responsive
- ✅ Animations fluides

### Panel Admin
- ✅ Dashboard avec statistiques
- ✅ Gestion des produits
- ✅ Gestion des commandes
- ✅ Interface moderne

### API
- ✅ RESTful API complète
- ✅ Données en mémoire (pas de DB requise)
- ✅ Validation des données
- ✅ Gestion des erreurs

## 🔧 Commandes utiles

```bash
# Démarrage complet
npm start

# Démarrage individuel
npm run api      # API seulement
npm run admin    # Panel admin seulement
npm run dev      # Boutique seulement

# Build de production
npm run build
```

## 🚨 Résolution de problèmes

### Ports déjà utilisés
```bash
# Vérifier les processus
lsof -i :5000
lsof -i :5173
lsof -i :5174

# Tuer les processus si nécessaire
kill -9 <PID>
```

### Erreur de démarrage
1. Vérifiez que Node.js est installé
2. Vérifiez que les ports sont libres
3. Relancez avec `npm start`

## 📝 Notes

- Le système fonctionne **sans base de données** avec des données en mémoire
- Toutes les données sont **persistantes** pendant la session
- L'API est **entièrement fonctionnelle** avec des données de test
- Le panel admin est **pré-configuré** avec un utilisateur admin

## 🎉 Prêt à utiliser !

Le système est maintenant **entièrement fonctionnel** et prêt à être utilisé !