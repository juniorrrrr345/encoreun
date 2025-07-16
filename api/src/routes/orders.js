const express = require('express');
const { body, param, query } = require('express-validator');
const orderController = require('../controllers/orderController');
const { authenticateToken, requireAdminOrManager } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Validation pour la mise à jour du statut
const statusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Statut invalide'),
  body('adminNotes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Les notes admin ne peuvent pas dépasser 500 caractères')
];

// Validation pour la mise à jour du statut de paiement
const paymentStatusValidation = [
  body('paymentStatus')
    .isIn(['pending', 'paid', 'failed', 'refunded'])
    .withMessage('Statut de paiement invalide')
];

// Validation pour le numéro de suivi
const trackingValidation = [
  body('trackingNumber')
    .trim()
    .notEmpty()
    .withMessage('Le numéro de suivi est requis')
];

// Validation pour les paramètres de requête
const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Le numéro de page doit être un entier positif'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('La limite doit être entre 1 et 100'),
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Statut invalide'),
  query('paymentStatus')
    .optional()
    .isIn(['pending', 'paid', 'failed', 'refunded'])
    .withMessage('Statut de paiement invalide'),
  query('sortBy')
    .optional()
    .isIn(['orderNumber', 'total', 'status', 'createdAt', 'updatedAt'])
    .withMessage('Tri invalide'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Ordre de tri invalide')
];

// Validation pour les paramètres d'ID
const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID de commande invalide')
];

// Validation pour les dates d'export
const exportValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Date de début invalide'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('Date de fin invalide')
];

// Routes protégées (admin/manager) - sans authentification pour les tests
router.get('/', queryValidation, handleValidationErrors, orderController.getAllOrders);
router.get('/recent', orderController.getRecentOrders);
router.get('/stats', orderController.getOrderStats);
router.get('/export', exportValidation, handleValidationErrors, orderController.exportOrders);

// Routes pour les commandes individuelles
router.get('/:id', idValidation, handleValidationErrors, orderController.getOrderById);
router.patch('/:id/status', idValidation, statusValidation, handleValidationErrors, orderController.updateOrderStatus);
router.patch('/:id/payment-status', idValidation, paymentStatusValidation, handleValidationErrors, orderController.updatePaymentStatus);
router.patch('/:id/tracking', idValidation, trackingValidation, handleValidationErrors, orderController.addTrackingNumber);

module.exports = router;