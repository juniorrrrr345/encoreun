const Category = require('../models/Category');

// Obtenir toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    const { isActive, isFeatured, page = 1, limit = 20 } = req.query;
    
    let query = {};
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';
    
    const categories = Category.find(query);
    
    // Pagination simple
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedCategories = categories.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedCategories,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(categories.length / limit),
        totalItems: categories.length,
        hasNext: endIndex < categories.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Erreur getAllCategories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories',
      error: error.message
    });
  }
};

// Obtenir une catégorie par ID
const getCategoryById = async (req, res) => {
  try {
    const category = Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Erreur getCategoryById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la catégorie',
      error: error.message
    });
  }
};

// Créer une nouvelle catégorie
const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    
    // Vérifier si une catégorie avec le même nom existe déjà
    const existingCategory = Category.find({ name: categoryData.name });
    if (existingCategory.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Une catégorie avec ce nom existe déjà'
      });
    }
    
    // Ajouter l'image si uploadée
    if (req.file) {
      categoryData.image = `/uploads/${req.file.filename}`;
    }
    
    const newCategory = Category.create(categoryData);
    
    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succès',
      data: newCategory
    });
  } catch (error) {
    console.error('Erreur createCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la catégorie',
      error: error.message
    });
  }
};

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updates = req.body;
    
    // Vérifier si la catégorie existe
    const existingCategory = Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    // Vérifier si le nouveau nom existe déjà (si changé)
    if (updates.name && updates.name !== existingCategory.name) {
      const nameExists = Category.find({ name: updates.name });
      if (nameExists.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Une catégorie avec ce nom existe déjà'
        });
      }
    }
    
    // Ajouter l'image si uploadée
    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }
    
    const updatedCategory = Category.updateById(categoryId, updates);
    
    res.json({
      success: true,
      message: 'Catégorie mise à jour avec succès',
      data: updatedCategory
    });
  } catch (error) {
    console.error('Erreur updateCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la catégorie',
      error: error.message
    });
  }
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    // Vérifier si la catégorie existe
    const category = Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    // Vérifier s'il y a des produits dans cette catégorie
    const Product = require('../models/Product');
    const productsInCategory = Product.findByCategory(category.slug);
    
    if (productsInCategory.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de supprimer une catégorie contenant des produits'
      });
    }
    
    Category.deleteById(categoryId);
    
    res.json({
      success: true,
      message: 'Catégorie supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur deleteCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la catégorie',
      error: error.message
    });
  }
};

// Activer/Désactiver une catégorie
const toggleCategoryStatus = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    const updatedCategory = Category.toggleStatus(categoryId);
    
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: `Catégorie ${updatedCategory.isActive ? 'activée' : 'désactivée'} avec succès`,
      data: updatedCategory
    });
  } catch (error) {
    console.error('Erreur toggleCategoryStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de statut',
      error: error.message
    });
  }
};

// Obtenir l'arbre des catégories
const getCategoryTree = async (req, res) => {
  try {
    const tree = Category.getTree();
    
    res.json({
      success: true,
      data: tree
    });
  } catch (error) {
    console.error('Erreur getCategoryTree:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'arbre des catégories',
      error: error.message
    });
  }
};

// Obtenir les statistiques des catégories
const getCategoryStats = async (req, res) => {
  try {
    const stats = Category.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur getCategoryStats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
  getCategoryTree,
  getCategoryStats
};