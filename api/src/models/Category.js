const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la catégorie est requis'],
    trim: true,
    unique: true,
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  slug: {
    type: String,
    required: [true, 'Le slug est requis'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  image: {
    type: String,
    default: null
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  metaTitle: {
    type: String,
    maxlength: [60, 'Le titre meta ne peut pas dépasser 60 caractères']
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'La description meta ne peut pas dépasser 160 caractères']
  },
  productCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1, isActive: 1 });
categorySchema.index({ isFeatured: 1, isActive: 1 });
categorySchema.index({ sortOrder: 1 });

// Middleware pour générer automatiquement le slug
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Méthode pour obtenir le chemin complet de la catégorie
categorySchema.methods.getFullPath = async function() {
  const path = [this.name];
  let current = this;
  
  while (current.parent) {
    current = await this.constructor.findById(current.parent);
    if (current) {
      path.unshift(current.name);
    }
  }
  
  return path.join(' > ');
};

// Méthode pour obtenir toutes les sous-catégories
categorySchema.methods.getAllChildren = async function() {
  const children = [];
  
  const getChildren = async (categoryId) => {
    const directChildren = await this.constructor.find({ parent: categoryId });
    for (const child of directChildren) {
      children.push(child);
      await getChildren(child._id);
    }
  };
  
  await getChildren(this._id);
  return children;
};

// Méthode statique pour obtenir l'arbre des catégories
categorySchema.statics.getCategoryTree = async function() {
  const categories = await this.find({ isActive: true }).sort({ sortOrder: 1 });
  const categoryMap = new Map();
  const roots = [];
  
  // Créer une map de toutes les catégories
  categories.forEach(category => {
    categoryMap.set(category._id.toString(), { ...category.toObject(), children: [] });
  });
  
  // Construire l'arbre
  categories.forEach(category => {
    const categoryObj = categoryMap.get(category._id.toString());
    if (category.parent) {
      const parent = categoryMap.get(category.parent.toString());
      if (parent) {
        parent.children.push(categoryObj);
      }
    } else {
      roots.push(categoryObj);
    }
  });
  
  return roots;
};

module.exports = mongoose.model('Category', categorySchema);