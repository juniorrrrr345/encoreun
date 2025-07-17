const Product = require('../models/Product');
const mongoose = require('mongoose');

// Données de test en mémoire pour les produits
const defaultProducts = [
  {
    _id: '1',
    name: 'T-shirt Premium',
    description: 'T-shirt en coton bio de haute qualité, confortable et durable',
    shortDescription: 'T-shirt premium en coton bio',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Vêtements',
    subcategory: 'T-shirts',
    images: ['/images/products/tshirt-1.jpg', '/images/products/tshirt-2.jpg'],
    mainImage: '/images/products/tshirt-1.jpg',
    stock: 50,
    sku: 'TSH-001',
    tags: ['cotton', 'bio', 'premium'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 25,
    weight: 0.2,
    dimensions: { length: 70, width: 50, height: 2 },
    specifications: [
      { name: 'Matériau', value: '100% Coton bio' },
      { name: 'Taille', value: 'S, M, L, XL' },
      { name: 'Couleur', value: 'Blanc, Noir, Bleu' }
    ],
    ratings: { average: 4.5, count: 12 },
    views: 150,
    sales: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Crème hydratante',
    description: 'Crème hydratante naturelle pour tous types de peau',
    shortDescription: 'Crème hydratante naturelle',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Beauté',
    subcategory: 'Soins visage',
    images: ['/images/products/cream-1.jpg'],
    mainImage: '/images/products/cream-1.jpg',
    stock: 30,
    sku: 'BEAU-001',
    tags: ['naturel', 'hydratant', 'bio'],
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    salePercentage: 17,
    weight: 0.05,
    specifications: [
      { name: 'Volume', value: '50ml' },
      { name: 'Type de peau', value: 'Tous types' },
      { name: 'Composition', value: '100% Naturelle' }
    ],
    ratings: { average: 4.2, count: 8 },
    views: 89,
    sales: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Vase décoratif',
    description: 'Vase en céramique élégant pour décorer votre intérieur',
    shortDescription: 'Vase décoratif en céramique',
    price: 45.00,
    category: 'Maison',
    subcategory: 'Décoration',
    images: ['/images/products/vase-1.jpg'],
    mainImage: '/images/products/vase-1.jpg',
    stock: 15,
    sku: 'MAI-001',
    tags: ['décoration', 'céramique', 'élégant'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    weight: 0.8,
    dimensions: { length: 20, width: 20, height: 30 },
    specifications: [
      { name: 'Matériau', value: 'Céramique' },
      { name: 'Hauteur', value: '30cm' },
      { name: 'Couleur', value: 'Blanc' }
    ],
    ratings: { average: 4.7, count: 5 },
    views: 67,
    sales: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: 'Bracelet en argent',
    description: 'Bracelet élégant en argent sterling, parfait pour tous les styles',
    shortDescription: 'Bracelet en argent sterling',
    price: 89.99,
    category: 'Bijoux',
    subcategory: 'Bracelets',
    images: ['/images/products/bracelet-1.jpg'],
    mainImage: '/images/products/bracelet-1.jpg',
    stock: 25,
    sku: 'BIJ-001',
    tags: ['argent', 'sterling', 'élégant'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    weight: 0.05,
    specifications: [
      { name: 'Matériau', value: 'Argent sterling 925' },
      { name: 'Taille', value: 'Ajustable' },
      { name: 'Style', value: 'Classique' }
    ],
    ratings: { average: 4.8, count: 18 },
    views: 234,
    sales: 32,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    name: 'Écouteurs sans fil',
    description: 'Écouteurs bluetooth haute qualité avec réduction de bruit',
    shortDescription: 'Écouteurs bluetooth premium',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Tech',
    subcategory: 'Audio',
    images: ['/images/products/headphones-1.jpg'],
    mainImage: '/images/products/headphones-1.jpg',
    stock: 40,
    sku: 'TECH-001',
    tags: ['bluetooth', 'audio', 'premium'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 19,
    weight: 0.3,
    specifications: [
      { name: 'Connectivité', value: 'Bluetooth 5.0' },
      { name: 'Autonomie', value: '8h' },
      { name: 'Réduction de bruit', value: 'Active' }
    ],
    ratings: { average: 4.6, count: 25 },
    views: 456,
    sales: 67,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    name: 'Leggings de sport',
    description: 'Leggings confortables et respirants pour vos séances de sport',
    shortDescription: 'Leggings de sport confortables',
    price: 34.99,
    category: 'Sport',
    subcategory: 'Vêtements',
    images: ['/images/products/leggings-1.jpg'],
    mainImage: '/images/products/leggings-1.jpg',
    stock: 35,
    sku: 'SPORT-001',
    tags: ['sport', 'confortable', 'respirant'],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    weight: 0.3,
    specifications: [
      { name: 'Matériau', value: 'Polyester/Élasthanne' },
      { name: 'Taille', value: 'XS, S, M, L, XL' },
      { name: 'Style', value: 'Haute taille' }
    ],
    ratings: { average: 4.3, count: 14 },
    views: 123,
    sales: 19,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Obtenir tous les produits avec pagination et filtres
const getAllProducts = async (req, res) => {
  try {
    // Essayer d'utiliser MongoDB
    if (mongoose.connection.readyState === 1) {
      const {
        page = 1,
        limit = 10,
        search,
        category,
        isActive,
        isFeatured,
        isOnSale,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      // Construire les filtres
      const filters = {};
      
      if (search) {
        filters.$text = { $search: search };
      }
      
      if (category) {
        filters.category = category;
      }
      
      if (isActive !== undefined) {
        filters.isActive = isActive === 'true';
      }
      
      if (isFeatured !== undefined) {
        filters.isFeatured = isFeatured === 'true';
      }
      
      if (isOnSale !== undefined) {
        filters.isOnSale = isOnSale === 'true';
      }

      // Construire le tri
      const sort = {};
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Calculer la pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Exécuter les requêtes
      const [products, total] = await Promise.all([
        Product.find(filters)
          .sort(sort)
          .skip(skip)
          .limit(parseInt(limit))
          .populate('category', 'name'),
        Product.countDocuments(filters)
      ]);

      const totalPages = Math.ceil(total / parseInt(limit));

      return res.status(200).json({
        success: true,
        data: {
          products,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: total,
            itemsPerPage: parseInt(limit)
          }
        }
      });
    } else {
      // Utiliser les données en mémoire
      console.log('📦 Utilisation des produits par défaut (mode mémoire)');
      
      let filteredProducts = defaultProducts.filter(product => product.isActive);
      
      // Appliquer les filtres
      if (req.query.category) {
        filteredProducts = filteredProducts.filter(p => p.category === req.query.category);
      }
      
      if (req.query.isFeatured === 'true') {
        filteredProducts = filteredProducts.filter(p => p.isFeatured);
      }
      
      if (req.query.isOnSale === 'true') {
        filteredProducts = filteredProducts.filter(p => p.isOnSale);
      }
      
      return res.status(200).json({
        success: true,
        data: {
          products: filteredProducts,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: filteredProducts.length,
            itemsPerPage: filteredProducts.length
          }
        }
      });
    }
  } catch (error) {
    console.error('Erreur de récupération des produits:', error);
    // En cas d'erreur, retourner les données par défaut
    return res.status(200).json({
      success: true,
      data: {
        products: defaultProducts.filter(product => product.isActive),
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: defaultProducts.length,
          itemsPerPage: defaultProducts.length
        }
      }
    });
  }
};

// Obtenir un produit par ID
const getProductById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }

      return res.status(200).json({
        success: true,
        data: { product }
      });
    } else {
      // Chercher dans les données par défaut
      const product = defaultProducts.find(p => p._id === req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }

      return res.status(200).json({
        success: true,
        data: { product }
      });
    }
  } catch (error) {
    console.error('Erreur de récupération du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Créer un nouveau produit
const createProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = new Product(req.body);
      await product.save();

      res.status(201).json({
        success: true,
        message: 'Produit créé avec succès',
        data: { product }
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur de création du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produit mis à jour avec succès',
        data: { product }
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur de mise à jour du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Soft delete - Désactiver un produit au lieu de le supprimer
const deleteProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { 
          isActive: false,
          isFeatured: false,
          isOnSale: false,
          stock: 0
        },
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Produit désactivé avec succès'
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur de désactivation du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Mettre à jour le stock d'un produit
const updateStock = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const { stock } = req.body;
      
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { stock },
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Stock mis à jour avec succès',
        data: { product }
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur de mise à jour du stock:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Basculer le statut d'un produit
const toggleProductStatus = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }

      product.isActive = !product.isActive;
      await product.save();

      res.status(200).json({
        success: true,
        message: `Produit ${product.isActive ? 'activé' : 'désactivé'} avec succès`,
        data: { product }
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur de basculement du statut:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Obtenir les statistiques des produits
const getProductStats = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const [
        totalProducts,
        activeProducts,
        featuredProducts,
        onSaleProducts,
        lowStockProducts
      ] = await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ isActive: true }),
        Product.countDocuments({ isFeatured: true }),
        Product.countDocuments({ isOnSale: true }),
        Product.countDocuments({ stock: { $lt: 10 } })
      ]);

      res.status(200).json({
        success: true,
        data: {
          totalProducts,
          activeProducts,
          featuredProducts,
          onSaleProducts,
          lowStockProducts
        }
      });
    } else {
      // Statistiques avec les données en mémoire
      const totalProducts = defaultProducts.length;
      const activeProducts = defaultProducts.filter(p => p.isActive).length;
      const featuredProducts = defaultProducts.filter(p => p.isFeatured).length;
      const onSaleProducts = defaultProducts.filter(p => p.isOnSale).length;
      const lowStockProducts = defaultProducts.filter(p => p.stock < 10).length;

      res.status(200).json({
        success: true,
        data: {
          totalProducts,
          activeProducts,
          featuredProducts,
          onSaleProducts,
          lowStockProducts
        }
      });
    }
  } catch (error) {
    console.error('Erreur de récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Rechercher des produits
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Terme de recherche requis'
      });
    }

    if (mongoose.connection.readyState === 1) {
      const products = await Product.find({
        $text: { $search: q }
      }).limit(20);

      res.status(200).json({
        success: true,
        data: { products }
      });
    } else {
      // Recherche dans les données en mémoire
      const searchTerm = q.toLowerCase();
      const products = defaultProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      ).slice(0, 20);

      res.status(200).json({
        success: true,
        data: { products }
      });
    }
  } catch (error) {
    console.error('Erreur de recherche:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  toggleProductStatus,
  getProductStats,
  searchProducts
};