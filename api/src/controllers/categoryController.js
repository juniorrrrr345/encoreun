const Category = require('../models/Category');
const { getFileUrl } = require('../middleware/upload');

// Obtenir toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    const { isActive, isFeatured } = req.query;
    
    const filters = {};
    if (isActive !== undefined) {
      filters.isActive = isActive === 'true';
    }
    if (isFeatured !== undefined) {
      filters.isFeatured = isFeatured === 'true';
    }

    const categories = await Category.find(filters)
      .populate('parent', 'name')
      .sort({ sortOrder: 1, name: 1 });

    res.status(200).json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Erreur de récupération des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Obtenir une catégorie par ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name')
      .populate('children', 'name');
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      data: { category }
    });
  } catch (error) {
    console.error('Erreur de récupération de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Créer une nouvelle catégorie
const createCategory = async (req, res) => {
  try {
    const categoryData = { ...req.body };
    
    // Gérer l'image uploadée
    if (req.file) {
      categoryData.image = getFileUrl(req.file.filename);
    }

    // Générer le slug automatiquement si non fourni
    if (!categoryData.slug && categoryData.name) {
      categoryData.slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    const category = new Category(categoryData);
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succès',
      data: { category }
    });
  } catch (error) {
    console.error('Erreur de création de la catégorie:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Une catégorie avec ce nom ou ce slug existe déjà'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Gérer l'image uploadée
    if (req.file) {
      updateData.image = getFileUrl(req.file.filename);
    }

    // Générer le slug automatiquement si le nom a changé
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Catégorie mise à jour avec succès',
      data: { category }
    });
  } catch (error) {
    console.error('Erreur de mise à jour de la catégorie:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Une catégorie avec ce nom ou ce slug existe déjà'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }

    // Vérifier s'il y a des sous-catégories
    const hasChildren = await Category.exists({ parent: req.params.id });
    if (hasChildren) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de supprimer une catégorie qui a des sous-catégories'
      });
    }

    // Vérifier s'il y a des produits dans cette catégorie
    const Product = require('../models/Product');
    const hasProducts = await Product.exists({ category: category.name });
    if (hasProducts) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de supprimer une catégorie qui contient des produits'
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Catégorie supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur de suppression de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Obtenir l'arbre des catégories
const getCategoryTree = async (req, res) => {
  try {
    const tree = await Category.getCategoryTree();
    
    res.status(200).json({
      success: true,
      data: { categories: tree }
    });
  } catch (error) {
    console.error('Erreur de récupération de l\'arbre des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Activer/Désactiver une catégorie
const toggleCategoryStatus = async (req, res) => {
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

    res.status(200).json({
      success: true,
      message: `Catégorie ${category.isActive ? 'activée' : 'désactivée'} avec succès`,
      data: { category }
    });
  } catch (error) {
    console.error('Erreur de changement de statut de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Obtenir les statistiques des catégories
const getCategoryStats = async (req, res) => {
  try {
    const [
      totalCategories,
      activeCategories,
      featuredCategories,
      categoriesWithProducts
    ] = await Promise.all([
      Category.countDocuments(),
      Category.countDocuments({ isActive: true }),
      Category.countDocuments({ isFeatured: true, isActive: true }),
      Category.countDocuments({ productCount: { $gt: 0 } })
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCategories,
        activeCategories,
        featuredCategories,
        categoriesWithProducts
      }
    });
  } catch (error) {
    console.error('Erreur de récupération des statistiques des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
  toggleCategoryStatus,
  getCategoryStats
};