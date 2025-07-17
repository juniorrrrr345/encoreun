const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Junior30:XRdu6jSVJLHKRZXc@junior.qykqkut.mongodb.net/boutique-admin?retryWrites=true&w=majority&appName=Junior";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log('🔌 Tentative de connexion à MongoDB Atlas...');
    console.log('📡 URI:', uri.replace(/\/\/.*@/, '//***:***@'));
    
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");
    
    // Test de création d'une base de données
    const db = client.db("boutique-admin");
    console.log("✅ Base de données 'boutique-admin' accessible");
    
    // Test de création d'une collection
    const collection = db.collection("test");
    await collection.insertOne({ test: "connection", timestamp: new Date() });
    console.log("✅ Collection créée et document inséré avec succès");
    
    // Nettoyer le document de test
    await collection.deleteOne({ test: "connection" });
    console.log("✅ Document de test supprimé");
    
    console.log("\n🎉 Connexion MongoDB réussie !");
    console.log("🚀 Le système peut maintenant utiliser MongoDB Atlas");
    
  } catch (error) {
    console.error("❌ Erreur de connexion:", error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n🔍 Diagnostic d\'authentification:');
      console.log('1. Vérifiez le nom d\'utilisateur: Junior30');
      console.log('2. Vérifiez le mot de passe dans l\'URL');
      console.log('3. Assurez-vous que l\'utilisateur a les permissions de lecture/écriture');
      console.log('4. Vérifiez que l\'IP est autorisée dans MongoDB Atlas');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🔍 Diagnostic réseau:');
      console.log('1. Vérifiez que le nom du cluster est correct: junior.qykqkut.mongodb.net');
      console.log('2. Vérifiez votre connexion internet');
    }
    
    console.log('\n⚠️  Le système continuera avec les données en mémoire');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("🔌 Connexion fermée");
  }
}

run().catch(console.dir);