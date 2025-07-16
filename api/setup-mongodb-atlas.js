require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Configuration MongoDB Atlas');
console.log('=============================\n');

// Informations fournies par l'utilisateur
const username = 'Junior';
const password = '1ss3ACI07dH3IvIv';

console.log(`👤 Utilisateur: ${username}`);
console.log(`🔑 Mot de passe: ${password}\n`);

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setupMongoDBAtlas() {
  try {
    console.log('📋 Pour configurer MongoDB Atlas, vous avez besoin de :');
    console.log('1. Le nom de votre cluster (ex: cluster0)');
    console.log('2. L\'identifiant unique du cluster (ex: abc123)');
    console.log('3. Le nom de la base de données (par défaut: boutique_admin)\n');

    const clusterName = await askQuestion('🏗️  Nom de votre cluster (ex: cluster0): ');
    const clusterId = await askQuestion('🆔 Identifiant unique du cluster (ex: abc123): ');
    const databaseName = await askQuestion('🗄️  Nom de la base de données (défaut: boutique_admin): ') || 'boutique_admin';

    // Construire l'URI MongoDB Atlas
    const mongoUri = `mongodb+srv://${username}:${password}@${clusterName}.${clusterId}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

    console.log('\n🔗 URI MongoDB Atlas générée :');
    console.log(mongoUri.replace(password, '***'));

    // Tester la connexion
    console.log('\n🧪 Test de connexion...');
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connexion MongoDB Atlas réussie !');
    console.log(`📦 Base de données: ${databaseName}`);
    console.log(`🔗 Cluster: ${clusterName}.${clusterId}.mongodb.net`);

    // Test d'écriture
    const testCollection = mongoose.connection.collection('test_connection');
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Test de connexion MongoDB Atlas'
    });
    console.log('✅ Test d\'écriture réussi !');

    // Nettoyer le test
    await testCollection.deleteOne({ test: true });
    console.log('✅ Test de suppression réussi !');

    // Mettre à jour le fichier .env
    const fs = require('fs');
    const envPath = '.env';
    
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Remplacer ou ajouter MONGODB_URI
    if (envContent.includes('MONGODB_URI=')) {
      envContent = envContent.replace(
        /MONGODB_URI=.*/,
        `MONGODB_URI=${mongoUri}`
      );
    } else {
      envContent += `\nMONGODB_URI=${mongoUri}\n`;
    }

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Fichier .env mis à jour !');

    console.log('\n🎉 Configuration MongoDB Atlas terminée !');
    console.log('🚀 Vous pouvez maintenant démarrer l\'API avec : npm run dev');

  } catch (error) {
    console.error('❌ Erreur lors de la configuration :', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Solutions possibles :');
      console.log('1. Vérifiez que le nom du cluster et l\'identifiant sont corrects');
      console.log('2. Assurez-vous que votre IP est autorisée dans MongoDB Atlas');
      console.log('3. Vérifiez que l\'utilisateur a les bonnes permissions');
    } else if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Solutions possibles :');
      console.log('1. Vérifiez le nom d\'utilisateur et le mot de passe');
      console.log('2. Assurez-vous que l\'utilisateur a accès à la base de données');
    }
  } finally {
    rl.close();
    process.exit(0);
  }
}

setupMongoDBAtlas();