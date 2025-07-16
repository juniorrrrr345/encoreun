// Script d'initialisation MongoDB pour Docker
db = db.getSiblingDB('boutique_admin');

// Créer un utilisateur pour la base de données
db.createUser({
  user: 'boutique_user',
  pwd: 'boutique_password',
  roles: [
    {
      role: 'readWrite',
      db: 'boutique_admin'
    }
  ]
});

// Créer les collections avec des index
db.createCollection('users');
db.createCollection('products');
db.createCollection('orders');
db.createCollection('categories');

// Créer des index pour améliorer les performances
db.products.createIndex({ "name": "text", "description": "text" });
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "isActive": 1 });
db.products.createIndex({ "sku": 1 }, { unique: true });

db.orders.createIndex({ "orderNumber": 1 }, { unique: true });
db.orders.createIndex({ "status": 1 });
db.orders.createIndex({ "createdAt": -1 });

db.users.createIndex({ "email": 1 }, { unique: true });

db.categories.createIndex({ "slug": 1 }, { unique: true });

print('✅ Base de données boutique_admin initialisée avec succès !');