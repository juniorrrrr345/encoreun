const { memoryDB } = require('../config/database');

class Product {
  static find(query = {}) {
    return memoryDB.find('products', query);
  }

  static findById(id) {
    return memoryDB.findById('products', id);
  }

  static findBySku(sku) {
    const products = memoryDB.find('products', { sku });
    return products.length > 0 ? products[0] : null;
  }

  static findByCategory(category) {
    return memoryDB.find('products', { category });
  }

  static create(data) {
    // Générer un SKU automatique si pas fourni
    if (!data.sku && data.name) {
      data.sku = data.name
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, '-')
        .substring(0, 10) + '-' + Date.now().toString(36).toUpperCase();
    }
    
    return memoryDB.create('products', data);
  }

  static updateById(id, updates) {
    return memoryDB.updateById('products', id, updates);
  }

  static deleteById(id) {
    return memoryDB.deleteById('products', id);
  }

  static updateStock(id, stock) {
    return this.updateById(id, { stock });
  }

  static toggleStatus(id) {
    const product = this.findById(id);
    if (!product) return null;
    
    return this.updateById(id, { isActive: !product.isActive });
  }

  static toggleFeatured(id) {
    const product = this.findById(id);
    if (!product) return null;
    
    return this.updateById(id, { isFeatured: !product.isFeatured });
  }

  static getStats() {
    const products = memoryDB.find('products');
    const activeProducts = products.filter(prod => prod.isActive);
    const featuredProducts = products.filter(prod => prod.isFeatured);
    const lowStockProducts = products.filter(prod => prod.stock <= 5);
    const outOfStockProducts = products.filter(prod => prod.stock === 0);
    
    const totalValue = products.reduce((sum, prod) => sum + (prod.price * prod.stock), 0);
    
    return {
      total: products.length,
      active: activeProducts.length,
      inactive: products.length - activeProducts.length,
      featured: featuredProducts.length,
      lowStock: lowStockProducts.length,
      outOfStock: outOfStockProducts.length,
      totalValue: totalValue.toFixed(2)
    };
  }

  static search(query, limit = 10) {
    if (!query) return [];
    
    const regex = new RegExp(query, 'i');
    const products = memoryDB.find('products');
    
    return products
      .filter(prod => 
        regex.test(prod.name) || 
        regex.test(prod.description) ||
        regex.test(prod.sku) ||
        (prod.tags && prod.tags.some(tag => regex.test(tag)))
      )
      .slice(0, limit);
  }

  static findByPriceRange(minPrice, maxPrice) {
    const products = memoryDB.find('products');
    return products.filter(prod => {
      const price = prod.salePrice || prod.price;
      return price >= minPrice && price <= maxPrice;
    });
  }

  static findFeatured(limit = 10) {
    const products = memoryDB.find('products', { isFeatured: true, isActive: true });
    return products.slice(0, limit);
  }

  static findLowStock(threshold = 5) {
    const products = memoryDB.find('products');
    return products.filter(prod => prod.stock <= threshold && prod.stock > 0);
  }

  static findOutOfStock() {
    return memoryDB.find('products', { stock: 0 });
  }

  static getTopSelling(limit = 10) {
    // Pour le moment, retourner les produits les plus récents
    const products = memoryDB.find('products', { isActive: true });
    return products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  static bulkUpdateStock(updates) {
    const results = [];
    updates.forEach(({ id, stock }) => {
      const updated = this.updateStock(id, stock);
      if (updated) results.push(updated);
    });
    return results;
  }

  static getByCategory(categorySlug) {
    return memoryDB.find('products', { category: categorySlug, isActive: true });
  }

  static findRelated(productId, limit = 4) {
    const product = this.findById(productId);
    if (!product) return [];
    
    const products = memoryDB.find('products', { 
      category: product.category, 
      isActive: true 
    });
    
    return products
      .filter(prod => prod._id !== productId)
      .slice(0, limit);
  }
}

module.exports = Product;