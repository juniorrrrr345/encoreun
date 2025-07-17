const Product = require('../models/Product');
const Category = require('../models/Category');

// Obtenir tous les produits
const getAllProducts = async (req, res) => {
  try {
    const { 
      category, 
      isActive, 
      isFeatured, 
      minPrice, 
      maxPrice, 
      search,
      page = 1, 
      limit = 20 
    } = req.query;
    
    let products = Product.find();
    
    // Appliquer les filtres
    if (category) {
      products = products.filter(prod => prod.category === category);
    }
    if (isActive !== undefined) {
      products = products.filter(prod => prod.isActive === (isActive === 'true'));
    }
    if (isFeatured !== undefined) {
      products = products.filter(prod => prod.isFeatured === (isFeatured === 'true'));
    }
    if (minPrice) {
      products = products.filter(prod => (prod.salePrice || prod.price) >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(prod => (prod.salePrice || prod.price) <= parseFloat(maxPrice));
    }
    if (search) {
      const searchProducts = Product.search(search, 1000);
      const searchIds = searchProducts.map(p => p._id);
      products = products.filter(prod => searchIds.includes(prod._id));
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(products.length / limit),
        totalItems: products.length,
        hasNext: endIndex < products.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Erreur getAllProducts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error.message
    });
  }
};

// Obtenir un produit par ID
const getProductById = async (req, res) => {
  try {
    const product = Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Obtenir les produits similaires
    const relatedProducts = Product.findRelated(product._id, 4);
    
    res.json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    });
  } catch (error) {
    console.error('Erreur getProductById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message
    });
  }
};

// Créer un nouveau produit
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Vérifier si un produit avec le même SKU existe déjà
    if (productData.sku) {
      const existingProduct = Product.findBySku(productData.sku);
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'Un produit avec ce SKU existe déjà'
        });
      }
    }
    
    // Vérifier que la catégorie existe
    if (productData.category) {
      const category = Category.findBySlug(productData.category);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Catégorie non trouvée'
        });
      }
    }
    
    // Traiter les images uploadées
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => `/uploads/${file.filename}`);
    }
    
    const newProduct = Product.create(productData);
    
    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      data: newProduct
    });
  } catch (error) {
    console.error('Erreur createProduct:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du produit',
      error: error.message
    });
  }
};

// Mettre à jour un produit
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    
    // Vérifier si le produit existe
    const existingProduct = Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    // Vérifier si le nouveau SKU existe déjà (si changé)
    if (updates.sku && updates.sku !== existingProduct.sku) {
      const skuExists = Product.findBySku(updates.sku);
      if (skuExists) {
        return res.status(400).json({
          success: false,
          message: 'Un produit avec ce SKU existe déjà'
        });
      }
    }
    
    // Vérifier que la catégorie existe (si changée)
    if (updates.category && updates.category !== existingProduct.category) {
      const category = Category.findBySlug(updates.category);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Catégorie non trouvée'
        });
      }
    }
    
    // Traiter les nouvelles images uploadées
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      updates.images = existingProduct.images ? [...existingProduct.images, ...newImages] : newImages;
    }
    
    const updatedProduct = Product.updateById(productId, updates);
    
    res.json({
      success: true,
      message: 'Produit mis à jour avec succès',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Erreur updateProduct:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du produit',
      error: error.message
    });
  }
};

// Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const deleted = Product.deleteById(productId);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur deleteProduct:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du produit',
      error: error.message
    });
  }
};

// Mettre à jour le stock
const updateProductStock = async (req, res) => {
  try {
    const productId = req.params.id;
    const { stock } = req.body;
    
    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Le stock doit être un nombre positif'
      });
    }
    
    const updatedProduct = Product.updateStock(productId, stock);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Stock mis à jour avec succès',
      data: updatedProduct
    });
  } catch (error) {
    console.error('Erreur updateProductStock:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du stock',
      error: error.message
    });
  }
};

// Activer/Désactiver un produit
const toggleProductStatus = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const updatedProduct = Product.toggleStatus(productId);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: `Produit ${updatedProduct.isActive ? 'activé' : 'désactivé'} avec succès`,
      data: updatedProduct
    });
  } catch (error) {
    console.error('Erreur toggleProductStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de statut',
      error: error.message
    });
  }
};

// Obtenir les statistiques des produits
const getProductStats = async (req, res) => {
  try {
    const stats = Product.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur getProductStats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
};

// Rechercher des produits
const searchProducts = async (req, res) => {
  try {
    const { q: query, limit = 10 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Terme de recherche requis'
      });
    }
    
    const results = Product.search(query, parseInt(limit));
    
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error('Erreur searchProducts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche',
      error: error.message
    });
  }
};

// Obtenir les produits en vedette
const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const products = Product.findFeatured(parseInt(limit));
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Erreur getFeaturedProducts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits en vedette',
      error: error.message
    });
  }
};

// Obtenir les produits en rupture de stock
const getLowStockProducts = async (req, res) => {
  try {
    const { threshold = 5 } = req.query;
    
    const products = Product.findLowStock(parseInt(threshold));
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Erreur getLowStockProducts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits en rupture',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  toggleProductStatus,
  getProductStats,
  searchProducts,
  getFeaturedProducts,
  getLowStockProducts
};