const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { validateCategory } = require('../middleware/validation');

// GET /api/categories - Récupérer toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .select('name slug description image color productCount')
      .sort({ name: 1 });
    
    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération des catégories' 
    });
  }
});

// GET /api/categories/:id - Récupérer une catégorie par ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Catégorie non trouvée' 
      });
    }
    
    res.json(category);
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
    const category = new Category(req.body);
    await category.save();
    
    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succès',
      data: category
    });
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
  } catch (error) {
    console.error('Erreur lors du changement de statut de la catégorie:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors du changement de statut de la catégorie' 
    });
  }
});

module.exports = router;