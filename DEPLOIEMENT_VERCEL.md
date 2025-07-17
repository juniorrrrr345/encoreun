# 🚀 Guide de Déploiement Vercel - Étape par Étape

## ✅ Prérequis Vérifiés

- ✅ CSS corrigé (pas de `@apply group`)
- ✅ Structure des dossiers organisée
- ✅ Configurations Vercel créées
- ✅ Builds locaux fonctionnels

## 🎯 Déploiement du Panel Admin

### Étape 1 : Préparer le Repository

```bash
# Vérifier que tout est commité
git add .
git commit -m "fix: resolve CSS conflicts and prepare for Vercel deployment"
git push origin main
```

### Étape 2 : Déployer le Panel Admin

1. **Aller sur Vercel.com**
   - Connectez-vous à votre compte Vercel
   - Cliquez sur "New Project"

2. **Importer le Repository**
   - Sélectionnez votre repository GitHub
   - Cliquez sur "Import"

3. **Configurer le Panel Admin**
   ```
   Framework Preset: Vite
   Root Directory: admin-panel
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Variables d'Environnement**
   ```
   VITE_API_URL = https://avecamour.wikiplug.com/api
   ```

5. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez la fin du build

### Étape 3 : Déployer la Boutique

1. **Nouveau Projet Vercel**
   - Cliquez sur "New Project"
   - Sélectionnez le même repository

2. **Configurer la Boutique**
   ```
   Framework Preset: Vite
   Root Directory: boutique
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Variables d'Environnement**
   ```
   VITE_API_URL = https://avecamour.wikiplug.com/api
   ```

4. **Déployer**
   - Cliquez sur "Deploy"

## 🔧 Configuration Avancée

### Domains Personnalisés

1. **Panel Admin**
   ```
   admin.votre-domaine.com
   ```

2. **Boutique**
   ```
   boutique.votre-domaine.com
   ```

### Variables d'Environnement

```bash
# Panel Admin
VITE_API_URL=https://avecamour.wikiplug.com/api
NODE_ENV=production

# Boutique
VITE_API_URL=https://avecamour.wikiplug.com/api
NODE_ENV=production
```

## 📊 Monitoring et Analytics

### Vercel Analytics
- Activez Vercel Analytics pour suivre les performances
- Configurez les événements personnalisés

### Logs de Build
```bash
# Voir les logs en temps réel
vercel logs --follow

# Voir les logs d'un déploiement spécifique
vercel logs --deployment=deployment_id
```

## 🛠️ Commandes Vercel CLI

### Installation
```bash
npm i -g vercel
```

### Login
```bash
vercel login
```

### Déploiement Manuel
```bash
# Panel Admin
cd admin-panel
vercel --prod

# Boutique
cd boutique
vercel --prod
```

### Variables d'Environnement
```bash
# Ajouter une variable
vercel env add VITE_API_URL

# Lister les variables
vercel env ls

# Supprimer une variable
vercel env rm VITE_API_URL
```

## 🔍 Dépannage

### Erreur de Build
```bash
# Vérifier les logs
vercel logs

# Rebuild local
npm run build

# Vérifier les dépendances
npm install
```

### Erreur de Variables d'Environnement
```bash
# Vérifier les variables
vercel env ls

# Redéployer avec les bonnes variables
vercel --prod
```

### Erreur de Routing
```json
// vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎯 URLs Finales

### Panel Admin
- **URL** : `https://admin-votre-projet.vercel.app`
- **Fonctionnalités** :
  - Gestion des catégories
  - Interface sombre moderne
  - Synchronisation avec la boutique

### Boutique
- **URL** : `https://boutique-votre-projet.vercel.app`
- **Fonctionnalités** :
  - Affichage des catégories
  - Synchronisation automatique
  - Interface responsive

## 📱 Test Post-Déploiement

### Panel Admin
1. ✅ Accéder à l'URL du panel admin
2. ✅ Vérifier la connexion à l'API
3. ✅ Tester l'ajout d'une catégorie
4. ✅ Vérifier les notifications
5. ✅ Tester la synchronisation

### Boutique
1. ✅ Accéder à l'URL de la boutique
2. ✅ Vérifier l'affichage des catégories
3. ✅ Tester la navigation
4. ✅ Vérifier la synchronisation
5. ✅ Tester sur mobile

## 🔄 Mises à Jour

### Déploiement Automatique
- Chaque push sur `main` déclenche un nouveau déploiement
- Les previews sont créées pour les branches

### Déploiement Manuel
```bash
# Panel Admin
cd admin-panel
vercel --prod

# Boutique
cd boutique
vercel --prod
```

## 📞 Support

### En cas de problème :
1. Vérifier les logs Vercel
2. Tester en local
3. Vérifier les variables d'environnement
4. Contacter l'équipe de développement

### Ressources Utiles :
- [Documentation Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Vercel Analytics](https://vercel.com/docs/analytics)