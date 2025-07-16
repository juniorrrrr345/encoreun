import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour lire récursivement tous les fichiers .jsx
function findJsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findJsxFiles(fullPath));
    } else if (item.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Fonction pour corriger les imports dans un fichier
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Regex pour trouver les imports avec .jsx
  const importRegex = /import\s+.*\s+from\s+['"]([^'"]+\.jsx)['"]/g;
  
  content = content.replace(importRegex, (match, importPath) => {
    const newPath = importPath.replace('.jsx', '');
    modified = true;
    console.log(`🔧 Corrigé: ${importPath} → ${newPath} dans ${filePath}`);
    return match.replace(importPath, newPath);
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Fonction principale
function main() {
  console.log('🔍 Vérification des imports .jsx...\n');
  
  const srcDir = path.join(__dirname, 'src');
  const jsxFiles = findJsxFiles(srcDir);
  
  console.log(`📁 Trouvé ${jsxFiles.length} fichiers .jsx\n`);
  
  let fixedFiles = 0;
  
  for (const file of jsxFiles) {
    if (fixImportsInFile(file)) {
      fixedFiles++;
    }
  }
  
  console.log(`\n✅ Correction terminée !`);
  console.log(`📊 ${fixedFiles} fichier(s) modifié(s)`);
  
  if (fixedFiles > 0) {
    console.log('\n🚀 Vous pouvez maintenant relancer le build :');
    console.log('npm run build');
  } else {
    console.log('\n✨ Aucune correction nécessaire, tous les imports sont corrects !');
  }
}

// Exécuter le script
main();