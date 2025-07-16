const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Données de test pour les catégories
const categories = [
  {
    name: 'Électronique',
    slug: 'electronique',
    description: 'Produits électroniques et gadgets',
    isActive: true,
    isFeatured: true,
    sortOrder: 1
  },
  {
    name: 'Vêtements',
    slug: 'vetements',
    description: 'Vêtements et accessoires de mode',
    isActive: true,
    isFeatured: true,
    sortOrder: 2
  },
  {
    name: 'Maison & Jardin',
    slug: 'maison-jardin',
    description: 'Articles pour la maison et le jardin',
    isActive: true,
    isFeatured: false,
    sortOrder: 3
  },
  {
    name: 'Sport & Loisirs',
    slug: 'sport-loisirs',
    description: 'Équipements sportifs et de loisirs',
    isActive: true,
    isFeatured: false,
    sortOrder: 4
  }
];

// Données de test pour les produits
const products = [
  {
    name: 'Smartphone Galaxy S23',
    description: 'Le dernier smartphone Samsung avec des fonctionnalités avancées',
    shortDescription: 'Smartphone haut de gamme avec appareil photo professionnel',
    price: 899.99,
    originalPrice: 999.99,
    category: 'Électronique',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    stock: 25,
    sku: 'SM-GAL-S23-001',
    tags: ['smartphone', 'samsung', '5G', 'photographie'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 10,
    weight: 168,
    dimensions: {
      length: 146.3,
      width: 70.9,
      height: 7.6
    },
    specifications: [
      { name: 'Écran', value: '6.1 pouces AMOLED' },
      { name: 'Processeur', value: 'Snapdragon 8 Gen 2' },
      { name: 'RAM', value: '8 GB' },
      { name: 'Stockage', value: '128 GB' }
    ]
  },
  {
    name: 'T-shirt Premium Cotton',
    description: 'T-shirt en coton bio de haute qualité, confortable et durable',
    shortDescription: 'T-shirt premium en coton bio',
    price: 29.99,
    category: 'Vêtements',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 150,
    sku: 'TSH-COT-PRE-001',
    tags: ['t-shirt', 'cotton', 'bio', 'confortable'],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    weight: 180,
    dimensions: {
      length: 70,
      width: 50,
      height: 2
    },
    specifications: [
      { name: 'Matériau', value: '100% coton bio' },
      { name: 'Grammage', value: '180 g/m²' },
      { name: 'Couleurs', value: 'Blanc, Noir, Bleu' },
      { name: 'Tailles', value: 'S, M, L, XL' }
    ]
  },
  {
    name: 'Lampadaire Design Moderne',
    description: 'Lampadaire design moderne avec éclairage LED intégré',
    shortDescription: 'Lampadaire design pour salon moderne',
    price: 199.99,
    category: 'Maison & Jardin',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    stock: 12,
    sku: 'LAMP-DES-MOD-001',
    tags: ['lampadaire', 'design', 'led', 'moderne'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 15,
    weight: 2500,
    dimensions: {
      length: 40,
      width: 40,
      height: 180
    },
    specifications: [
      { name: 'Hauteur', value: '180 cm' },
      { name: 'Puissance', value: '15W LED' },
      { name: 'Matériau', value: 'Métal et verre' },
      { name: 'Couleur', value: 'Noir mat' }
    ]
  },
  {
    name: 'Ballon de Football Pro',
    description: 'Ballon de football professionnel pour matchs et entraînements',
    shortDescription: 'Ballon de football professionnel',
    price: 89.99,
    category: 'Sport & Loisirs',
    images: [
      'https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=500',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    mainImage: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=500',
    stock: 45,
    sku: 'BALL-FOOT-PRO-001',
    tags: ['football', 'ballon', 'sport', 'professionnel'],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    weight: 430,
    dimensions: {
      length: 22,
      width: 22,
      height: 22
    },
    specifications: [
      { name: 'Taille', value: 'Taille 5 (22 cm)' },
      { name: 'Matériau', value: 'Cuir synthétique' },
      { name: 'Pression', value: '0.8-1.0 bar' },
      { name: 'Certification', value: 'FIFA Quality Pro' }
    ]
  }
];

// Fonction pour créer un utilisateur admin par défaut
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@boutique.com' });
    
    if (!adminExists) {
      const admin = new User({
        name: 'Administrateur',
        email: 'admin@boutique.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      });
      
      await admin.save();
      console.log('✅ Utilisateur admin créé avec succès');
      console.log('📧 Email: admin@boutique.com');
      console.log('🔑 Mot de passe: admin123');
    } else {
      console.log('ℹ️  L\'utilisateur admin existe déjà');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'admin:', error.message);
  }
};

// Fonction pour créer les catégories
const createCategories = async () => {
  try {
    for (const categoryData of categories) {
      const existingCategory = await Category.findOne({ slug: categoryData.slug });
      
      if (!existingCategory) {
        const category = new Category(categoryData);
        await category.save();
        console.log(`✅ Catégorie "${categoryData.name}" créée`);
      } else {
        console.log(`ℹ️  Catégorie "${categoryData.name}" existe déjà`);
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la création des catégories:', error.message);
  }
};

// Fonction pour créer les produits
const createProducts = async () => {
  try {
    for (const productData of products) {
      const existingProduct = await Product.findOne({ sku: productData.sku });
      
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`✅ Produit "${productData.name}" créé`);
      } else {
        console.log(`ℹ️  Produit "${productData.name}" existe déjà`);
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la création des produits:', error.message);
  }
};

// Fonction principale pour initialiser la base de données
const seedDatabase = async () => {
  console.log('🌱 Initialisation de la base de données...');
  
  try {
    await createDefaultAdmin();
    await createCategories();
    await createProducts();
    
    console.log('✅ Base de données initialisée avec succès !');
    console.log('\n📊 Données créées:');
    console.log('- 1 utilisateur admin');
    console.log('- 4 catégories');
    console.log('- 4 produits de démonstration');
    console.log('\n🚀 Vous pouvez maintenant démarrer l\'API !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message);
  }
};

module.exports = { seedDatabase };