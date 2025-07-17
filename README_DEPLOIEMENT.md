# 🚀 Guide de Déploiement Vercel

## ✅ Problème Résolu

L'erreur de compilation CSS a été corrigée :
- **Problème** : `@apply` ne peut pas être utilisé avec l'utilitaire `group`
- **Solution** : Séparation de la classe `group` dans le JSX

## 📋 Configuration du Déploiement

### Panel Admin (`/admin-panel`)

**Configuration Vercel :**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

**Déploiement :**
1. Connectez-vous à Vercel
2. Importez le projet depuis GitHub
3. Configurez le dossier racine : `admin-panel`
4. Variables d'environnement :
   ```
   VITE_API_URL=https://avecamour.wikiplug.com/api
   ```

### Boutique (`/src`)

**Configuration Vercel :**
```json
{
  "buildCommand": "cd src && npm run build",
  "outputDirectory": "src/dist",
  "framework": "vite"
}
```

**Déploiement :**
1. Connectez-vous à Vercel
2. Importez le projet depuis GitHub
3. Configurez le dossier racine : `src`
4. Variables d'environnement :
   ```
   VITE_API_URL=https://avecamour.wikiplug.com/api
   ```

## 🔧 Optimisations de Performance

### Headers de Sécurité
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
}
```

### Cache des Assets
```json
{
  "Cache-Control": "public, max-age=31536000, immutable"
}
```

### Routes SPA
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎯 URLs de Déploiement

### Panel Admin
- **URL** : `https://votre-projet-admin.vercel.app`
- **Fonctionnalités** :
  - Gestion des catégories
  - Interface sombre moderne
  - Synchronisation avec la boutique

### Boutique
- **URL** : `https://votre-projet-boutique.vercel.app`
- **Fonctionnalités** :
  - Affichage des catégories
  - Synchronisation automatique
  - Interface responsive

## 🔄 Synchronisation

### API Configuration
```javascript
// Panel Admin
const API_BASE_URL = 'https://avecamour.wikiplug.com/api';

// Boutique
const API_BASE_URL = 'https://avecamour.wikiplug.com/api';
```

### Rafraîchissement Automatique
- **Intervalle** : 30 secondes
- **Fonction** : `refreshCategories()`
- **Effet** : Mise à jour en temps réel

## 🛠️ Commandes de Déploiement

### Test Local
```bash
# Panel Admin
cd admin-panel
npm run build

# Boutique
cd src
npm run build
```

### Déploiement Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer le panel admin
cd admin-panel
vercel --prod

# Déployer la boutique
cd ../src
vercel --prod
```

## 📊 Monitoring

### Métriques de Performance
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

### Optimisations Appliquées
- ✅ Code splitting automatique
- ✅ Compression gzip
- ✅ Cache des assets statiques
- ✅ Lazy loading des composants
- ✅ Optimisation des images

## 🔍 Dépannage Déploiement

### Erreurs Courantes

1. **Erreur de build CSS**
   ```bash
   # Solution : Vérifier les classes @apply
   # Ne pas utiliser @apply avec group
   ```

2. **Erreur de dépendances**
   ```bash
   # Solution : Nettoyer le cache
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Erreur de variables d'environnement**
   ```bash
   # Solution : Vérifier les variables Vercel
   # VITE_API_URL=https://avecamour.wikiplug.com/api
   ```

### Logs de Débogage
```bash
# Vérifier les logs de build
vercel logs

# Vérifier les logs en temps réel
vercel logs --follow
```

## 🎨 Thème et Interface

### Panel Admin
- ✅ Thème sombre moderne
- ✅ Animations fluides
- ✅ Interface responsive
- ✅ Notifications en temps réel

### Boutique
- ✅ Design épuré
- ✅ Couleurs dynamiques
- ✅ Pagination des catégories
- ✅ Synchronisation automatique

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 640px
- **Tablet** : 640px - 1024px
- **Desktop** : > 1024px

### Optimisations
- ✅ Images adaptatives
- ✅ Navigation mobile
- ✅ Touch-friendly
- ✅ Performance mobile

## 🚀 Prochaines Étapes

1. **Déployer sur Vercel**
2. **Configurer les domaines personnalisés**
3. **Mettre en place le monitoring**
4. **Optimiser les performances**
5. **Ajouter des tests automatisés**

## 📞 Support

En cas de problème :
1. Vérifier les logs Vercel
2. Tester en local
3. Vérifier la configuration
4. Contacter l'équipe de développement