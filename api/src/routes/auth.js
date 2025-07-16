const express = require('express');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Utilisateur par défaut pour les tests
const defaultUser = {
  id: 1,
  name: 'Administrateur',
  email: 'admin@example.com',
  role: 'admin'
};

// Contrôleurs simplifiés
const authController = {
  // Connexion (simulée)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Simulation d'une vérification d'identifiants
      if (email === 'admin@example.com' && password === 'admin123') {
        const token = 'fake-jwt-token-' + Date.now();
        
        res.json({
          success: true,
          message: 'Connexion réussie',
          token,
          user: defaultUser
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Identifiants invalides'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la connexion',
        error: error.message
      });
    }
  },

  // Déconnexion
  logout: async (req, res) => {
    try {
      res.json({
        success: true,
        message: 'Déconnexion réussie'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la déconnexion',
        error: error.message
      });
    }
  },

  // Récupérer le profil utilisateur
  getProfile: async (req, res) => {
    try {
      res.json({
        success: true,
        data: defaultUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du profil',
        error: error.message
      });
    }
  },

  // Mettre à jour le profil
  updateProfile: async (req, res) => {
    try {
      const updatedUser = {
        ...defaultUser,
        ...req.body,
        id: defaultUser.id // Garder l'ID original
      };
      
      res.json({
        success: true,
        message: 'Profil mis à jour avec succès',
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du profil',
        error: error.message
      });
    }
  },

  // Changer le mot de passe
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      // Simulation de vérification
      if (currentPassword === 'admin123') {
        res.json({
          success: true,
          message: 'Mot de passe changé avec succès'
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Mot de passe actuel incorrect'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors du changement de mot de passe',
        error: error.message
      });
    }
  }
};

// Routes sans authentification (pour les tests)
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authController.getProfile);
router.put('/profile', authController.updateProfile);
router.put('/change-password', authController.changePassword);

module.exports = router;