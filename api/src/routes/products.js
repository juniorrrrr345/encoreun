const express = require('express');
const { body, param, query } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Données en mémoire pour les tests
let products = [
  {
    _id: '1',
    name: 'Produit Test 1',
    description: 'Description du produit test 1',
    price: 29.99,
    category: 'Électronique',
    stock: 50,
    sku: 'TEST001',
    images: ['/uploads/product1.jpg'],
    mainImage: '/uploads/product1.jpg',
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    salePercentage: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Produit Test 2',
    description: 'Description du produit test 2',
    price: 49.99,
    category: 'Vêtements',
    stock: 25,
    sku: 'TEST002',
    images: ['/uploads/product2.jpg'],
    mainImage: '/uploads/product2.jpg',
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Contrôleurs simplifiés
const productController = {
  // Récupérer tous les produits
  getAllProducts: async (req, res) => {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      
      // Tri des produits
      const sortedProducts = products.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
      
      res.json({
        success: true,
        data: paginatedProducts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(products.length / limit),
          totalProducts: products.length,
          hasNextPage: endIndex < products.length,
          hasPrevPage: page > 1
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des produits',
        error: error.message
      });
    }
  },

  // Récupérer un produit par ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = products.find(p => p._id === id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du produit',
        error: error.message
      });
    }
  },

  // Créer un nouveau produit
  createProduct: async (req, res) => {
    try {
      const newProduct = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      products.push(newProduct);
      
      res.status(201).json({
        success: true,
        message: 'Produit créé avec succès',
        data: newProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la création du produit',
        error: error.message
      });
    }
  },

  // Mettre à jour un produit
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productIndex = products.findIndex(p => p._id === id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      products[productIndex] = {
        ...products[productIndex],
        ...req.body,
        updatedAt: new Date()
      };
      
      res.json({
        success: true,
        message: 'Produit mis à jour avec succès',
        data: products[productIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du produit',
        error: error.message
      });
    }
  },

  // Supprimer un produit
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productIndex = products.findIndex(p => p._id === id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      const deletedProduct = products.splice(productIndex, 1)[0];
      
      res.json({
        success: true,
        message: 'Produit supprimé avec succès',
        data: deletedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du produit',
        error: error.message
      });
    }
  },

  // Mettre à jour le stock
  updateStock: async (req, res) => {
    try {
      const { id } = req.params;
      const { stock } = req.body;
      
      const productIndex = products.findIndex(p => p._id === id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      products[productIndex].stock = stock;
      products[productIndex].updatedAt = new Date();
      
      res.json({
        success: true,
        message: 'Stock mis à jour avec succès',
        data: products[productIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du stock',
        error: error.message
      });
    }
  },

  // Basculer le statut du produit
  toggleProductStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const productIndex = products.findIndex(p => p._id === id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      products[productIndex].isActive = !products[productIndex].isActive;
      products[productIndex].updatedAt = new Date();
      
      res.json({
        success: true,
        message: 'Statut du produit mis à jour avec succès',
        data: products[productIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du statut',
        error: error.message
      });
    }
  },

  // Statistiques des produits
  getProductStats: async (req, res) => {
    try {
      const totalProducts = products.length;
      const activeProducts = products.filter(p => p.isActive).length;
      const featuredProducts = products.filter(p => p.isFeatured).length;
      const onSaleProducts = products.filter(p => p.isOnSale).length;
      const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
      const lowStockProducts = products.filter(p => p.stock < 10).length;
      
      res.json({
        success: true,
        data: {
          totalProducts,
          activeProducts,
          featuredProducts,
          onSaleProducts,
          totalStock,
          lowStockProducts
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques',
        error: error.message
      });
    }
  },

  // Recherche de produits
  searchProducts: async (req, res) => {
    try {
      const { q, category, minPrice, maxPrice } = req.query;
      
      let filteredProducts = products.filter(p => p.isActive);
      
      if (q) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.description.toLowerCase().includes(q.toLowerCase())
        );
      }
      
      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }
      
      if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
      }
      
      if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
      }
      
      res.json({
        success: true,
        data: filteredProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la recherche',
        error: error.message
      });
    }
  }
};

// Routes sans authentification (pour les tests)
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/stock', productController.updateStock);
router.patch('/:id/toggle-status', productController.toggleProductStatus);
router.get('/stats/overview', productController.getProductStats);

module.exports = router;