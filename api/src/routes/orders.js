const express = require('express');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Données en mémoire pour les tests
let orders = [
  {
    _id: '1',
    orderNumber: 'ORD-001',
    customer: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone: '0123456789'
    },
    items: [
      {
        productId: '1',
        name: 'Produit Test 1',
        price: 29.99,
        quantity: 2,
        total: 59.98
      }
    ],
    total: 59.98,
    status: 'pending',
    paymentStatus: 'pending',
    shippingAddress: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    orderNumber: 'ORD-002',
    customer: {
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      phone: '0987654321'
    },
    items: [
      {
        productId: '2',
        name: 'Produit Test 2',
        price: 49.99,
        quantity: 1,
        total: 49.99
      }
    ],
    total: 49.99,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '456 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France'
    },
    trackingNumber: 'TRK123456789',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Contrôleurs simplifiés
const orderController = {
  // Récupérer toutes les commandes
  getAllOrders: async (req, res) => {
    try {
      const { page = 1, limit = 10, status, paymentStatus } = req.query;
      
      let filteredOrders = orders;
      
      if (status) {
        filteredOrders = filteredOrders.filter(o => o.status === status);
      }
      
      if (paymentStatus) {
        filteredOrders = filteredOrders.filter(o => o.paymentStatus === paymentStatus);
      }
      
      // Tri par date de création (plus récent en premier)
      filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
      
      res.json({
        success: true,
        data: paginatedOrders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredOrders.length / limit),
          totalOrders: filteredOrders.length,
          hasNextPage: endIndex < filteredOrders.length,
          hasPrevPage: page > 1
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des commandes',
        error: error.message
      });
    }
  },

  // Récupérer une commande par ID
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = orders.find(o => o._id === id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Commande non trouvée'
        });
      }
      
      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de la commande',
        error: error.message
      });
    }
  },

  // Mettre à jour le statut d'une commande
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const orderIndex = orders.findIndex(o => o._id === id);
      
      if (orderIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Commande non trouvée'
        });
      }
      
      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date();
      
      res.json({
        success: true,
        message: 'Statut de la commande mis à jour avec succès',
        data: orders[orderIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du statut',
        error: error.message
      });
    }
  },

  // Mettre à jour le statut de paiement
  updatePaymentStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { paymentStatus } = req.body;
      
      const orderIndex = orders.findIndex(o => o._id === id);
      
      if (orderIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Commande non trouvée'
        });
      }
      
      orders[orderIndex].paymentStatus = paymentStatus;
      orders[orderIndex].updatedAt = new Date();
      
      res.json({
        success: true,
        message: 'Statut de paiement mis à jour avec succès',
        data: orders[orderIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du statut de paiement',
        error: error.message
      });
    }
  },

  // Ajouter un numéro de suivi
  addTracking: async (req, res) => {
    try {
      const { id } = req.params;
      const { trackingNumber } = req.body;
      
      const orderIndex = orders.findIndex(o => o._id === id);
      
      if (orderIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Commande non trouvée'
        });
      }
      
      orders[orderIndex].trackingNumber = trackingNumber;
      orders[orderIndex].updatedAt = new Date();
      
      res.json({
        success: true,
        message: 'Numéro de suivi ajouté avec succès',
        data: orders[orderIndex]
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'ajout du numéro de suivi',
        error: error.message
      });
    }
  },

  // Statistiques des commandes
  getStats: async (req, res) => {
    try {
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(o => o.status === 'pending').length;
      const shippedOrders = orders.filter(o => o.status === 'shipped').length;
      const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
      const paidOrders = orders.filter(o => o.paymentStatus === 'paid').length;
      const totalRevenue = orders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.total, 0);
      
      res.json({
        success: true,
        data: {
          totalOrders,
          pendingOrders,
          shippedOrders,
          deliveredOrders,
          paidOrders,
          totalRevenue
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

  // Commandes récentes
  getRecent: async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      
      const recentOrders = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, parseInt(limit));
      
      res.json({
        success: true,
        data: recentOrders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des commandes récentes',
        error: error.message
      });
    }
  }
};

// Routes sans authentification (pour les tests)
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id/status', orderController.updateStatus);
router.patch('/:id/payment-status', orderController.updatePaymentStatus);
router.patch('/:id/tracking', orderController.addTracking);
router.get('/stats', orderController.getStats);
router.get('/recent', orderController.getRecent);

module.exports = router;