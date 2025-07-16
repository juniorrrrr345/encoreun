const express = require('express');
const { body, param, query } = require('express-validator');
const productController = require('../controllers/productController');
const { authenticateToken, requireAdminOrManager } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Validation pour la création/mise à jour de produit
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Le nom du produit doit contenir entre 1 et 100 caractères'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('La description doit contenir entre 1 et 1000 caractères'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Le prix doit être un nombre positif'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('La catégorie est requise'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Le stock doit être un nombre entier positif'),
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('Le SKU est requis'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('Au moins une image est requise'),
  body('mainImage')
    .trim()
    .notEmpty()
    .withMessage('L\'image principale est requise'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive doit être un booléen'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured doit être un booléen'),
  body('isOnSale')
    .optional()
    .isBoolean()
    .withMessage('isOnSale doit être un booléen'),
  body('salePercentage')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Le pourcentage de réduction doit être entre 0 et 100')
];

// Validation pour la mise à jour du stock
const stockValidation = [
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Le stock doit être un nombre entier positif')
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
  query('sortBy')
    .optional()
    .isIn(['name', 'price', 'createdAt', 'updatedAt', 'stock'])
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
    .withMessage('ID de produit invalide')
];

// Routes publiques (pour l'interface client)
router.get('/search', productController.searchProducts);
router.get('/:id', idValidation, handleValidationErrors, productController.getProductById);

// Routes protégées (admin/manager) - sans authentification pour les tests
router.get('/', queryValidation, handleValidationErrors, productController.getAllProducts);
router.post('/', productValidation, handleValidationErrors, productController.createProduct);
router.put('/:id', idValidation, productValidation, handleValidationErrors, productController.updateProduct);
router.delete('/:id', idValidation, handleValidationErrors, productController.deleteProduct);

// Routes pour la gestion du stock
router.patch('/:id/stock', idValidation, stockValidation, handleValidationErrors, productController.updateStock);

// Routes pour la gestion du statut
router.patch('/:id/toggle-status', idValidation, handleValidationErrors, productController.toggleProductStatus);

// Routes pour les statistiques
router.get('/stats/overview', productController.getProductStats);

module.exports = router;