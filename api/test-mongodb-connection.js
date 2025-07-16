require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Test de connexion MongoDB Atlas');
console.log('==================================\n');

async function testMongoDBConnection() {
  try {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      console.error('❌ MONGODB_URI non définie dans le fichier .env');
      console.log('💡 Créez un fichier .env avec :');
      console.log('MONGODB_URI=mongodb+srv://Junior:1ss3ACI07dH3IvIv@cluster0.xxxxx.mongodb.net/boutique_admin?retryWrites=true&w=majority');
      return;
    }

    console.log('📡 URI MongoDB (masquée):');
    console.log(uri.replace(/\/\/.*@/, '//***:***@'));
    console.log('');

    // Test de connexion
    console.log('🔄 Tentative de connexion...');
    
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 secondes
      socketTimeoutMS: 45000, // 45 secondes
    });

    console.log('✅ Connexion MongoDB réussie !');
    console.log(`📦 Base de données: ${conn.connection.name}`);
    console.log(`🔗 Host: ${conn.connection.host}`);
    console.log(`🔌 Port: ${conn.connection.port}`);
    console.log(`👤 Utilisateur: ${conn.connection.user || 'Non authentifié'}`);

    // Test d'écriture
    console.log('\n🧪 Test d\'écriture...');
    const testCollection = mongoose.connection.collection('test_connection');
    
    const testDoc = {
      test: true,
      timestamp: new Date(),
      message: 'Test de connexion MongoDB Atlas',
      user: 'Junior'
    };

    const result = await testCollection.insertOne(testDoc);
    console.log('✅ Test d\'écriture réussi !');
    console.log(`📄 Document inséré avec l'ID: ${result.insertedId}`);

    // Test de lecture
    console.log('\n📖 Test de lecture...');
    const readDoc = await testCollection.findOne({ _id: result.insertedId });
    if (readDoc) {
      console.log('✅ Test de lecture réussi !');
      console.log(`📄 Document lu: ${JSON.stringify(readDoc, null, 2)}`);
    }

    // Nettoyer le test
    console.log('\n🧹 Nettoyage du test...');
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test de suppression réussi !');

    console.log('\n🎉 Tous les tests MongoDB sont réussis !');
    console.log('🚀 MongoDB Atlas est prêt à être utilisé !');

  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    
    // Diagnostic des erreurs courantes
    console.log('\n🔍 Diagnostic des erreurs :');
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('❌ Erreur ENOTFOUND : Le nom du cluster n\'est pas résolu');
      console.log('💡 Solutions :');
      console.log('  1. Vérifiez que le nom du cluster est correct');
      console.log('  2. Vérifiez que l\'identifiant du cluster est correct');
      console.log('  3. Vérifiez votre connexion internet');
      console.log('  4. Exemple d\'URI correcte :');
      console.log('     mongodb+srv://Junior:1ss3ACI07dH3IvIv@cluster0.abc123.mongodb.net/boutique_admin?retryWrites=true&w=majority');
    }
    
    else if (error.message.includes('Authentication failed')) {
      console.log('❌ Erreur d\'authentification : Nom d\'utilisateur ou mot de passe incorrect');
      console.log('💡 Solutions :');
      console.log('  1. Vérifiez le nom d\'utilisateur : Junior');
      console.log('  2. Vérifiez le mot de passe : 1ss3ACI07dH3IvIv');
      console.log('  3. Assurez-vous que l\'utilisateur a les bonnes permissions dans MongoDB Atlas');
    }
    
    else if (error.message.includes('ECONNREFUSED')) {
      console.log('❌ Erreur ECONNREFUSED : Connexion refusée');
      console.log('💡 Solutions :');
      console.log('  1. Vérifiez que votre IP est autorisée dans MongoDB Atlas');
      console.log('  2. Allez dans MongoDB Atlas > Network Access > Add IP Address');
      console.log('  3. Ajoutez votre IP ou "Allow Access from Anywhere"');
    }
    
    else if (error.message.includes('Server selection timed out')) {
      console.log('❌ Erreur de timeout : Le serveur MongoDB n\'est pas accessible');
      console.log('💡 Solutions :');
      console.log('  1. Vérifiez votre connexion internet');
      console.log('  2. Vérifiez que le cluster MongoDB Atlas est actif');
      console.log('  3. Vérifiez que votre IP est autorisée');
    }
    
    else {
      console.log('❌ Erreur inconnue');
      console.log('💡 Vérifiez :');
      console.log('  1. Le format de l\'URI MongoDB');
      console.log('  2. Les permissions de l\'utilisateur');
      console.log('  3. La configuration réseau dans MongoDB Atlas');
    }

    console.log('\n📋 Pour configurer MongoDB Atlas :');
    console.log('1. Allez sur https://cloud.mongodb.com');
    console.log('2. Connectez-vous à votre compte');
    console.log('3. Sélectionnez votre cluster');
    console.log('4. Cliquez sur "Connect"');
    console.log('5. Choisissez "Connect your application"');
    console.log('6. Copiez l\'URI de connexion');
    console.log('7. Remplacez <password> par votre mot de passe');
    console.log('8. Ajoutez le nom de la base de données à la fin de l\'URI');
  }
}

testMongoDBConnection();