const mongoose = require("mongoose");
// Carrega variáveis de ambiente (se existir .env)
require('dotenv').config();

// Preferir variável de ambiente MONGO_URI; manter fallback para compatibilidade local
const uri = process.env.MONGO_URI || "mongodb://devAluno:aluno123@127.0.0.1:27017/estacao_meteorologica?authSource=admin";

// --- Captura de logs de conexão --- 
mongoose.connection.on("connected", () => console.log("LOG: Banco conectado."));
mongoose.connection.on("error", err => console.error("LOG: Erro de conexão:", err));
mongoose.connection.on("disconnected", () => console.log("LOG: Banco desconectado."));
// -----------------------------------

console.log("Tentando conectar...", process.env.MONGO_URI ? "(usando MONGO_URI)" : "(usando URI de fallback)");
mongoose.connect(uri)
  .then(() => {
    console.log("Conexão principal estabelecida com sucesso.");
    
    // Desconectar após 5 segundos para testar o log 'disconnected'
    setTimeout(() => {
      mongoose.disconnect();
    }, 5000);
  })
  .catch(err => {
    console.error("Falha na conexão principal:", err.message);
  });