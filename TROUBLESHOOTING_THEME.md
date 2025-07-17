# 🔧 Guide de Dépannage - Thème et Bugs

## 🎨 Problèmes de Thème

### Problème: Le thème ne s'applique pas correctement

**Solutions:**
1. **Vérifier la compilation CSS**
   ```bash
   cd admin-panel
   npm run build
   ```

2. **Nettoyer le cache**
   ```bash
   rm -rf node_modules/.cache
   npm run dev
   ```

3. **Vérifier les imports CSS**
   - Assurez-vous que `src/index.css` est importé dans `main.jsx`
   - Vérifiez que Tailwind CSS est correctement configuré

### Problème: Les couleurs ne s'affichent pas

**Solutions:**
1. **Vérifier la configuration Tailwind**
   ```javascript
   // tailwind.config.js
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   ```

2. **Redémarrer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Vérifier les classes CSS personnalisées**
   - Les classes sont définies dans `src/index.css`
   - Vérifiez que les classes sont bien utilisées

## 🐛 Bugs Courants

### Problème: Les animations ne fonctionnent pas

**Solutions:**
1. **Vérifier les keyframes CSS**
   ```css
   @keyframes fadeIn {
     0% { opacity: 0; }
     100% { opacity: 1; }
   }
   ```

2. **Vérifier les classes d'animation**
   ```javascript
   className="animate-fade-in"
   ```

### Problème: Les modals ne s'affichent pas

**Solutions:**
1. **Vérifier le z-index**
   ```css
   .modal-overlay {
     z-index: 50;
   }
   ```

2. **Vérifier la structure HTML**
   ```jsx
   <div className="modal-overlay">
     <div className="modal-content">
       {/* Contenu */}
     </div>
   </div>
   ```

### Problème: Les notifications ne s'affichent pas

**Solutions:**
1. **Vérifier l'import de react-hot-toast**
   ```javascript
   import { Toaster } from 'react-hot-toast';
   ```

2. **Vérifier la configuration du Toaster**
   ```jsx
   <Toaster 
     position="top-right"
     toastOptions={{
       style: {
         background: '#1f2937',
         color: '#fff',
       }
     }}
   />
   ```

## 🔄 Problèmes de Synchronisation

### Problème: Les changements ne se synchronisent pas

**Solutions:**
1. **Vérifier l'URL de l'API**
   ```javascript
   const API_BASE_URL = 'https://avecamour.wikiplug.com/api';
   ```

2. **Vérifier la fonction de rafraîchissement**
   ```javascript
   const refreshCategories = async () => {
     try {
       const response = await api.get('/categories');
       const categories = response.data.data?.categories || response.data || [];
       set({ categories });
     } catch (error) {
       console.error('Erreur:', error);
     }
   };
   ```

3. **Vérifier l'intervalle de rafraîchissement**
   ```javascript
   useEffect(() => {
     const interval = setInterval(() => {
       refreshCategories();
     }, 30000); // 30 secondes
     
     return () => clearInterval(interval);
   }, []);
   ```

## 🎯 Problèmes d'Interface

### Problème: Les boutons ne répondent pas

**Solutions:**
1. **Vérifier les classes CSS**
   ```css
   .btn-primary {
     @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl;
   }
   ```

2. **Vérifier les événements onClick**
   ```jsx
   <button onClick={handleClick} className="btn-primary">
     Cliquer ici
   </button>
   ```

### Problème: Les formulaires ne fonctionnent pas

**Solutions:**
1. **Vérifier les champs requis**
   ```jsx
   <input
     type="text"
     required
     value={formData.name}
     onChange={(e) => setFormData({...formData, name: e.target.value})}
     className="input-field"
   />
   ```

2. **Vérifier la soumission du formulaire**
   ```jsx
   <form onSubmit={handleSubmit}>
     {/* Champs */}
     <button type="submit">Envoyer</button>
   </form>
   ```

## 🛠️ Outils de Débogage

### Console du navigateur
1. Ouvrir les outils de développement (F12)
2. Aller dans l'onglet Console
3. Vérifier les erreurs JavaScript

### Réseau
1. Onglet Network des outils de développement
2. Vérifier les requêtes API
3. Vérifier les codes de statut HTTP

### Éléments
1. Onglet Elements des outils de développement
2. Inspecter les classes CSS appliquées
3. Vérifier la structure HTML

## 📋 Checklist de Vérification

### Avant de signaler un bug
- [ ] Vérifier la console du navigateur
- [ ] Vérifier les requêtes réseau
- [ ] Tester sur différents navigateurs
- [ ] Vérifier la version de Node.js
- [ ] Vérifier les dépendances npm

### Pour les problèmes de thème
- [ ] Vérifier la compilation CSS
- [ ] Vérifier les classes Tailwind
- [ ] Vérifier les imports CSS
- [ ] Redémarrer le serveur de développement

### Pour les problèmes de synchronisation
- [ ] Vérifier l'URL de l'API
- [ ] Vérifier la connectivité réseau
- [ ] Vérifier les logs du serveur
- [ ] Vérifier les permissions CORS

## 🚀 Solutions Rapides

### Redémarrer tout le système
```bash
# Arrêter tous les processus
pkill -f "npm run dev"

# Nettoyer le cache
rm -rf node_modules/.cache

# Redémarrer
./start-apps.sh
```

### Réinstaller les dépendances
```bash
# Panel admin
cd admin-panel
rm -rf node_modules package-lock.json
npm install

# Boutique
cd ../src
rm -rf node_modules package-lock.json
npm install
```

### Vérifier la configuration
```bash
# Vérifier les versions
node --version
npm --version

# Vérifier les dépendances
npm list --depth=0
```

## 📞 Support

Si les problèmes persistent :
1. Vérifier les logs du serveur API
2. Vérifier la connectivité réseau
3. Tester sur un autre appareil
4. Contacter l'équipe de développement