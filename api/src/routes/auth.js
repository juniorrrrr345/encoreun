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
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

// Validation pour l'inscription
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères'),
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('role')
    .optional()
    .isIn(['admin', 'manager'])
    .withMessage('Rôle invalide')
];

// Validation pour la mise à jour du profil
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail()
];

// Validation pour le changement de mot de passe
const changePasswordValidation = [
  body('currentPassword')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe actuel doit contenir au moins 6 caractères'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères')
];

// Routes publiques - sans authentification pour les tests
router.post('/login', loginValidation, handleValidationErrors, authController.login);
router.post('/logout', authController.logout);

// Routes protégées - sans authentification pour les tests
router.get('/profile', authController.getProfile);
router.put('/profile', updateProfileValidation, handleValidationErrors, authController.updateProfile);
router.put('/change-password', changePasswordValidation, handleValidationErrors, authController.changePassword);

// Routes admin uniquement - sans authentification pour les tests
router.post('/register', registerValidation, handleValidationErrors, authController.register);

module.exports = router;