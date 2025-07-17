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

// Données de test CBD
const categories = [
  {
    name: 'Huiles CBD',
    description: 'Huiles de CBD premium, full spectrum et broad spectrum',
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    metaTitle: 'Huiles CBD - CBD Shop',
    metaDescription: 'Découvrez notre gamme d\'huiles CBD de qualité premium'
  },
  {
    name: 'Fleurs CBD',
    description: 'Fleurs de CBD cultivées naturellement, riches en cannabinoïdes',
    isActive: true,
    isFeatured: true,
    sortOrder: 2,
    metaTitle: 'Fleurs CBD - CBD Shop',
    metaDescription: 'Fleurs de CBD biologiques et naturelles'
  },
  {
    name: 'Résines CBD',
    description: 'Résines et hash CBD artisanaux de haute qualité',
    isActive: true,
    isFeatured: true,
    sortOrder: 3,
    metaTitle: 'Résines CBD - CBD Shop',
    metaDescription: 'Résines CBD artisanales premium'
  },
  {
    name: 'Cosmétiques CBD',
    description: 'Crèmes, baumes et cosmétiques enrichis au CBD',
    isActive: true,
    isFeatured: false,
    sortOrder: 4,
    metaTitle: 'Cosmétiques CBD - CBD Shop',
    metaDescription: 'Produits cosmétiques au CBD pour le bien-être'
  },
  {
    name: 'Alimentaire CBD',
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
    price: 49.99,
    category: 'Huiles CBD',
    stock: 25,
    sku: 'CBD-OIL-10-FS',
    images: ['/images/huile-10-full.jpg'],
    mainImage: '/images/huile-10-full.jpg',
    isActive: true,
    isFeatured: true,
    specifications: {
      concentration: '10% CBD',
      volume: '10ml',
      type: 'Full Spectrum',
      origine: 'France'
    }
  },
  {
    name: 'Huile CBD 20% Broad Spectrum',
    description: 'Huile de CBD broad spectrum 20% sans THC. Idéale pour un usage quotidien intense. Saveur naturelle de chanvre.',
    price: 89.99,
    category: 'Huiles CBD',
    stock: 15,
    sku: 'CBD-OIL-20-BS',
    images: ['/images/huile-20-broad.jpg'],
    mainImage: '/images/huile-20-broad.jpg',
    isActive: true,
    isFeatured: true,
    specifications: {
      concentration: '20% CBD',
      volume: '10ml',
      type: 'Broad Spectrum',
      origine: 'Suisse'
    }
  },
  
  // Fleurs CBD
  {
    name: 'Fleur Amnesia CBD',
    description: 'Fleur de CBD Amnesia cultivée en indoor. Arômes citronnés et terreux. Taux de CBD élevé avec moins de 0,3% de THC.',
    price: 12.99,
    category: 'Fleurs CBD',
    stock: 50,
    sku: 'CBD-FLOWER-AMNESIA',
    images: ['/images/fleur-amnesia.jpg'],
    mainImage: '/images/fleur-amnesia.jpg',
    isActive: true,
    isFeatured: true,
    specifications: {
      concentration: '18% CBD',
      poids: '1g',
      culture: 'Indoor',
      origine: 'Italie'
    }
  },
  {
    name: 'Fleur Lemon Haze CBD',
    description: 'Fleur Lemon Haze au parfum citronné intense. Cultivée biologiquement en outdoor. Parfaite pour la détente.',
    price: 10.99,
    category: 'Fleurs CBD',
    stock: 40,
    sku: 'CBD-FLOWER-LEMON',
    images: ['/images/fleur-lemon.jpg'],
    mainImage: '/images/fleur-lemon.jpg',
    isActive: true,
    isFeatured: false,
    specifications: {
      concentration: '15% CBD',
      poids: '1g',
      culture: 'Outdoor Bio',
      origine: 'France'
    }
  },
  
  // Résines CBD
  {
    name: 'Résine Charas CBD',
    description: 'Résine Charas CBD artisanale de haute qualité. Texture malléable et arômes authentiques. Méthode traditionnelle.',
    price: 15.99,
    category: 'Résines CBD',
    stock: 30,
    sku: 'CBD-RESIN-CHARAS',
    images: ['/images/resine-charas.jpg'],
    mainImage: '/images/resine-charas.jpg',
    isActive: true,
    isFeatured: true,
    specifications: {
      concentration: '22% CBD',
      poids: '1g',
      type: 'Charas',
      origine: 'Afghanistan'
    }
  },
  
  // Cosmétiques CBD
  {
    name: 'Crème Anti-Douleur CBD',
    description: 'Crème topique au CBD pour soulager les douleurs musculaires et articulaires. Enrichie en huiles essentielles.',
    price: 24.99,
    category: 'Cosmétiques CBD',
    stock: 20,
    sku: 'CBD-CREAM-PAIN',
    images: ['/images/creme-douleur.jpg'],
    mainImage: '/images/creme-douleur.jpg',
    isActive: true,
    isFeatured: false,
    specifications: {
      concentration: '300mg CBD',
      volume: '50ml',
      type: 'Crème topique',
      ingredients: 'CBD, Arnica, Menthol'
    }
  },
  
  // Alimentaire CBD
  {
    name: 'Chocolat Noir CBD 70%',
    description: 'Chocolat noir 70% de cacao infusé au CBD. Plaisir gourmand et bienfaits du CBD réunis.',
    price: 8.99,
    category: 'Alimentaire CBD',
    stock: 60,
    sku: 'CBD-CHOCO-DARK',
    images: ['/images/chocolat-cbd.jpg'],
    mainImage: '/images/chocolat-cbd.jpg',
    isActive: true,
    isFeatured: false,
    specifications: {
      concentration: '50mg CBD',
      poids: '100g',
      cacao: '70%',
      origine: 'Équateur'
    }
  }
];

// Fonction principale de seeding
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

    console.log('🎉 Seeding terminé avec succès!');
    console.log('\n📊 Données créées:');
    console.log(`- ${createdCategories.length} catégories CBD`);
    console.log(`- ${createdProducts.length} produits CBD`);
    console.log('\n🌐 Vous pouvez maintenant:');
    console.log('- Accéder à la boutique: http://localhost:3000');
    console.log('- Gérer depuis l\'admin: http://localhost:3001');
    
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Exécuter le seeding si appelé directement
if (require.main === module) {
  connectDB().then(seedDatabase);
}

module.exports = { seedDatabase, categories, products };