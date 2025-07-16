#!/usr/bin/env node

require('dotenv').config();
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log('🔧 Configuration MongoDB pour le Panel Administratif\n');

async function setupMongoDB() {
  try {
    console.log('📋 Choisissez votre option MongoDB :\n');
    console.log('1. MongoDB Atlas (Recommandé - Gratuit)');
    console.log('2. MongoDB Local avec Docker');
    console.log('3. MongoDB Local (Installation manuelle)');
    console.log('4. Quitter\n');

    const choice = await question('Votre choix (1-4) : ');

    switch (choice) {
      case '1':
        await setupAtlas();
        break;
      case '2':
        await setupDocker();
        break;
      case '3':
        await setupLocal();
        break;
      case '4':
        console.log('👋 Au revoir !');
        process.exit(0);
        break;
      default:
        console.log('❌ Choix invalide');
        process.exit(1);
    }

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
  } finally {
    rl.close();
  }
}

async function setupAtlas() {
  console.log('\n🗄️ Configuration MongoDB Atlas\n');
  
  console.log('📋 Étapes à suivre :');
  console.log('1. Allez sur mongodb.com/atlas');
  console.log('2. Créez un compte gratuit');
  console.log('3. Créez un cluster gratuit (M0 Sandbox)');
  console.log('4. Configurez la sécurité (utilisateur + réseau)');
  console.log('5. Obtenez l\'URI de connexion\n');

  const uri = await question('Collez votre URI MongoDB Atlas : ');
  
  if (!uri.includes('mongodb+srv://')) {
    console.log('❌ URI invalide. Assurez-vous qu\'il commence par mongodb+srv://');
    return;
  }

  await updateEnvFile({
    MONGODB_URI: uri
  });

  console.log('✅ Configuration Atlas terminée !');
  await testConnection();
}

async function setupDocker() {
  console.log('\n🐳 Configuration MongoDB avec Docker\n');
  
  console.log('📋 Vérification de Docker...');
  
  try {
    const { exec } = require('child_process');
    exec('docker --version', async (error) => {
      if (error) {
        console.log('❌ Docker n\'est pas installé');
        console.log('💡 Installez Docker d\'abord :');
        console.log('   Ubuntu/Debian: sudo apt-get install docker.io docker-compose');
        console.log('   macOS: brew install docker docker-compose');
        return;
      }

      console.log('✅ Docker est installé');
      
      console.log('🚀 Lancement de MongoDB...');
      exec('docker-compose up -d mongodb', async (error) => {
        if (error) {
          console.log('❌ Erreur lors du lancement de MongoDB');
          console.log('💡 Vérifiez que docker-compose.yml existe');
          return;
        }

        console.log('✅ MongoDB lancé avec Docker');
        
        await updateEnvFile({
          MONGODB_URI: 'mongodb://admin:password123@localhost:27017/boutique_admin?authSource=admin'
        });

        console.log('✅ Configuration Docker terminée !');
        await testConnection();
      });
    });
  } catch (error) {
    console.log('❌ Erreur lors de la vérification de Docker');
  }
}

async function setupLocal() {
  console.log('\n💻 Configuration MongoDB Local\n');
  
  console.log('📋 Assurez-vous que MongoDB est installé et démarré');
  console.log('💡 Commandes utiles :');
  console.log('   Ubuntu/Debian: sudo systemctl start mongod');
  console.log('   macOS: brew services start mongodb/brew/mongodb-community');
  console.log('   Windows: MongoDB démarre automatiquement\n');

  const useAuth = await question('Utilisez-vous l\'authentification ? (y/n) : ');
  
  let uri;
  if (useAuth.toLowerCase() === 'y') {
    const username = await question('Nom d\'utilisateur : ');
    const password = await question('Mot de passe : ');
    uri = `mongodb://${username}:${password}@localhost:27017/boutique_admin?authSource=admin`;
  } else {
    uri = 'mongodb://localhost:27017/boutique_admin';
  }

  await updateEnvFile({
    MONGODB_URI: uri
  });

  console.log('✅ Configuration locale terminée !');
  await testConnection();
}

async function updateEnvFile(updates) {
  const envPath = path.join(__dirname, '.env');
  let envContent = '';

  // Lire le fichier .env existant ou créer un nouveau
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  } else {
    envContent = fs.readFileSync(path.join(__dirname, '.env.example'), 'utf8');
  }

  // Mettre à jour les variables
  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*`, 'm');
    const newLine = `${key}=${value}`;
    
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, newLine);
    } else {
      envContent += `\n${newLine}`;
    }
  }

  // Écrire le fichier
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Fichier .env mis à jour');
}

async function testConnection() {
  console.log('\n🧪 Test de la connexion MongoDB...\n');
  
  try {
    const mongoose = require('mongoose');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connexion MongoDB réussie !');
    console.log(`📦 Base de données: ${mongoose.connection.name}`);
    
    // Test d'écriture
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ 
      test: 'Connection test', 
      timestamp: new Date() 
    });
    console.log('✅ Test d\'écriture réussi !');
    
    // Nettoyer
    await testCollection.deleteOne({ test: 'Connection test' });
    console.log('✅ Test de suppression réussi !');
    
    await mongoose.connection.close();
    
    console.log('\n🎉 MongoDB est prêt !');
    console.log('\n📋 Prochaines étapes :');
    console.log('1. npm run seed    # Initialiser les données');
    console.log('2. npm run dev     # Démarrer l\'API');
    console.log('3. Accéder au panel sur http://localhost:3001');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('\n🔧 Solutions possibles :');
    console.log('1. Vérifiez que MongoDB est démarré');
    console.log('2. Vérifiez l\'URI dans le fichier .env');
    console.log('3. Vérifiez les paramètres d\'authentification');
  }
}

// Démarrer le script
setupMongoDB();