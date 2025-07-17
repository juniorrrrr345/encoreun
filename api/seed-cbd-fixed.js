require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');

// Connexion à MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🌿 Connexion MongoDB réussie');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error);
    process.exit(1);
  }
};

// Données de test CBD corrigées
const categories = [
  {
    name: 'Huiles CBD',
    slug: 'huiles-cbd',
    description: 'Huiles de CBD premium, full spectrum et broad spectrum',
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    metaTitle: 'Huiles CBD - CBD Shop',
    metaDescription: 'Découvrez notre gamme d\'huiles CBD de qualité premium'
  },
  {
    name: 'Fleurs CBD',
    slug: 'fleurs-cbd',
    description: 'Fleurs de CBD cultivées naturellement, riches en cannabinoïdes',
    isActive: true,
    isFeatured: true,
    sortOrder: 2,
    metaTitle: 'Fleurs CBD - CBD Shop',
    metaDescription: 'Fleurs de CBD biologiques et naturelles'
  },
  {
    name: 'Résines CBD',
    slug: 'resines-cbd',
    description: 'Résines et hash CBD artisanaux de haute qualité',
    isActive: true,
    isFeatured: true,
    sortOrder: 3,
    metaTitle: 'Résines CBD - CBD Shop',
    metaDescription: 'Résines CBD artisanales premium'
  },
  {
    name: 'Cosmétiques CBD',
    slug: 'cosmetiques-cbd',
    description: 'Crèmes, baumes et cosmétiques enrichis au CBD',
    isActive: true,
    isFeatured: false,
    sortOrder: 4,
    metaTitle: 'Cosmétiques CBD - CBD Shop',
    metaDescription: 'Produits cosmétiques au CBD pour le bien-être'
  },
  {
    name: 'Alimentaire CBD',
    slug: 'alimentaire-cbd',
    description: 'Chocolats, bonbons et aliments infusés au CBD',
    isActive: true,
    isFeatured: false,
    sortOrder: 5,
    metaTitle: 'Alimentaire CBD - CBD Shop',
    metaDescription: 'Délices alimentaires au CBD'
  }
];

const products = [
  // Huiles CBD
  {
    name: 'Huile CBD 10% Full Spectrum',
    description: 'Huile de CBD full spectrum 10% dans une base d\'huile de chanvre bio. Extraction CO2 supercritique pour préserver tous les cannabinoïdes et terpènes naturels.',
    shortDescription: 'Huile CBD 10% qualité premium',
    price: 49.99,
    originalPrice: 59.99,
    category: 'Huiles CBD',
    subcategory: 'Full Spectrum',
    stock: 25,
    sku: 'CBD-OIL-10-FS',
    images: ['/images/huile-cbd-10.jpg'],
    mainImage: '/images/huile-cbd-10.jpg',
    tags: ['CBD', 'Full Spectrum', 'Bio', 'Premium'],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    salePercentage: 17,
    weight: 10,
    specifications: [
      { name: 'Concentration', value: '10% CBD' },
      { name: 'Volume', value: '10ml' },
      { name: 'Type', value: 'Full Spectrum' },
      { name: 'Origine', value: 'France' }
    ]
  },
  {
    name: 'Huile CBD 20% Broad Spectrum',
    description: 'Huile de CBD broad spectrum 20% sans THC. Idéale pour un usage quotidien intense. Saveur naturelle de chanvre.',
    shortDescription: 'Huile CBD 20% sans THC',
    price: 89.99,
    originalPrice: 89.99,
    category: 'Huiles CBD',
    subcategory: 'Broad Spectrum',
    stock: 15,
    sku: 'CBD-OIL-20-BS',
    images: ['/images/huile-cbd-20.jpg'],
    mainImage: '/images/huile-cbd-20.jpg',
    tags: ['CBD', 'Broad Spectrum', 'Sans THC'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    salePercentage: 0,
    weight: 10,
    specifications: [
      { name: 'Concentration', value: '20% CBD' },
      { name: 'Volume', value: '10ml' },
      { name: 'Type', value: 'Broad Spectrum' },
      { name: 'Origine', value: 'Suisse' }
    ]
  },

  // Fleurs CBD
  {
    name: 'Fleur Amnesia CBD',
    description: 'Fleur de CBD Amnesia cultivée en indoor. Arômes citronnés et terreux. Taux de CBD élevé avec moins de 0,3% de THC.',
    shortDescription: 'Fleur CBD Amnesia premium indoor',
    price: 8.50,
    originalPrice: 8.50,
    category: 'Fleurs CBD',
    subcategory: 'Indoor',
    stock: 50,
    sku: 'CBD-FLOWER-AMNESIA',
    images: ['/images/fleur-amnesia.jpg'],
    mainImage: '/images/fleur-amnesia.jpg',
    tags: ['CBD', 'Fleur', 'Indoor', 'Amnesia'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    salePercentage: 0,
    weight: 1,
    specifications: [
      { name: 'Concentration', value: '18% CBD' },
      { name: 'Poids', value: '1g' },
      { name: 'Culture', value: 'Indoor' },
      { name: 'Origine', value: 'Italie' }
    ]
  },
  {
    name: 'Fleur Lemon Haze CBD',
    description: 'Fleur Lemon Haze au parfum citronné intense. Cultivée biologiquement en outdoor. Parfaite pour la détente.',
    shortDescription: 'Fleur CBD Lemon Haze outdoor',
    price: 10.99,
    originalPrice: 10.99,
    category: 'Fleurs CBD',
    subcategory: 'Outdoor',
    stock: 40,
    sku: 'CBD-FLOWER-LEMON',
    images: ['/images/fleur-lemon.jpg'],
    mainImage: '/images/fleur-lemon.jpg',
    tags: ['CBD', 'Fleur', 'Outdoor', 'Citron'],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    salePercentage: 0,
    weight: 1,
    specifications: [
      { name: 'Concentration', value: '15% CBD' },
      { name: 'Poids', value: '1g' },
      { name: 'Culture', value: 'Outdoor' },
      { name: 'Origine', value: 'Espagne' }
    ]
  },

  // Résines CBD
  {
    name: 'Résine Charas CBD',
    description: 'Résine Charas CBD artisanale de haute qualité. Texture malléable et arômes authentiques. Méthode traditionnelle.',
    shortDescription: 'Résine CBD Charas artisanale',
    price: 12.00,
    originalPrice: 12.00,
    category: 'Résines CBD',
    subcategory: 'Artisanale',
    stock: 30,
    sku: 'CBD-RESIN-CHARAS',
    images: ['/images/resine-charas.jpg'],
    mainImage: '/images/resine-charas.jpg',
    tags: ['CBD', 'Résine', 'Charas', 'Artisanal'],
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    salePercentage: 0,
    weight: 1,
    specifications: [
      { name: 'Concentration', value: '22% CBD' },
      { name: 'Poids', value: '1g' },
      { name: 'Type', value: 'Charas' },
      { name: 'Méthode', value: 'Artisanale' }
    ]
  },

  // Cosmétiques CBD
  {
    name: 'Crème Anti-Douleur CBD',
    description: 'Crème topique au CBD pour soulager les douleurs musculaires et articulaires. Enrichie en huiles essentielles.',
    shortDescription: 'Crème CBD anti-douleur',
    price: 24.99,
    originalPrice: 24.99,
    category: 'Cosmétiques CBD',
    subcategory: 'Soins',
    stock: 20,
    sku: 'CBD-CREAM-PAIN',
    images: ['/images/creme-cbd.jpg'],
    mainImage: '/images/creme-cbd.jpg',
    tags: ['CBD', 'Crème', 'Anti-douleur', 'Topique'],
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    salePercentage: 0,
    weight: 50,
    specifications: [
      { name: 'Concentration', value: '300mg CBD' },
      { name: 'Volume', value: '50ml' },
      { name: 'Type', value: 'Topique' },
      { name: 'Ingrédients', value: 'CBD, Arnica, Menthol' }
    ]
  },

  // Alimentaire CBD
  {
    name: 'Chocolat Noir CBD 70%',
    description: 'Chocolat noir 70% de cacao infusé au CBD. Plaisir gourmand et bienfaits du CBD réunis.',
    shortDescription: 'Chocolat noir 70% infusé CBD',
    price: 15.99,
    originalPrice: 15.99,
    category: 'Alimentaire CBD',
    subcategory: 'Chocolats',
    stock: 25,
    sku: 'CBD-CHOCO-DARK',
    images: ['/images/chocolat-cbd.jpg'],
    mainImage: '/images/chocolat-cbd.jpg',
    tags: ['CBD', 'Chocolat', 'Noir', 'Alimentaire'],
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    salePercentage: 10,
    weight: 100,
    specifications: [
      { name: 'Concentration', value: '50mg CBD' },
      { name: 'Poids', value: '100g' },
      { name: 'Cacao', value: '70%' },
      { name: 'Type', value: 'Alimentaire' }
    ]
  }
];

// Fonction de seeding
const seedDatabase = async () => {
  try {
    console.log('🌿 Démarrage du seeding CBD Shop...');

    // Vider les collections existantes
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️ Collections vidées');

    // Créer les catégories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} catégories créées`);

    // Créer les produits
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} produits créés`);

    console.log('🎉 Seeding terminé avec succès !');
    
    // Afficher un résumé
    console.log('\n📊 Résumé:');
    console.log(`- Catégories: ${createdCategories.length}`);
    console.log(`- Produits: ${createdProducts.length}`);
    console.log('\n🛍️ Catégories créées:');
    createdCategories.forEach(cat => console.log(`  - ${cat.name}`));
    
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
  } finally {
    mongoose.connection.close();
    console.log('📝 Connexion fermée');
  }
};

// Lancement du seeding
const run = async () => {
  await connectDB();
  await seedDatabase();
};

run();