const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage de l\'API avec données de test...');

// Fonction pour exécuter une commande
const runCommand = (command, args, cwd) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Commande échouée avec le code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
};

// Fonction principale
const main = async () => {
  try {
    console.log('📦 Installation des dépendances...');
    await runCommand('npm', ['install'], path.join(__dirname));

    console.log('🌱 Ajout des données de test...');
    await runCommand('node', ['src/utils/seed-data.js'], path.join(__dirname));

    console.log('🚀 Démarrage du serveur...');
    await runCommand('npm', ['start'], path.join(__dirname));

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

// Démarrer si appelé directement
if (require.main === module) {
  main();
}