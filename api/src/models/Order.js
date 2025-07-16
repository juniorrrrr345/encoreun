const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: [true, 'Le nom du client est requis']
    },
    email: {
      type: String,
      required: [true, 'L\'email du client est requis'],
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Le téléphone du client est requis']
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    }
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    total: { type: Number, required: true }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  shipping: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: [true, 'La méthode de paiement est requise']
  },
  shippingMethod: {
    type: String,
    required: [true, 'La méthode de livraison est requise']
  },
  trackingNumber: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    maxlength: [500, 'Les notes ne peuvent pas dépasser 500 caractères']
  },
  adminNotes: {
    type: String,
    maxlength: [500, 'Les notes admin ne peuvent pas dépasser 500 caractères']
  },
  estimatedDelivery: {
    type: Date
  },
  shippedAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'customer.email': 1 });
orderSchema.index({ createdAt: -1 });

// Middleware pour générer automatiquement le numéro de commande
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Compter les commandes du jour
    const todayOrders = await this.constructor.countDocuments({
      createdAt: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      }
    });
    
    this.orderNumber = `CMD-${year}${month}${day}-${String(todayOrders + 1).padStart(3, '0')}`;
  }
  next();
});

// Méthode pour calculer le total
orderSchema.methods.calculateTotal = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
  this.total = this.subtotal + this.shipping + this.tax;
  return this.total;
};

// Méthode pour mettre à jour le statut
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  
  if (newStatus === 'shipped' && !this.shippedAt) {
    this.shippedAt = new Date();
  }
  
  if (newStatus === 'delivered' && !this.deliveredAt) {
    this.deliveredAt = new Date();
  }
  
  return this.save();
};

module.exports = mongoose.model('Order', orderSchema);