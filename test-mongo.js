const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("DATABASE_URL is undefined");
    return;
  }
  console.log("Tentando conectar com o driver oficial...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conectado com sucesso ao MongoDB Atlas!");
    
    // Tenta pingar o banco para forçar a autenticação
    const db = client.db("portoframe_prod");
    await db.command({ ping: 1 });
    console.log("Ping bem sucedido!");
    
  } catch (error) {
    console.error("====== EXCEÇÃO CAPTURADA ======");
    console.error("error.code:", error.code);
    console.error("error.message:", error.message);
    console.error("error.cause:", error.cause);
    console.error("error.stack:", error.stack);
    console.error("===============================");
  } finally {
    await client.close();
  }
}

main();
