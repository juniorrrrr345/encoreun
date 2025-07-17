const { memoryDB } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static find(query = {}) {
    return memoryDB.find('users', query);
  }

  static findById(id) {
    return memoryDB.findById('users', id);
  }

  static findByEmail(email) {
    const users = memoryDB.find('users', { email });
    return users.length > 0 ? users[0] : null;
  }

  static async create(data) {
    // Hasher le mot de passe si fourni
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    // Définir un rôle par défaut
    if (!data.role) {
      data.role = 'user';
    }
    
    // Définir comme actif par défaut
    if (data.isActive === undefined) {
      data.isActive = true;
    }
    
    return memoryDB.create('users', data);
  }

  static updateById(id, updates) {
    // Hasher le nouveau mot de passe si fourni
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }
    
    return memoryDB.updateById('users', id, updates);
  }

  static deleteById(id) {
    return memoryDB.deleteById('users', id);
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static toggleStatus(id) {
    const user = this.findById(id);
    if (!user) return null;
    
    return this.updateById(id, { isActive: !user.isActive });
  }

  static getStats() {
    const users = memoryDB.find('users');
    const activeUsers = users.filter(user => user.isActive);
    const adminUsers = users.filter(user => user.role === 'admin');
    const managerUsers = users.filter(user => user.role === 'manager');
    
    return {
      total: users.length,
      active: activeUsers.length,
      inactive: users.length - activeUsers.length,
      admins: adminUsers.length,
      managers: managerUsers.length,
      regularUsers: users.filter(user => user.role === 'user').length
    };
  }

  static search(query, limit = 10) {
    if (!query) return [];
    
    const regex = new RegExp(query, 'i');
    const users = memoryDB.find('users');
    
    return users
      .filter(user => 
        regex.test(user.email) || 
        regex.test(user.firstName) ||
        regex.test(user.lastName)
      )
      .slice(0, limit)
      .map(user => {
        // Exclure le mot de passe des résultats de recherche
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
  }

  static findByRole(role) {
    return memoryDB.find('users', { role });
  }

  static findActive() {
    return memoryDB.find('users', { isActive: true });
  }

  // Méthode pour créer un utilisateur admin par défaut
  static async createDefaultAdmin() {
    const existingAdmin = this.findByEmail('admin@cbd-shop.com');
    if (!existingAdmin) {
      return await this.create({
        email: 'admin@cbd-shop.com',
        password: 'admin123', // Sera hashé automatiquement
        firstName: 'Admin',
        lastName: 'CBD Shop',
        role: 'admin',
        isActive: true
      });
    }
    return existingAdmin;
  }
}

module.exports = User;