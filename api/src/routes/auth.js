const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Validation pour la connexion
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email valide requis'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Mot de passe requis')
];

// Validation pour l'inscription
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email valide requis'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Prénom requis'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Nom requis'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'manager'])
    .withMessage('Rôle invalide')
];

// Validation pour le changement de mot de passe
const changePasswordValidation = [
  body('currentPassword')
    .isLength({ min: 1 })
    .withMessage('Mot de passe actuel requis'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères')
];

// Routes publiques
router.post('/login', loginValidation, handleValidationErrors, authController.login);

// Routes protégées
router.get('/verify', authenticateToken, authController.verifyToken);
router.post('/logout', authController.logout);
router.post('/change-password', authenticateToken, changePasswordValidation, handleValidationErrors, authController.changePassword);

// Routes admin seulement
router.post('/register', authenticateToken, requireAdmin, registerValidation, handleValidationErrors, authController.register);

// Route de test (développement seulement)
if (process.env.NODE_ENV === 'development') {
  router.get('/test', (req, res) => {
    res.json({
      success: true,
      message: 'API d\'authentification fonctionnelle',
      endpoints: {
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify (auth required)',
        logout: 'POST /api/auth/logout',
        register: 'POST /api/auth/register (admin only)',
        changePassword: 'POST /api/auth/change-password (auth required)'
      },
      defaultAdmin: {
        email: 'admin@cbd-shop.com',
        password: 'admin123'
      }
    });
  });
}

module.exports = router;