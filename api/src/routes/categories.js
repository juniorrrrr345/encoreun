const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { validateCategory } = require('../middleware/validation');
const mongoose = require('mongoose'); // Added missing import

// Données de test en mémoire
const defaultCategories = [
  {
    name: 'Vêtements',
    slug: 'vetements',
    description: 'Mode et accessoires tendance pour tous les styles',
    image: '/images/categories/clothing.jpg',
    color: 'pink',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Beauté',
    slug: 'beaute',
    description: 'Produits de beauté et cosmétiques de qualité',
    image: '/images/categories/beauty.jpg',
    color: 'purple',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Maison',
    slug: 'maison',
    description: 'Décoration et accessoires maison élégants',
    image: '/images/categories/home.jpg',
    color: 'emerald',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Bijoux',
    slug: 'bijoux',
    description: 'Bijoux et accessoires précieux et élégants',
    image: '/images/categories/jewelry.jpg',
    color: 'amber',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Tech',
    slug: 'tech',
    description: 'Gadgets et accessoires tech innovants',
    image: '/images/categories/tech.jpg',
    color: 'blue',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Sport',
    slug: 'sport',
    description: 'Équipements et vêtements de sport performants',
    image: '/images/categories/sport.jpg',
    color: 'green',
    isActive: true,
    productCount: 0
  }
];

// GET /api/categories - Récupérer toutes les catégories
router.get('/', async (req, res) => {
  try {
    // Essayer d'utiliser MongoDB
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find({ isActive: true })
        .select('name slug description image color productCount')
        .sort({ name: 1 });
      
      return res.json(categories);
    } else {
      // Utiliser les données en mémoire
      console.log('📝 Utilisation des catégories par défaut (mode mémoire)');
      return res.json(defaultCategories);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    // En cas d'erreur, retourner les données par défaut
    return res.json(defaultCategories);
  }
});

// GET /api/categories/:id - Récupérer une catégorie par ID
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const category = await Category.findById(req.params.id);
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: 'Catégorie non trouvée' 
        });
      }
      
      return res.json(category);
    } else {
      // Chercher dans les données par défaut
      const category = defaultCategories.find(c => c.slug === req.params.id);
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: 'Catégorie non trouvée' 
        });
      }
      
      return res.json(category);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération de la catégorie' 
    });
  }
});

// POST /api/categories - Créer une nouvelle catégorie
router.post('/', validateCategory, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const category = new Category(req.body);
      await category.save();
      
      res.status(201).json({
        success: true,
        message: 'Catégorie créée avec succès',
        data: category
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la création de la catégorie' 
    });
  }
});

// PUT /api/categories/:id - Mettre à jour une catégorie
router.put('/:id', validateCategory, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: 'Catégorie non trouvée' 
        });
      }
      
      res.json({
        success: true,
        message: 'Catégorie mise à jour avec succès',
        data: category
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la mise à jour de la catégorie' 
    });
  }
});

// DELETE /api/categories/:id - Supprimer une catégorie
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const category = await Category.findByIdAndDelete(req.params.id);
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: 'Catégorie non trouvée' 
        });
      }
      
      res.json({
        success: true,
        message: 'Catégorie supprimée avec succès'
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression de la catégorie' 
    });
  }
});

// PATCH /api/categories/:id/toggle - Activer/désactiver une catégorie
router.patch('/:id/toggle', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const category = await Category.findById(req.params.id);
      
      if (!category) {
        return res.status(404).json({ 
          success: false, 
          message: 'Catégorie non trouvée' 
        });
      }
      
      category.isActive = !category.isActive;
      await category.save();
      
      res.json({
        success: true,
        message: `Catégorie ${category.isActive ? 'activée' : 'désactivée'} avec succès`,
        data: category
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Base de données non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur lors du changement de statut de la catégorie:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors du changement de statut de la catégorie' 
    });
  }
});

module.exports = router;