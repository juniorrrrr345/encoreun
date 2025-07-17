require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://Junior:UARypMbzrcr3Qlpf@cluster0.tj6hxtb.mongodb.net/boutique-admin?retryWrites=true&w=majority&appName=Cluster0";

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
    
  } catch (error) {
    console.error("❌ Erreur de connexion:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("🔌 Connexion fermée");
  }
}

run().catch(console.dir);