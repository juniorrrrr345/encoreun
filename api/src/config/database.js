const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Vérifier si l'URL MongoDB est configurée
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  Aucune URL MongoDB configurée, utilisation du mode mémoire');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout plus court
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    console.log('⚠️  Utilisation du mode mémoire pour les tests');
    // Ne pas arrêter le serveur, continuer avec les données en mémoire
  }
};

module.exports = connectDB;