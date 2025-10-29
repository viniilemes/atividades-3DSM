const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Importando o cors 

const app = express();
app.use(express.json()); // Permite que o servidor entenda JSON
app.use(cors()); // Permite que a API seja acessada de outras origens

// 1. Conexão com o MongoDB
// Usar underscore para manter consistência com testes anteriores
const MONGO_URI = "mongodb://127.0.0.1:27017/api_games";

// Middleware para logar o estado da conexão do mongoose em cada requisição
app.use((req, res, next) => {
  console.log(`Request ${req.method} ${req.url} - mongoose.readyState=${mongoose.connection.readyState}`);
  next();
});

// 2. Importar as rotas (vamos registrar após conectar)
const jogoRoutes = require("./src/routes/jogos");

// 3. Iniciar o servidor APÓS estabelecer conexão com o MongoDB
const PORTA = 3000;
(async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log("Conectado ao MongoDB (api_games)");

    // listeners para estado (já existentes, mas mantemos)
    mongoose.connection.on('connected', () => console.log('Mongoose conectado'));
    mongoose.connection.on('error', err => console.error('Mongoose connection error:', err));
    mongoose.connection.on('disconnected', () => console.warn('Mongoose desconectado'));

    // Registrar rotas depois da conexão
    app.use("/jogos", jogoRoutes);

    app.listen(PORTA, () => {
      console.log(`Servidor rodando na porta ${PORTA}`);
    });
  } catch (err) {
    console.error('Erro ao conectar e iniciar servidor:', err);
    process.exit(1);
  }
})();