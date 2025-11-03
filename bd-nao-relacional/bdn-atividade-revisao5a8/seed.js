const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'RedeGames';

async function run() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Conectado ao MongoDB (seed)');
    const db = client.db(dbName);
    const produtos = db.collection('produtos');

    const docs = [
      { nome: 'Jogo A', preco: 59.9 },
      { nome: 'Jogo B', preco: 79.9 },
      { nome: 'Controle X', preco: 129.5 },
      { nome: 'Headset Y', preco: 199.0 },
      { nome: 'Camiseta Z', preco: 39.9 }
    ];

    const result = await produtos.insertMany(docs);
    console.log(`Inseridos ${result.insertedCount} documentos em ${dbName}.produtos`);
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
  } finally {
    await client.close();
  }
}

run();
