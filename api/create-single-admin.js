require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const readline = require('readline');

// Configuration de la connexion MongoDB
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

// Interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fonction pour poser une question
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Fonction pour générer un mot de passe sécurisé
const generateSecurePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Fonction pour valider un email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fonction pour créer un utilisateur admin
const createAdminUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      console.log(`❌ L'utilisateur ${userData.email} existe déjà`);
      return null;
    }

    const admin = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      isActive: true
    });
    
    await admin.save();
    
    return userData;
  } catch (error) {
    console.error(`❌ Erreur lors de la création:`, error.message);
    return null;
  }
};

// Fonction pour afficher les identifiants
const displayCredentials = (user) => {
  console.log('\n🔐 IDENTIFIANTS ADMINISTRATEUR CRÉÉ');
  console.log('===================================\n');
  console.log(`👤 Nom: ${user.name}`);
  console.log(`📧 Email: ${user.email}`);
  console.log(`🔑 Mot de passe: ${user.password}`);
  console.log(`👤 Rôle: ${user.role}`);
  console.log('');
  console.log('⚠️  IMPORTANT:');
  console.log('- Changez ce mot de passe après la première connexion');
  console.log('- Stockez ces identifiants de manière sécurisée');
  console.log('- Ne partagez pas ces informations publiquement');
  console.log('');
};

// Fonction principale interactive
const main = async () => {
  console.log('🚀 Création d\'un utilisateur administrateur\n');
  
  try {
    await connectDB();
    
    // Demander les informations de l'utilisateur
    const name = await askQuestion('👤 Nom complet de l\'administrateur: ');
    if (!name.trim()) {
      console.log('❌ Le nom est requis');
      rl.close();
      return;
    }
    
    let email = await askQuestion('📧 Email: ');
    if (!email.trim()) {
      console.log('❌ L\'email est requis');
      rl.close();
      return;
    }
    
    // Valider l'email
    if (!isValidEmail(email)) {
      console.log('❌ Format d\'email invalide');
      rl.close();
      return;
    }
    
    // Demander le rôle
    console.log('\n👤 Choisissez le rôle:');
    console.log('1. admin (accès complet)');
    console.log('2. manager (gestion limitée)');
    
    const roleChoice = await askQuestion('Votre choix (1 ou 2): ');
    const role = roleChoice === '2' ? 'manager' : 'admin';
    
    // Demander le mot de passe
    console.log('\n🔑 Options pour le mot de passe:');
    console.log('1. Générer automatiquement un mot de passe sécurisé');
    console.log('2. Saisir manuellement un mot de passe');
    
    const passwordChoice = await askQuestion('Votre choix (1 ou 2): ');
    
    let password;
    if (passwordChoice === '2') {
      password = await askQuestion('🔑 Mot de passe (min 6 caractères): ');
      if (password.length < 6) {
        console.log('❌ Le mot de passe doit contenir au moins 6 caractères');
        rl.close();
        return;
      }
    } else {
      password = generateSecurePassword();
      console.log(`🔑 Mot de passe généré: ${password}`);
    }
    
    // Confirmation
    console.log('\n📋 Récapitulatif:');
    console.log(`👤 Nom: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Rôle: ${role}`);
    console.log(`🔑 Mot de passe: ${password}`);
    
    const confirm = await askQuestion('\n✅ Confirmer la création ? (oui/non): ');
    
    if (confirm.toLowerCase() !== 'oui' && confirm.toLowerCase() !== 'o') {
      console.log('❌ Création annulée');
      rl.close();
      return;
    }
    
    // Créer l'utilisateur
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      role: role
    };
    
    const createdUser = await createAdminUser(userData);
    
    if (createdUser) {
      displayCredentials(createdUser);
      console.log('🎉 Utilisateur administrateur créé avec succès !');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📦 Connexion MongoDB fermée');
    rl.close();
    process.exit(0);
  }
};

// Exécuter le script
main();