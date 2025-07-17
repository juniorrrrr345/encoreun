const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
require('dotenv').config();

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop');
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

// Données de test pour les catégories
const categoriesData = [
  {
    name: 'Vêtements',
    description: 'Collection de vêtements pour tous les styles',
    slug: 'vetements',
    isActive: true,
    isFeatured: true,
    sortOrder: 1
  },
  {
    name: 'Chaussures',
    description: 'Chaussures confortables et élégantes',
    slug: 'chaussures',
    isActive: true,
    isFeatured: true,
    sortOrder: 2
  },
  {
    name: 'Accessoires',
    description: 'Accessoires pour compléter votre look',
    slug: 'accessoires',
    isActive: true,
    isFeatured: false,
    sortOrder: 3
  },
  {
    name: 'Électronique',
    description: 'Produits électroniques et gadgets',
    slug: 'electronique',
    isActive: true,
    isFeatured: false,
    sortOrder: 4
  },
  {
    name: 'Maison & Jardin',
    description: 'Articles pour la maison et le jardin',
    slug: 'maison-jardin',
    isActive: true,
    isFeatured: false,
    sortOrder: 5
  }
];

// Données de test pour les produits
const productsData = [
  {
    name: 'T-shirt Premium',
    description: 'T-shirt en coton bio de haute qualité, confortable et durable. Parfait pour un usage quotidien.',
    shortDescription: 'T-shirt premium en coton bio',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Vêtements',
    subcategory: 'T-shirts',
    stock: 45,
    sku: 'TSH-001',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    tags: ['t-shirt', 'cotton', 'premium'],
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
    ],
    priceVariants: [
      { name: 'S', price: 29.99, originalPrice: 39.99, isActive: true },
      { name: 'M', price: 29.99, originalPrice: 39.99, isActive: true },
      { name: 'L', price: 29.99, originalPrice: 39.99, isActive: true },
      { name: 'XL', price: 32.99, originalPrice: 42.99, isActive: true }
    ]
  },
  {
    name: 'Sneakers Sport',
    description: 'Sneakers confortables pour le sport et le quotidien. Design moderne avec une excellente respirabilité.',
    shortDescription: 'Sneakers sport confortables',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Chaussures',
    subcategory: 'Sneakers',
    stock: 12,
    sku: 'SNK-001',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    tags: ['sneakers', 'sport', 'confortable'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 25,
    weight: 0.8,
    dimensions: { length: 30, width: 12, height: 10 },
    specifications: [
      { name: 'Matériau', value: 'Mesh respirant' },
      { name: 'Semelle', value: 'Caoutchouc antidérapant' },
      { name: 'Pointure', value: '36-45' }
    ],
    priceVariants: [
      { name: '36', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '37', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '38', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '39', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '40', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '41', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '42', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '43', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '44', price: 89.99, originalPrice: 119.99, isActive: true },
      { name: '45', price: 89.99, originalPrice: 119.99, isActive: true }
    ]
  },
  {
    name: 'Sac à dos Vintage',
    description: 'Sac à dos style vintage avec un design rétro et moderne. Parfait pour le quotidien et les voyages.',
    shortDescription: 'Sac à dos style vintage',
    price: 49.99,
    originalPrice: 69.99,
    category: 'Accessoires',
    subcategory: 'Sacs',
    stock: 0,
    sku: 'SAC-001',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    tags: ['sac', 'vintage', 'cuir'],
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    salePercentage: 28,
    weight: 1.2,
    dimensions: { length: 45, width: 30, height: 15 },
    specifications: [
      { name: 'Matériau', value: 'Cuir véritable' },
      { name: 'Capacité', value: '20L' },
      { name: 'Couleur', value: 'Marron, Noir' }
    ],
    priceVariants: [
      { name: 'Marron', price: 49.99, originalPrice: 69.99, isActive: true },
      { name: 'Noir', price: 49.99, originalPrice: 69.99, isActive: true }
    ]
  },
  {
    name: 'Montre Élégante',
    description: 'Montre élégante avec un design minimaliste et moderne. Parfaite pour toutes les occasions.',
    shortDescription: 'Montre élégante minimaliste',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Accessoires',
    subcategory: 'Montres',
    stock: 8,
    sku: 'MNT-001',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500',
    tags: ['montre', 'élégante', 'minimaliste'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 20,
    weight: 0.1,
    dimensions: { length: 4, width: 4, height: 1 },
    specifications: [
      { name: 'Mouvement', value: 'Quartz japonais' },
      { name: 'Étanchéité', value: '5 ATM' },
      { name: 'Bracelet', value: 'Cuir véritable' }
    ],
    priceVariants: [
      { name: 'Argent', price: 199.99, originalPrice: 249.99, isActive: true },
      { name: 'Or', price: 219.99, originalPrice: 269.99, isActive: true },
      { name: 'Noir', price: 199.99, originalPrice: 249.99, isActive: true }
    ]
  },
  {
    name: 'Smartphone Premium',
    description: 'Smartphone dernière génération avec des fonctionnalités avancées et un design premium.',
    shortDescription: 'Smartphone premium dernière génération',
    price: 799.99,
    originalPrice: 899.99,
    category: 'Électronique',
    subcategory: 'Smartphones',
    stock: 15,
    sku: 'PHN-001',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    tags: ['smartphone', 'premium', '5G'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 11,
    weight: 0.2,
    dimensions: { length: 15, width: 7, height: 1 },
    specifications: [
      { name: 'Écran', value: '6.1" OLED' },
      { name: 'Stockage', value: '128GB' },
      { name: 'RAM', value: '8GB' },
      { name: 'Caméra', value: '48MP + 12MP + 12MP' }
    ],
    priceVariants: [
      { name: '128GB', price: 799.99, originalPrice: 899.99, isActive: true },
      { name: '256GB', price: 899.99, originalPrice: 999.99, isActive: true },
      { name: '512GB', price: 1099.99, originalPrice: 1199.99, isActive: true }
    ]
  }
];

// Fonction pour créer les catégories
const createCategories = async () => {
  try {
    console.log('📂 Création des catégories...');
    
    for (const categoryData of categoriesData) {
      const existingCategory = await Category.findOne({ name: categoryData.name });
      if (!existingCategory) {
        const category = new Category(categoryData);
        await category.save();
        console.log(`✅ Catégorie créée: ${categoryData.name}`);
      } else {
        console.log(`⏭️ Catégorie existante: ${categoryData.name}`);
      }
    }
    
    console.log('✅ Toutes les catégories ont été créées');
  } catch (error) {
    console.error('❌ Erreur lors de la création des catégories:', error);
  }
};

// Fonction pour créer les produits
const createProducts = async () => {
  try {
    console.log('📦 Création des produits...');
    
    for (const productData of productsData) {
      const existingProduct = await Product.findOne({ sku: productData.sku });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`✅ Produit créé: ${productData.name}`);
      } else {
        console.log(`⏭️ Produit existant: ${productData.name}`);
      }
    }
    
    console.log('✅ Tous les produits ont été créés');
  } catch (error) {
    console.error('❌ Erreur lors de la création des produits:', error);
  }
};

// Fonction principale
const seedData = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Début du seeding des données...');
    
    await createCategories();
    await createProducts();
    
    console.log('✅ Seeding terminé avec succès!');
    
    // Afficher les statistiques
    const categoriesCount = await Category.countDocuments();
    const productsCount = await Product.countDocuments();
    
    console.log(`📊 Statistiques:`);
    console.log(`   - Catégories: ${categoriesCount}`);
    console.log(`   - Produits: ${productsCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    process.exit(1);
  }
};

// Exécuter le script si appelé directement
if (require.main === module) {
  seedData();
}

module.exports = { seedData };