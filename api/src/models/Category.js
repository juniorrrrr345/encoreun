const { memoryDB } = require('../config/database');

class Category {
  static find(query = {}) {
    return memoryDB.find('categories', query);
  }

  static findById(id) {
    return memoryDB.findById('categories', id);
  }

  static findBySlug(slug) {
    const categories = memoryDB.find('categories', { slug });
    return categories.length > 0 ? categories[0] : null;
  }

  static create(data) {
    // Générer le slug automatiquement si pas fourni
    if (!data.slug && data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    return memoryDB.create('categories', data);
  }

  static updateById(id, updates) {
    // Mettre à jour le slug si le nom change
    if (updates.name && !updates.slug) {
      updates.slug = updates.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    return memoryDB.updateById('categories', id, updates);
  }

  static deleteById(id) {
    return memoryDB.deleteById('categories', id);
  }

  static getStats() {
    const categories = memoryDB.find('categories');
    const activeCategories = categories.filter(cat => cat.isActive);
    
    return {
      total: categories.length,
      active: activeCategories.length,
      inactive: categories.length - activeCategories.length
    };
  }

  static search(query, limit = 10) {
    if (!query) return [];
    
    const regex = new RegExp(query, 'i');
    const categories = memoryDB.find('categories');
    
    return categories
      .filter(cat => 
        regex.test(cat.name) || 
        regex.test(cat.description) ||
        regex.test(cat.slug)
      )
      .slice(0, limit);
  }

  static getTree() {
    const categories = memoryDB.find('categories');
    const parentCategories = categories.filter(cat => !cat.parentCategory);
    
    return parentCategories.map(parent => ({
      ...parent,
      children: categories.filter(cat => cat.parentCategory === parent._id)
    }));
  }

  static toggleStatus(id) {
    const category = this.findById(id);
    if (!category) return null;
    
    return this.updateById(id, { isActive: !category.isActive });
  }
}

module.exports = Category;