require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('🔍 Test de connexion MongoDB...\n');
  
  try {
    // Tester la connexion
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connexion MongoDB réussie !');
    console.log(`📦 Base de données: ${mongoose.connection.name}`);
    console.log(`🔗 URI: ${process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
    
    // Tester une opération simple
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ 
      test: 'Connection test', 
      timestamp: new Date() 
    });
    
    console.log('✅ Test d\'écriture réussi !');
    
    // Nettoyer le test
    await testCollection.deleteOne({ test: 'Connection test' });
    console.log('✅ Test de suppression réussi !');
    
    console.log('\n🎉 MongoDB est prêt à être utilisé !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:');
    console.error(error.message);
    
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez que MongoDB est démarré');
    console.log('2. Vérifiez l\'URI dans le fichier .env');
    console.log('3. Vérifiez les paramètres d\'authentification');
    console.log('4. Vérifiez que votre IP est autorisée (pour Atlas)');
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 MongoDB n\'est pas démarré. Démarrez-le avec:');
      console.log('   - Local: sudo systemctl start mongod');
      console.log('   - Docker: docker start mongodb');
    }
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Problème d\'authentification. Vérifiez:');
      console.log('   - Le nom d\'utilisateur et mot de passe');
      console.log('   - Les permissions de l\'utilisateur');
    }
    
  } finally {
    await mongoose.connection.close();
    console.log('\n📦 Connexion fermée');
  }
};

// Exécuter le test
testConnection();