const mongoose = require("mongoose");
// Carrega variáveis de ambiente (se existir .env)
require('dotenv').config();

// String de conexão preferencialmente pela variável de ambiente MONGO_URI.
// Se não definida, usa a URI hardcoded como fallback (compatibilidade com o projeto atual).
// Nota: evite commitar credenciais em produção — use .env ou gerenciadores de segredos.
const uri = process.env.MONGO_URI || "mongodb://devAluno:aluno123@127.0.0.1:27017/estacao_meteorologica?authSource=admin";

const usingEnv = !!process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log(`Sucesso: Conectado ${usingEnv ? "(usando MONGO_URI)" : "(usando URI de fallback)"}.`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Erro ao conectar:", err.message);
  });