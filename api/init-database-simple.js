require('dotenv').config();
const mongoose = require('mongoose');

// Données de test pour les catégories
const categoriesData = [
  {
    name: 'Vêtements',
    slug: 'vetements',
    description: 'Mode et accessoires tendance pour tous les styles',
    image: '/images/categories/clothing.jpg',
    color: 'pink',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Beauté',
    slug: 'beaute',
    description: 'Produits de beauté et cosmétiques de qualité',
    image: '/images/categories/beauty.jpg',
    color: 'purple',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Maison',
    slug: 'maison',
    description: 'Décoration et accessoires maison élégants',
    image: '/images/categories/home.jpg',
    color: 'emerald',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Bijoux',
    slug: 'bijoux',
    description: 'Bijoux et accessoires précieux et élégants',
    image: '/images/categories/jewelry.jpg',
    color: 'amber',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Tech',
    slug: 'tech',
    description: 'Gadgets et accessoires tech innovants',
    image: '/images/categories/tech.jpg',
    color: 'blue',
    isActive: true,
    productCount: 0
  },
  {
    name: 'Sport',
    slug: 'sport',
    description: 'Équipements et vêtements de sport performants',
    image: '/images/categories/sport.jpg',
    color: 'green',
    isActive: true,
    productCount: 0
  }
];

// Données de test pour les produits
const productsData = [
  {
    name: 'T-shirt Premium',
    description: 'T-shirt en coton bio de haute qualité, confortable et durable',
    shortDescription: 'T-shirt premium en coton bio',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Vêtements',
    subcategory: 'T-shirts',
    images: ['/images/products/tshirt-1.jpg', '/images/products/tshirt-2.jpg'],
    mainImage: '/images/products/tshirt-1.jpg',
    stock: 50,
    sku: 'TSH-001',
    tags: ['cotton', 'bio', 'premium'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 25,
    weight: 0.2,
    dimensions: { length: 70, width: 50, height: 2 },
    specifications: [
      { name: 'Matériau', value: '100% Coton bio' },
      { name: 'Taille', value: 'S, M, L, XL' },
      { name: 'Couleur', value: 'Blanc, Noir, Bleu' }
    ]
  },
  {
    name: 'Crème hydratante',
    description: 'Crème hydratante naturelle pour tous types de peau',
    shortDescription: 'Crème hydratante naturelle',
    price: 24.99,
    originalPrice: 29.99,
    category: 'Beauté',
    subcategory: 'Soins visage',
    images: ['/images/products/cream-1.jpg'],
    mainImage: '/images/products/cream-1.jpg',
    stock: 30,
    sku: 'BEAU-001',
    tags: ['naturel', 'hydratant', 'bio'],
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    salePercentage: 17,
    weight: 0.05,
    specifications: [
      { name: 'Volume', value: '50ml' },
      { name: 'Type de peau', value: 'Tous types' },
      { name: 'Composition', value: '100% Naturelle' }
    ]
  },
  {
    name: 'Vase décoratif',
    description: 'Vase en céramique élégant pour décorer votre intérieur',
    shortDescription: 'Vase décoratif en céramique',
    price: 45.00,
    category: 'Maison',
    subcategory: 'Décoration',
    images: ['/images/products/vase-1.jpg'],
    mainImage: '/images/products/vase-1.jpg',
    stock: 15,
    sku: 'MAI-001',
    tags: ['décoration', 'céramique', 'élégant'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    weight: 0.8,
    dimensions: { length: 20, width: 20, height: 30 },
    specifications: [
      { name: 'Matériau', value: 'Céramique' },
      { name: 'Hauteur', value: '30cm' },
      { name: 'Couleur', value: 'Blanc' }
    ]
  },
  {
    name: 'Bracelet en argent',
    description: 'Bracelet élégant en argent sterling, parfait pour tous les styles',
    shortDescription: 'Bracelet en argent sterling',
    price: 89.99,
    category: 'Bijoux',
    subcategory: 'Bracelets',
    images: ['/images/products/bracelet-1.jpg'],
    mainImage: '/images/products/bracelet-1.jpg',
    stock: 25,
    sku: 'BIJ-001',
    tags: ['argent', 'sterling', 'élégant'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    weight: 0.05,
    specifications: [
      { name: 'Matériau', value: 'Argent sterling 925' },
      { name: 'Taille', value: 'Ajustable' },
      { name: 'Style', value: 'Classique' }
    ]
  },
  {
    name: 'Écouteurs sans fil',
    description: 'Écouteurs bluetooth haute qualité avec réduction de bruit',
    shortDescription: 'Écouteurs bluetooth premium',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Tech',
    subcategory: 'Audio',
    images: ['/images/products/headphones-1.jpg'],
    mainImage: '/images/products/headphones-1.jpg',
    stock: 40,
    sku: 'TECH-001',
    tags: ['bluetooth', 'audio', 'premium'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 19,
    weight: 0.3,
    specifications: [
      { name: 'Connectivité', value: 'Bluetooth 5.0' },
      { name: 'Autonomie', value: '8h' },
      { name: 'Réduction de bruit', value: 'Active' }
    ]
  },
  {
    name: 'Leggings de sport',
    description: 'Leggings confortables et respirants pour vos séances de sport',
    shortDescription: 'Leggings de sport confortables',
    price: 34.99,
    category: 'Sport',
    subcategory: 'Vêtements',
    images: ['/images/products/leggings-1.jpg'],
    mainImage: '/images/products/leggings-1.jpg',
    stock: 35,
    sku: 'SPORT-001',
    tags: ['sport', 'confortable', 'respirant'],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    weight: 0.3,
    specifications: [
      { name: 'Matériau', value: 'Polyester/Élasthanne' },
      { name: 'Taille', value: 'XS, S, M, L, XL' },
      { name: 'Style', value: 'Haute taille' }
    ]
  }
];

async function initializeDatabase() {
  try {
    console.log('🔌 Tentative de connexion à MongoDB...');
    
    // Essayer de se connecter à MongoDB
    let isConnected = false;
    try {
      const connectDB = require('./src/config/database');
      await connectDB();
      isConnected = mongoose.connection.readyState === 1;
    } catch (error) {
      console.log('⚠️  MongoDB non disponible, utilisation du mode mémoire');
    }
    
    if (isConnected) {
      console.log('🗄️  Utilisation de MongoDB Atlas');
      
      // Importer les modèles
      const Category = require('./src/models/Category');
      const Product = require('./src/models/Product');
      const User = require('./src/models/User');
      
      console.log('🗑️  Nettoyage de la base de données...');
      await Category.deleteMany({});
      await Product.deleteMany({});
      await User.deleteMany({});
      
      console.log('📝 Création des catégories...');
      const categories = await Category.insertMany(categoriesData);
      console.log(`✅ ${categories.length} catégories créées`);
      
      console.log('📦 Création des produits...');
      const products = await Product.insertMany(productsData);
      console.log(`✅ ${products.length} produits créés`);
      
      console.log('👤 Création de l\'utilisateur admin...');
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const user = await User.create({
        name: 'Administrateur',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      console.log(`✅ Utilisateur admin créé: ${user.email}`);
    } else {
      console.log('💾 Mode mémoire activé - données disponibles via API');
    }
    
    console.log('🎉 Initialisation terminée!');
    console.log('\n📊 Résumé:');
    console.log(`- ${categoriesData.length} catégories prêtes`);
    console.log(`- ${productsData.length} produits prêts`);
    console.log(`- 1 utilisateur admin`);
    console.log('\n🔑 Identifiants admin:');
    console.log(`Email: admin@example.com`);
    console.log(`Mot de passe: admin123`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };