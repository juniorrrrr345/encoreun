const axios = require('axios');

async function checkSystem() {
  console.log('🔍 Vérification du système e-commerce...\n');

  // Vérifier le backend
  try {
    console.log('📡 Vérification du backend...');
    const backendResponse = await axios.get('http://localhost:5000/api/products');
    console.log('✅ Backend fonctionnel -', backendResponse.data.products?.length || 0, 'produits trouvés');
  } catch (error) {
    console.log('❌ Backend non accessible:', error.message);
  }

  // Vérifier les ports
  const ports = [
    { name: 'Boutique Frontend', port: 5173 },
    { name: 'Admin Panel', port: 5174 },
    { name: 'Backend API', port: 5000 }
  ];

  console.log('\n🌐 Vérification des ports:');
  for (const service of ports) {
    try {
      await axios.get(`http://localhost:${service.port}`, { timeout: 2000 });
      console.log(`✅ ${service.name} - http://localhost:${service.port}`);
    } catch (error) {
      console.log(`❌ ${service.name} - Port ${service.port} non accessible`);
    }
  }

  console.log('\n📋 Résumé du système:');
  console.log('• Boutique: Interface client en noir et blanc');
  console.log('• Admin Panel: Gestion des produits avec ajout automatique');
  console.log('• Backend: API REST avec MongoDB Atlas');
  console.log('• Fonctionnalités: Suppression permanente, génération de descriptions');
  
  console.log('\n🎯 URLs d\'accès:');
  console.log('• Boutique: http://localhost:5173');
  console.log('• Admin Panel: http://localhost:5174');
  console.log('• API: http://localhost:5000/api');
}

checkSystem().catch(console.error);