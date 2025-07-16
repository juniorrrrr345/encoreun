require('dotenv').config();
const mongoose = require('mongoose');
const { seedDatabase } = require('./src/utils/seeder');

// Connexion à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 Connexion à MongoDB établie');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

// Fonction principale
const main = async () => {
  console.log('🚀 Démarrage de l\'initialisation de la base de données...\n');
  
  try {
    await connectDB();
    await seedDatabase();
    
    console.log('\n✅ Initialisation terminée avec succès !');
    console.log('\n📋 Prochaines étapes:');
    console.log('1. Démarrer l\'API: npm run dev');
    console.log('2. Accéder à l\'API: http://localhost:5000');
    console.log('3. Se connecter avec: admin@boutique.com / admin123');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n📦 Connexion MongoDB fermée');
    process.exit(0);
  }
};

// Exécuter le script
main();