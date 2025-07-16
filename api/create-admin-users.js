require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const crypto = require('crypto');

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

// Fonction pour générer un mot de passe sécurisé
const generateSecurePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

// Fonction pour générer un email admin
const generateAdminEmail = (name) => {
  const cleanName = name.toLowerCase().replace(/\s+/g, '.');
  return `${cleanName}@boutique.com`;
};

// Données des administrateurs à créer
const adminUsers = [
  {
    name: 'Super Administrateur',
    email: 'superadmin@boutique.com',
    role: 'admin',
    description: 'Accès complet à toutes les fonctionnalités'
  },
  {
    name: 'Manager Principal',
    email: 'manager@boutique.com',
    role: 'manager',
    description: 'Gestion des produits et commandes'
  },
  {
    name: 'Admin Support',
    email: 'support@boutique.com',
    role: 'admin',
    description: 'Support client et gestion des utilisateurs'
  },
  {
    name: 'Admin Marketing',
    email: 'marketing@boutique.com',
    role: 'manager',
    description: 'Gestion des promotions et du marketing'
  }
];

// Fonction pour créer un utilisateur admin
const createAdminUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    
    if (existingUser) {
      console.log(`ℹ️  L'utilisateur ${userData.email} existe déjà`);
      return null;
    }

    const password = generateSecurePassword();
    
    const admin = new User({
      name: userData.name,
      email: userData.email,
      password: password,
      role: userData.role,
      isActive: true
    });
    
    await admin.save();
    
    return {
      ...userData,
      password: password
    };
  } catch (error) {
    console.error(`❌ Erreur lors de la création de ${userData.email}:`, error.message);
    return null;
  }
};

// Fonction pour afficher les identifiants de manière sécurisée
const displayCredentials = (users) => {
  console.log('\n🔐 IDENTIFIANTS ADMINISTRATEUR CRÉÉS');
  console.log('=====================================\n');
  
  users.forEach((user, index) => {
    if (user) {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔑 Mot de passe: ${user.password}`);
      console.log(`   👤 Rôle: ${user.role}`);
      console.log(`   📝 Description: ${user.description}`);
      console.log('');
    }
  });
  
  console.log('⚠️  IMPORTANT:');
  console.log('- Changez ces mots de passe après la première connexion');
  console.log('- Stockez ces identifiants de manière sécurisée');
  console.log('- Ne partagez pas ces informations publiquement');
  console.log('');
};

// Fonction pour créer un fichier de sauvegarde sécurisé
const createCredentialsFile = (users) => {
  const fs = require('fs');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `admin-credentials-${timestamp}.txt`;
  
  let content = 'IDENTIFIANTS ADMINISTRATEUR - BOUTIQUE E-COMMERCE\n';
  content += '==================================================\n\n';
  content += `Date de création: ${new Date().toLocaleString('fr-FR')}\n\n`;
  
  users.forEach((user, index) => {
    if (user) {
      content += `${index + 1}. ${user.name}\n`;
      content += `   Email: ${user.email}\n`;
      content += `   Mot de passe: ${user.password}\n`;
      content += `   Rôle: ${user.role}\n`;
      content += `   Description: ${user.description}\n\n`;
    }
  });
  
  content += '⚠️  AVERTISSEMENTS:\n';
  content += '- Changez ces mots de passe après la première connexion\n';
  content += '- Stockez ce fichier de manière sécurisée\n';
  content += '- Ne partagez pas ces informations publiquement\n';
  content += '- Supprimez ce fichier après avoir noté les identifiants\n';
  
  try {
    fs.writeFileSync(filename, content);
    console.log(`💾 Fichier de sauvegarde créé: ${filename}`);
  } catch (error) {
    console.error('❌ Erreur lors de la création du fichier:', error.message);
  }
};

// Fonction principale
const main = async () => {
  console.log('🚀 Création des identifiants administrateur...\n');
  
  try {
    await connectDB();
    
    const createdUsers = [];
    
    for (const userData of adminUsers) {
      const createdUser = await createAdminUser(userData);
      if (createdUser) {
        createdUsers.push(createdUser);
        console.log(`✅ Utilisateur ${createdUser.name} créé avec succès`);
      }
    }
    
    if (createdUsers.length > 0) {
      displayCredentials(createdUsers);
      createCredentialsFile(createdUsers);
      
      console.log('🎉 Création terminée avec succès !');
      console.log(`📊 ${createdUsers.length} utilisateur(s) admin créé(s)`);
    } else {
      console.log('ℹ️  Tous les utilisateurs admin existent déjà');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📦 Connexion MongoDB fermée');
    process.exit(0);
  }
};

// Exécuter le script
main();