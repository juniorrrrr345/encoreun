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

// Fonction pour lister tous les utilisateurs
const listUsers = async () => {
  try {
    const users = await User.find({}).select('-password');
    
    if (users.length === 0) {
      console.log('📭 Aucun utilisateur trouvé');
      return;
    }
    
    console.log('\n👥 LISTE DES UTILISATEURS');
    console.log('==========================\n');
    
    users.forEach((user, index) => {
      const status = user.isActive ? '✅ Actif' : '❌ Inactif';
      const role = user.role === 'admin' ? '👑 Admin' : '👤 Manager';
      
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👤 Rôle: ${role}`);
      console.log(`   📊 Statut: ${status}`);
      console.log(`   📅 Créé le: ${user.createdAt.toLocaleDateString('fr-FR')}`);
      if (user.lastLogin) {
        console.log(`   🔄 Dernière connexion: ${user.lastLogin.toLocaleDateString('fr-FR')}`);
      }
      console.log('');
    });
    
    return users;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs:', error.message);
    return [];
  }
};

// Fonction pour modifier un utilisateur
const modifyUser = async (users) => {
  if (users.length === 0) {
    console.log('❌ Aucun utilisateur à modifier');
    return;
  }
  
  console.log('\n🔧 MODIFICATION D\'UN UTILISATEUR');
  console.log('================================\n');
  
  const userIndex = await askQuestion(`Choisissez un utilisateur (1-${users.length}): `);
  const selectedUser = users[parseInt(userIndex) - 1];
  
  if (!selectedUser) {
    console.log('❌ Utilisateur invalide');
    return;
  }
  
  console.log(`\n👤 Modification de: ${selectedUser.name} (${selectedUser.email})`);
  
  const action = await askQuestion('\nQue souhaitez-vous modifier ?\n1. Nom\n2. Email\n3. Rôle\n4. Statut (actif/inactif)\n5. Réinitialiser le mot de passe\nVotre choix: ');
  
  try {
    const user = await User.findById(selectedUser._id);
    
    switch (action) {
      case '1':
        const newName = await askQuestion('Nouveau nom: ');
        if (newName.trim()) {
          user.name = newName.trim();
        }
        break;
        
      case '2':
        const newEmail = await askQuestion('Nouvel email: ');
        if (newEmail.trim()) {
          const emailExists = await User.findOne({ email: newEmail.trim(), _id: { $ne: user._id } });
          if (emailExists) {
            console.log('❌ Cet email est déjà utilisé');
            return;
          }
          user.email = newEmail.trim().toLowerCase();
        }
        break;
        
      case '3':
        console.log('Rôles disponibles:');
        console.log('1. admin (accès complet)');
        console.log('2. manager (gestion limitée)');
        const roleChoice = await askQuestion('Nouveau rôle (1 ou 2): ');
        user.role = roleChoice === '2' ? 'manager' : 'admin';
        break;
        
      case '4':
        const statusChoice = await askQuestion('Nouveau statut (1: actif, 2: inactif): ');
        user.isActive = statusChoice === '1';
        break;
        
      case '5':
        const newPassword = await askQuestion('Nouveau mot de passe (min 6 caractères): ');
        if (newPassword.length >= 6) {
          user.password = newPassword;
          console.log('✅ Mot de passe mis à jour');
        } else {
          console.log('❌ Le mot de passe doit contenir au moins 6 caractères');
          return;
        }
        break;
        
      default:
        console.log('❌ Choix invalide');
        return;
    }
    
    await user.save();
    console.log('✅ Utilisateur mis à jour avec succès');
    
  } catch (error) {
    console.error('❌ Erreur lors de la modification:', error.message);
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (users) => {
  if (users.length === 0) {
    console.log('❌ Aucun utilisateur à supprimer');
    return;
  }
  
  console.log('\n🗑️  SUPPRESSION D\'UN UTILISATEUR');
  console.log('===============================\n');
  
  const userIndex = await askQuestion(`Choisissez un utilisateur à supprimer (1-${users.length}): `);
  const selectedUser = users[parseInt(userIndex) - 1];
  
  if (!selectedUser) {
    console.log('❌ Utilisateur invalide');
    return;
  }
  
  console.log(`\n⚠️  Vous êtes sur le point de supprimer: ${selectedUser.name} (${selectedUser.email})`);
  const confirm = await askQuestion('Êtes-vous sûr ? (oui/non): ');
  
  if (confirm.toLowerCase() !== 'oui' && confirm.toLowerCase() !== 'o') {
    console.log('❌ Suppression annulée');
    return;
  }
  
  try {
    await User.findByIdAndDelete(selectedUser._id);
    console.log('✅ Utilisateur supprimé avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error.message);
  }
};

// Fonction pour afficher les statistiques
const showStats = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const managerUsers = await User.countDocuments({ role: 'manager' });
    
    console.log('\n📊 STATISTIQUES DES UTILISATEURS');
    console.log('================================\n');
    console.log(`👥 Total: ${totalUsers}`);
    console.log(`✅ Actifs: ${activeUsers}`);
    console.log(`❌ Inactifs: ${totalUsers - activeUsers}`);
    console.log(`👑 Admins: ${adminUsers}`);
    console.log(`👤 Managers: ${managerUsers}`);
    console.log('');
  } catch (error) {
    console.error('❌ Erreur lors du calcul des statistiques:', error.message);
  }
};

// Menu principal
const showMenu = () => {
  console.log('\n🔧 GESTION DES UTILISATEURS ADMIN');
  console.log('==================================\n');
  console.log('1. 📋 Lister tous les utilisateurs');
  console.log('2. 🔧 Modifier un utilisateur');
  console.log('3. 🗑️  Supprimer un utilisateur');
  console.log('4. 📊 Afficher les statistiques');
  console.log('5. 🚪 Quitter');
  console.log('');
};

// Fonction principale
const main = async () => {
  console.log('🚀 Gestionnaire d\'utilisateurs administrateur\n');
  
  try {
    await connectDB();
    
    let running = true;
    
    while (running) {
      showMenu();
      const choice = await askQuestion('Votre choix (1-5): ');
      
      switch (choice) {
        case '1':
          await listUsers();
          break;
          
        case '2':
          const usersForModify = await listUsers();
          if (usersForModify && usersForModify.length > 0) {
            await modifyUser(usersForModify);
          }
          break;
          
        case '3':
          const usersForDelete = await listUsers();
          if (usersForDelete && usersForDelete.length > 0) {
            await deleteUser(usersForDelete);
          }
          break;
          
        case '4':
          await showStats();
          break;
          
        case '5':
          running = false;
          console.log('👋 Au revoir !');
          break;
          
        default:
          console.log('❌ Choix invalide');
      }
      
      if (running) {
        await askQuestion('\nAppuyez sur Entrée pour continuer...');
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📦 Connexion MongoDB fermée');
    rl.close();
    process.exit(0);
  }
};

// Exécuter le script
main();