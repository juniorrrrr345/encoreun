// Base de données temporaire en mémoire
let memoryDB = {
  products: [
    {
      _id: '1',
      name: 'Huile CBD 10% Full Spectrum',
      description: 'Huile de CBD full spectrum 10% dans une base d\'huile de chanvre bio. Extraction CO2 supercritique pour préserver tous les cannabinoïdes et terpènes naturels.',
      shortDescription: 'Huile CBD 10% de qualité premium',
      price: 49.99,
      originalPrice: 59.99,
      category: 'Huiles CBD',
      subcategory: 'Full Spectrum',
      stock: 25,
      sku: 'CBD-OIL-10-FS',
      images: ['/images/huile-cbd-10.jpg'],
      mainImage: '/images/huile-cbd-10.jpg',
      tags: ['CBD', 'Full Spectrum', 'Bio', 'Premium'],
      isActive: true,
      isFeatured: true,
      isOnSale: true,
      salePercentage: 17,
      weight: 10,
      specifications: [
        { name: 'Concentration', value: '10% CBD' },
        { name: 'Extraction', value: 'CO2 Supercritique' },
        { name: 'Type', value: 'Full Spectrum' }
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Fleur Amnesia CBD',
      description: 'Fleur de CBD Amnesia cultivée en indoor. Arômes citronnés et terreux. Taux de CBD élevé avec moins de 0,3% de THC.',
      shortDescription: 'Fleur CBD Amnesia premium indoor',
      price: 8.50,
      originalPrice: 8.50,
      category: 'Fleurs CBD',
      subcategory: 'Indoor',
      stock: 15,
      sku: 'CBD-FLOWER-AMNESIA',
      images: ['/images/fleur-amnesia.jpg'],
      mainImage: '/images/fleur-amnesia.jpg',
      tags: ['CBD', 'Fleur', 'Indoor', 'Amnesia'],
      isActive: true,
      isFeatured: false,
      isOnSale: false,
      salePercentage: 0,
      weight: 1,
      specifications: [
        { name: 'Concentration', value: '18% CBD' },
        { name: 'Culture', value: 'Indoor' },
        { name: 'THC', value: '< 0.3%' }
      ],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      _id: '3',
      name: 'Résine Charas CBD',
      description: 'Résine Charas CBD artisanale de haute qualité. Texture malléable et arômes authentiques. Méthode traditionnelle.',
      shortDescription: 'Résine CBD Charas artisanale',
      price: 12.00,
      originalPrice: 12.00,
      category: 'Résines CBD',
      subcategory: 'Artisanale',
      stock: 8,
      sku: 'CBD-RESIN-CHARAS',
      images: ['/images/resine-charas.jpg'],
      mainImage: '/images/resine-charas.jpg',
      tags: ['CBD', 'Résine', 'Charas', 'Artisanal'],
      isActive: true,
      isFeatured: true,
      isOnSale: false,
      salePercentage: 0,
      weight: 1,
      specifications: [
        { name: 'Concentration', value: '22% CBD' },
        { name: 'Type', value: 'Charas' },
        { name: 'Méthode', value: 'Artisanale' }
      ],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    }
  ],
  categories: [
    {
      _id: '1',
      name: 'Huiles CBD',
      description: 'Huiles de CBD premium, full spectrum et broad spectrum',
      slug: 'huiles-cbd',
      image: '/images/categories/huiles.jpg',
      isActive: true,
      isFeatured: true,
      sortOrder: 1,
      metaTitle: 'Huiles CBD - CBD Shop',
      metaDescription: 'Découvrez notre gamme d\'huiles CBD de qualité premium',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      _id: '2',
      name: 'Fleurs CBD',
      description: 'Fleurs de CBD cultivées naturellement, riches en cannabinoïdes',
      slug: 'fleurs-cbd',
      image: '/images/categories/fleurs.jpg',
      isActive: true,
      isFeatured: true,
      sortOrder: 2,
      metaTitle: 'Fleurs CBD - CBD Shop',
      metaDescription: 'Fleurs de CBD biologiques et naturelles',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      _id: '3',
      name: 'Résines CBD',
      description: 'Résines et hash CBD artisanaux de haute qualité',
      slug: 'resines-cbd',
      image: '/images/categories/resines.jpg',
      isActive: true,
      isFeatured: true,
      sortOrder: 3,
      metaTitle: 'Résines CBD - CBD Shop',
      metaDescription: 'Résines CBD artisanales premium',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ],
  orders: [
    {
      _id: '1',
      orderNumber: 'CMD-2024-001',
      customerEmail: 'client@example.com',
      customerName: 'Jean Dupont',
      items: [
        {
          product: '1',
          productName: 'Huile CBD 10% Full Spectrum',
          quantity: 1,
          price: 49.99
        }
      ],
      totalAmount: 49.99,
      status: 'pending',
      shippingAddress: {
        street: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        country: 'France'
      },
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16')
    }
  ]
};

// Simulation des opérations de base de données
const MemoryDB = {
  // Connexion (simulée)
  connect: () => {
    console.log('🟡 Base de données en mémoire connectée (temporaire)');
    return Promise.resolve();
  },

  // Produits
  products: {
    find: (filter = {}) => {
      let products = [...memoryDB.products];
      
      // Filtrage simple
      if (filter.isActive !== undefined) {
        products = products.filter(p => p.isActive === filter.isActive);
      }
      if (filter.category) {
        products = products.filter(p => p.category === filter.category);
      }
      
      return Promise.resolve({
        data: products,
        total: products.length,
        page: 1,
        limit: products.length
      });
    },

    findById: (id) => {
      const product = memoryDB.products.find(p => p._id === id);
      return Promise.resolve(product || null);
    },

    create: (productData) => {
      const newProduct = {
        ...productData,
        _id: (memoryDB.products.length + 1).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryDB.products.push(newProduct);
      return Promise.resolve(newProduct);
    },

    update: (id, updateData) => {
      const index = memoryDB.products.findIndex(p => p._id === id);
      if (index !== -1) {
        memoryDB.products[index] = {
          ...memoryDB.products[index],
          ...updateData,
          updatedAt: new Date()
        };
        return Promise.resolve(memoryDB.products[index]);
      }
      return Promise.resolve(null);
    },

    delete: (id) => {
      const index = memoryDB.products.findIndex(p => p._id === id);
      if (index !== -1) {
        const deleted = memoryDB.products.splice(index, 1)[0];
        return Promise.resolve(deleted);
      }
      return Promise.resolve(null);
    }
  },

  // Catégories
  categories: {
    find: (filter = {}) => {
      let categories = [...memoryDB.categories];
      
      if (filter.isActive !== undefined) {
        categories = categories.filter(c => c.isActive === filter.isActive);
      }
      
      return Promise.resolve({
        data: categories,
        total: categories.length,
        page: 1,
        limit: categories.length
      });
    },

    findById: (id) => {
      const category = memoryDB.categories.find(c => c._id === id);
      return Promise.resolve(category || null);
    },

    create: (categoryData) => {
      const newCategory = {
        ...categoryData,
        _id: (memoryDB.categories.length + 1).toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryDB.categories.push(newCategory);
      return Promise.resolve(newCategory);
    },

    update: (id, updateData) => {
      const index = memoryDB.categories.findIndex(c => c._id === id);
      if (index !== -1) {
        memoryDB.categories[index] = {
          ...memoryDB.categories[index],
          ...updateData,
          updatedAt: new Date()
        };
        return Promise.resolve(memoryDB.categories[index]);
      }
      return Promise.resolve(null);
    },

    delete: (id) => {
      const index = memoryDB.categories.findIndex(c => c._id === id);
      if (index !== -1) {
        const deleted = memoryDB.categories.splice(index, 1)[0];
        return Promise.resolve(deleted);
      }
      return Promise.resolve(null);
    }
  },

  // Commandes
  orders: {
    find: (filter = {}) => {
      let orders = [...memoryDB.orders];
      
      if (filter.status) {
        orders = orders.filter(o => o.status === filter.status);
      }
      
      return Promise.resolve({
        data: orders,
        total: orders.length,
        page: 1,
        limit: orders.length
      });
    },

    findById: (id) => {
      const order = memoryDB.orders.find(o => o._id === id);
      return Promise.resolve(order || null);
    },

    create: (orderData) => {
      const newOrder = {
        ...orderData,
        _id: (memoryDB.orders.length + 1).toString(),
        orderNumber: `CMD-2024-${String(memoryDB.orders.length + 1).padStart(3, '0')}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryDB.orders.push(newOrder);
      return Promise.resolve(newOrder);
    },

    update: (id, updateData) => {
      const index = memoryDB.orders.findIndex(o => o._id === id);
      if (index !== -1) {
        memoryDB.orders[index] = {
          ...memoryDB.orders[index],
          ...updateData,
          updatedAt: new Date()
        };
        return Promise.resolve(memoryDB.orders[index]);
      }
      return Promise.resolve(null);
    }
  }
};

module.exports = MemoryDB;