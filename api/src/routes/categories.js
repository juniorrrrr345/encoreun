const express = require('express');
const { body, param, query } = require('express-validator');
const categoryController = require('../controllers/categoryController');
const { authenticateToken, requireAdminOrManager } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Validation pour la création/mise à jour de catégorie
const categoryValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Le nom de la catégorie doit contenir entre 1 et 50 caractères'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La description ne peut pas dépasser 500 caractères'),
  body('parent')
    .optional()
    .isMongoId()
    .withMessage('ID de catégorie parent invalide'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive doit être un booléen'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured doit être un booléen'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('L\'ordre de tri doit être un nombre entier positif'),
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage('Le titre meta ne peut pas dépasser 60 caractères'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('La description meta ne peut pas dépasser 160 caractères')
];

// Validation pour les paramètres de requête
const queryValidation = [
  query('isActive')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('isActive doit être true ou false'),
  query('isFeatured')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('isFeatured doit être true ou false')
];

// Validation pour les paramètres d'ID
const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID de catégorie invalide')
];

// Routes publiques
router.get('/tree', categoryController.getCategoryTree);
router.get('/:id', idValidation, handleValidationErrors, categoryController.getCategoryById);

// Routes protégées (admin/manager)
router.get('/', queryValidation, handleValidationErrors, categoryController.getAllCategories);
router.post('/', uploadSingle, handleUploadError, categoryValidation, handleValidationErrors, categoryController.createCategory);
router.put('/:id', uploadSingle, handleUploadError, idValidation, categoryValidation, handleValidationErrors, categoryController.updateCategory);
router.delete('/:id', idValidation, handleValidationErrors, categoryController.deleteCategory);

// Routes pour la gestion du statut
router.patch('/:id/toggle-status', idValidation, handleValidationErrors, categoryController.toggleCategoryStatus);

// Routes pour les statistiques
router.get('/stats/overview', categoryController.getCategoryStats);

module.exports = router;