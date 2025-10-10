const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load .env

const client = new MongoClient(process.env.MONGO_URI);

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

testConnection();