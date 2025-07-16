const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  console.log('🔍 Test de connexion MongoDB Atlas...');
  console.log('📡 URI:', uri.replace(/:[^:@]+@/, ':****@'));
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connexion réussie !');
    
    // Test d'une opération simple
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('📊 Collections trouvées:', collections.length);
    
    await client.close();
    console.log('🔌 Connexion fermée');
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n💡 Solutions possibles:');
      console.log('1. Vérifier le mot de passe dans MongoDB Atlas');
      console.log('2. Vérifier que l\'utilisateur a les bonnes permissions');
      console.log('3. Vérifier que ton IP est autorisée dans Network Access');
    }
  }
}

testConnection();