const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// 2. Configure sua string de conexão do MongoDB
const url = 'mongodb://localhost:27017'; // String de conexão padrão
const client = new MongoClient(url);
// Usar o banco/coleção criado por você: `RedeGames` com a collection `produtos`.
// Se preferir outro nome, ajuste aqui.
const dbName = 'RedeGames';

let db;

// 3. Conectar ao banco de dados
async function connectDB() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB');
        db = client.db(dbName);
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB', err);
        process.exit(1);
    }
}

// 4. Criar a rota solicitada 
app.get('/produtos', async (req, res) => {
    if (!db) {
        return res.status(500).send('Servidor não está pronto');
    }

    try {
    // Usar a collection `produtos` dentro do DB `RedeGames` (conforme você criou)
    const produtos = await db.collection('produtos')
            .find()
            .project({ // Seleciona apenas nome e preço
                _id: 0, // Exclui o _id
                nome: 1,  // Inclui o nome
                preco: 1  // Inclui o preço
            })
            .limit(5) // Limita a 5 resultados
            .toArray();
            
        res.json(produtos);

    } catch (err) {
        console.error('Erro ao buscar produtos', err);
        res.status(500).send('Erro ao buscar produtos');
    }
});

// 5. Iniciar o servidor
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        console.log(`Acesse http://localhost:${port}/produtos para ver o resultado`);
    });
});