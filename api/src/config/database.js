const fs = require('fs');
const path = require('path');

// Classe pour simuler mongoose mais avec stockage en fichiers JSON
class MemoryDB {
  constructor() {
    this.data = {
      products: [],
      categories: [],
      orders: [],
      users: []
    };
    this.dataPath = path.join(__dirname, '../../data');
    this.ensureDataDirectory();
    this.loadData();
  }

  ensureDataDirectory() {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
      console.log('📁 Dossier de données créé:', this.dataPath);
    }
  }

  loadData() {
    try {
      Object.keys(this.data).forEach(collection => {
        const filePath = path.join(this.dataPath, `${collection}.json`);
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf8');
          this.data[collection] = JSON.parse(fileData);
          console.log(`📄 Données ${collection} chargées: ${this.data[collection].length} éléments`);
        } else {
          // Créer le fichier avec des données par défaut
          this.data[collection] = this.getDefaultData(collection);
          this.saveCollection(collection);
        }
      });
      console.log('✅ Base de données en mémoire initialisée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données:', error.message);
      this.initializeDefaultData();
    }
  }

  getDefaultData(collection) {
    switch (collection) {
      case 'categories':
        return [
          {
            _id: this.generateId(),
            name: 'Fleurs CBD',
            description: 'Fleurs de CBD premium',
            slug: 'fleurs-cbd',
            isActive: true,
            parentCategory: null,
            order: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: this.generateId(),
            name: 'Huiles CBD',
            description: 'Huiles de CBD de qualité',
            slug: 'huiles-cbd',
            isActive: true,
            parentCategory: null,
            order: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            _id: this.generateId(),
            name: 'Résines CBD',
            description: 'Résines et hash CBD',
            slug: 'resines-cbd',
            isActive: true,
            parentCategory: null,
            order: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
      case 'products':
        return [
          {
            _id: this.generateId(),
            name: 'Orange Bud CBD',
            description: 'Fleur de CBD Orange Bud, saveur fruitée et relaxante',
            price: 8.50,
            salePrice: null,
            sku: 'OB-001',
            stock: 25,
            category: 'fleurs-cbd',
            images: [],
            isActive: true,
            isFeatured: true,
            weight: '1g',
            thc: '< 0.3%',
            cbd: '15%',
            tags: ['relaxant', 'fruité', 'premium'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
      case 'orders':
        return [];
      case 'users':
        return [
          {
            _id: this.generateId(),
            email: 'admin@cbd-shop.com',
            password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
            role: 'admin',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
      default:
        return [];
    }
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  saveCollection(collection) {
    try {
      const filePath = path.join(this.dataPath, `${collection}.json`);
      fs.writeFileSync(filePath, JSON.stringify(this.data[collection], null, 2));
    } catch (error) {
      console.error(`❌ Erreur sauvegarde ${collection}:`, error.message);
    }
  }

  saveAll() {
    Object.keys(this.data).forEach(collection => {
      this.saveCollection(collection);
    });
  }

  // Méthodes pour simuler mongoose
  find(collection, query = {}) {
    let results = [...this.data[collection]];
    
    // Filtrage basique
    if (Object.keys(query).length > 0) {
      results = results.filter(item => {
        return Object.keys(query).every(key => {
          if (query[key] && typeof query[key] === 'object' && query[key].$regex) {
            return new RegExp(query[key].$regex, query[key].$options || 'i').test(item[key]);
          }
          return item[key] === query[key];
        });
      });
    }
    
    return results;
  }

  findById(collection, id) {
    return this.data[collection].find(item => item._id === id);
  }

  create(collection, data) {
    const newItem = {
      _id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.data[collection].push(newItem);
    this.saveCollection(collection);
    return newItem;
  }

  updateById(collection, id, updates) {
    const index = this.data[collection].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    this.data[collection][index] = {
      ...this.data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveCollection(collection);
    return this.data[collection][index];
  }

  deleteById(collection, id) {
    const index = this.data[collection].findIndex(item => item._id === id);
    if (index === -1) return null;
    
    const deleted = this.data[collection].splice(index, 1)[0];
    this.saveCollection(collection);
    return deleted;
  }

  initializeDefaultData() {
    console.log('🔄 Initialisation des données par défaut...');
    Object.keys(this.data).forEach(collection => {
      this.data[collection] = this.getDefaultData(collection);
      this.saveCollection(collection);
    });
  }
}

// Instance globale
const memoryDB = new MemoryDB();

// Fonction pour simuler la connexion MongoDB
const connectDB = async () => {
  try {
    console.log('🚀 Base de données en mémoire démarrée');
    console.log('📊 Collections disponibles:', Object.keys(memoryDB.data));
    console.log('✅ Système de persistance JSON activé');
    return true;
  } catch (error) {
    console.error('❌ Erreur d\'initialisation:', error.message);
    return false;
  }
};

module.exports = { connectDB, memoryDB };