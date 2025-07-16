const { validationResult } = require('express-validator');

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// Middleware pour gérer les erreurs globales
const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err);

  // Erreurs de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message,
      value: error.value
    }));

    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors
    });
  }

  // Erreurs de duplication (clé unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} existe déjà`,
      field
    });
  }

  // Erreurs de cast ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID invalide'
    });
  }

  // Erreur par défaut
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
};

// Middleware pour gérer les routes non trouvées
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
};

module.exports = {
  handleValidationErrors,
  errorHandler,
  notFound
};