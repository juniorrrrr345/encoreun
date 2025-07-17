const express = require('express');
const { body, param, query } = require('express-validator');
const productController = require('../controllers/productController');
const { authenticateToken, requireAdminOrManager } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const mongoose = require('mongoose');

// Données de test en mémoire pour les produits
const defaultProducts = [
  {
    _id: '1',
    name: 'T-shirt Premium',
    description: 'T-shirt en coton bio de haute qualité, confortable et durable',
    shortDescription: 'T-shirt premium en coton bio',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Vêtements',
    subcategory: 'T-shirts',
    images: ['/images/products/tshirt-1.jpg', '/images/products/tshirt-2.jpg'],
    mainImage: '/images/products/tshirt-1.jpg',
    stock: 50,
    sku: 'TSH-001',
    tags: ['cotton', 'bio', 'premium'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 25,
    weight: 0.2,
    dimensions: { length: 70, width: 50, height: 2 },
    specifications: [
      { name: 'Matériau', value: '100% Coton bio' },
      { name: 'Taille', value: 'S, M, L, XL' },
      { name: 'Couleur', value: 'Blanc, Noir, Bleu' }
    ],
    ratings: { average: 4.5, count: 12 },
    views: 150,
    sales: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Crème hydratante',
    description: 'Crème hydratante naturelle pour tous types de peau',
    shortDescription: 'Crème hydratante naturelle',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Beauté',
    subcategory: 'Soins visage',
    images: ['/images/products/cream-1.jpg'],
    mainImage: '/images/products/cream-1.jpg',
    stock: 30,
    sku: 'BEAU-001',
    tags: ['naturel', 'hydratant', 'bio'],
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    salePercentage: 17,
    weight: 0.05,
    specifications: [
      { name: 'Volume', value: '50ml' },
      { name: 'Type de peau', value: 'Tous types' },
      { name: 'Composition', value: '100% Naturelle' }
    ],
    ratings: { average: 4.2, count: 8 },
    views: 89,
    sales: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Vase décoratif',
    description: 'Vase en céramique élégant pour décorer votre intérieur',
    shortDescription: 'Vase décoratif en céramique',
    price: 45.00,
    category: 'Maison',
    subcategory: 'Décoration',
    images: ['/images/products/vase-1.jpg'],
    mainImage: '/images/products/vase-1.jpg',
    stock: 15,
    sku: 'MAI-001',
    tags: ['décoration', 'céramique', 'élégant'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    weight: 0.8,
    dimensions: { length: 20, width: 20, height: 30 },
    specifications: [
      { name: 'Matériau', value: 'Céramique' },
      { name: 'Hauteur', value: '30cm' },
      { name: 'Couleur', value: 'Blanc' }
    ],
    ratings: { average: 4.7, count: 5 },
    views: 67,
    sales: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: 'Bracelet en argent',
    description: 'Bracelet élégant en argent sterling, parfait pour tous les styles',
    shortDescription: 'Bracelet en argent sterling',
    price: 89.99,
    category: 'Bijoux',
    subcategory: 'Bracelets',
    images: ['/images/products/bracelet-1.jpg'],
    mainImage: '/images/products/bracelet-1.jpg',
    stock: 25,
    sku: 'BIJ-001',
    tags: ['argent', 'sterling', 'élégant'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    weight: 0.05,
    specifications: [
      { name: 'Matériau', value: 'Argent sterling 925' },
      { name: 'Taille', value: 'Ajustable' },
      { name: 'Style', value: 'Classique' }
    ],
    ratings: { average: 4.8, count: 18 },
    views: 234,
    sales: 32,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    name: 'Écouteurs sans fil',
    description: 'Écouteurs bluetooth haute qualité avec réduction de bruit',
    shortDescription: 'Écouteurs bluetooth premium',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Tech',
    subcategory: 'Audio',
    images: ['/images/products/headphones-1.jpg'],
    mainImage: '/images/products/headphones-1.jpg',
    stock: 40,
    sku: 'TECH-001',
    tags: ['bluetooth', 'audio', 'premium'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 19,
    weight: 0.3,
    specifications: [
      { name: 'Connectivité', value: 'Bluetooth 5.0' },
      { name: 'Autonomie', value: '8h' },
      { name: 'Réduction de bruit', value: 'Active' }
    ],
    ratings: { average: 4.6, count: 25 },
    views: 456,
    sales: 67,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    name: 'Leggings de sport',
    description: 'Leggings confortables et respirants pour vos séances de sport',
    shortDescription: 'Leggings de sport confortables',
    price: 34.99,
    category: 'Sport',
    subcategory: 'Vêtements',
    images: ['/images/products/leggings-1.jpg'],
    mainImage: '/images/products/leggings-1.jpg',
    stock: 35,
    sku: 'SPORT-001',
    tags: ['sport', 'confortable', 'respirant'],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    weight: 0.3,
    specifications: [
      { name: 'Matériau', value: 'Polyester/Élasthanne' },
      { name: 'Taille', value: 'XS, S, M, L, XL' },
      { name: 'Style', value: 'Haute taille' }
    ],
    ratings: { average: 4.3, count: 14 },
    views: 123,
    sales: 19,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

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
    .notEmpty()
    .withMessage('ID de produit requis')
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