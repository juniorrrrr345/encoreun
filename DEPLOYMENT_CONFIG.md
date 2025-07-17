# 🚀 Configuration de Déploiement - Résolution des Conflits

## ⚠️ Problème Identifié

**Conflit entre Vercel et Netlify** :
- Plusieurs `package.json` dans différents dossiers
- Configurations de build qui se chevauchent
- Variables d'environnement en conflit

## 🔧 Solution : Structure de Déploiement Séparée

### Option 1 : Déploiement Vercel (Recommandé)

#### Structure Recommandée
```
/
├── admin-panel/          # Panel admin (déployé séparément)
│   ├── package.json
│   ├── vercel.json
│   └── src/
├── boutique/             # Boutique (déployée séparément)
│   ├── package.json
│   ├── vercel.json
│   └── src/
└── api/                  # API backend
    ├── package.json
    └── src/
```

#### Configuration Vercel pour Panel Admin
```json
// admin-panel/vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "VITE_API_URL": "https://avecamour.wikiplug.com/api"
  }
}
```

#### Configuration Vercel pour Boutique
```json
// boutique/vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "VITE_API_URL": "https://avecamour.wikiplug.com/api"
  }
}
```

### Option 2 : Déploiement Netlify

#### Configuration Netlify pour Panel Admin
```toml
# admin-panel/netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_API_URL = "https://avecamour.wikiplug.com/api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Configuration Netlify pour Boutique
```toml
# boutique/netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_API_URL = "https://avecamour.wikiplug.com/api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🛠️ Actions à Effectuer

### 1. Réorganiser la Structure

```bash
# Créer la nouvelle structure
mkdir -p boutique
mv src/* boutique/
mv package.json boutique/
mv vite.config.js boutique/
mv tailwind.config.js boutique/
mv postcss.config.js boutique/
mv index.html boutique/
mv public boutique/

# Nettoyer les fichiers de configuration
rm -f vercel.json
rm -f netlify.toml
```

### 2. Mettre à Jour les Configurations

#### Panel Admin (`admin-panel/package.json`)
```json
{
  "name": "boutique-admin-panel",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "axios": "^1.3.4",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.1.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.2.7",
    "vite": "^4.1.0"
  }
}
```

#### Boutique (`boutique/package.json`)
```json
{
  "name": "avecamour-boutique",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "axios": "^1.8.4",
    "zustand": "^4.4.1",
    "react-hot-toast": "^2.4.1",
    "framer-motion": "^10.16.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^4.4.5"
  }
}
```

### 3. Variables d'Environnement

#### Vercel
```bash
# Panel Admin
VITE_API_URL=https://avecamour.wikiplug.com/api

# Boutique
VITE_API_URL=https://avecamour.wikiplug.com/api
```

#### Netlify
```bash
# Panel Admin
VITE_API_URL=https://avecamour.wikiplug.com/api

# Boutique
VITE_API_URL=https://avecamour.wikiplug.com/api
```

## 🚀 Déploiement

### Vercel (Recommandé)

#### Panel Admin
```bash
cd admin-panel
vercel --prod
```

#### Boutique
```bash
cd boutique
vercel --prod
```

### Netlify

#### Panel Admin
```bash
cd admin-panel
netlify deploy --prod
```

#### Boutique
```bash
cd boutique
netlify deploy --prod
```

## 🔍 Résolution des Conflits

### Problème 1 : Build Commands en Conflit
**Solution** : Séparer les builds
```json
// admin-panel/vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}

// boutique/vercel.json
{
  "buildCommand": "npm run build", 
  "outputDirectory": "dist"
}
```

### Problème 2 : Variables d'Environnement
**Solution** : Configurer séparément
```bash
# Panel Admin
vercel env add VITE_API_URL

# Boutique  
vercel env add VITE_API_URL
```

### Problème 3 : Dossiers de Sortie
**Solution** : Spécifier les dossiers
```json
{
  "outputDirectory": "dist"
}
```

## 📋 Checklist de Migration

- [ ] Réorganiser la structure des dossiers
- [ ] Mettre à jour les `package.json`
- [ ] Configurer les fichiers de déploiement
- [ ] Tester les builds locaux
- [ ] Déployer sur Vercel/Netlify
- [ ] Vérifier les variables d'environnement
- [ ] Tester les fonctionnalités

## 🎯 URLs Finales

### Vercel
- **Panel Admin** : `https://admin-votre-projet.vercel.app`
- **Boutique** : `https://boutique-votre-projet.vercel.app`

### Netlify
- **Panel Admin** : `https://admin-votre-projet.netlify.app`
- **Boutique** : `https://boutique-votre-projet.netlify.app`

## 🛠️ Commandes de Test

```bash
# Tester le panel admin
cd admin-panel
npm install
npm run build

# Tester la boutique
cd boutique
npm install
npm run build
```

## 📞 Support

En cas de problème :
1. Vérifier les logs de build
2. Tester en local
3. Vérifier les variables d'environnement
4. Contacter l'équipe de développement