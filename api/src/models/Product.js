const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'La description courte ne peut pas dépasser 200 caractères']
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Le prix original ne peut pas être négatif']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    trim: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    required: [true, 'Au moins une image est requise']
  }],
  mainImage: {
    type: String,
    required: [true, 'L\'image principale est requise']
  },
  stock: {
    type: Number,
    required: [true, 'Le stock est requis'],
    min: [0, 'Le stock ne peut pas être négatif'],
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    required: [true, 'Le SKU est requis'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  salePercentage: {
    type: Number,
    min: [0, 'Le pourcentage de réduction ne peut pas être négatif'],
    max: [100, 'Le pourcentage de réduction ne peut pas dépasser 100%'],
    default: 0
  },
  weight: {
    type: Number,
    min: [0, 'Le poids ne peut pas être négatif']
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 }
  },
  specifications: [{
    name: { type: String, required: true },
    value: { type: String, required: true }
  }],
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 }
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  sales: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
productSchema.index({ name: 'text', description: 'text', category: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ isOnSale: 1, isActive: 1 });

// Méthode pour calculer le prix de vente
productSchema.methods.getSalePrice = function() {
  if (this.isOnSale && this.salePercentage > 0) {
    return this.price - (this.price * this.salePercentage / 100);
  }
  return this.price;
};

// Méthode pour vérifier si le produit est en stock
productSchema.methods.isInStock = function() {
  return this.stock > 0;
};

module.exports = mongoose.model('Product', productSchema);