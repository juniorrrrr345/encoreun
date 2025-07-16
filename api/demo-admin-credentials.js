const crypto = require('crypto');

// Fonction pour générer un mot de passe sécurisé
const generateSecurePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
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

// Fonction pour afficher les identifiants de manière sécurisée
const displayCredentials = (users) => {
  console.log('\n🔐 IDENTIFIANTS ADMINISTRATEUR CRÉÉS');
  console.log('=====================================\n');
  
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name}`);
    console.log(`   📧 Email: ${user.email}`);
    console.log(`   🔑 Mot de passe: ${user.password}`);
    console.log(`   👤 Rôle: ${user.role}`);
    console.log(`   📝 Description: ${user.description}`);
    console.log('');
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
    content += `${index + 1}. ${user.name}\n`;
    content += `   Email: ${user.email}\n`;
    content += `   Mot de passe: ${user.password}\n`;
    content += `   Rôle: ${user.role}\n`;
    content += `   Description: ${user.description}\n\n`;
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
const main = () => {
  console.log('🚀 Création des identifiants administrateur (DÉMONSTRATION)\n');
  
  const createdUsers = [];
  
  for (const userData of adminUsers) {
    const password = generateSecurePassword();
    const user = {
      ...userData,
      password: password
    };
    createdUsers.push(user);
    console.log(`✅ Utilisateur ${user.name} préparé`);
  }
  
  displayCredentials(createdUsers);
  createCredentialsFile(createdUsers);
  
  console.log('🎉 Démonstration terminée avec succès !');
  console.log(`📊 ${createdUsers.length} utilisateur(s) admin préparé(s)`);
  console.log('\n📝 Note: Ceci est une démonstration.');
  console.log('Pour créer de vrais utilisateurs, configurez MongoDB et utilisez:');
  console.log('npm run create-admin');
};

// Exécuter le script
main();