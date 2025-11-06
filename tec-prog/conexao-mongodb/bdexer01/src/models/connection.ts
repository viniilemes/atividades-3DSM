import mongoose from "mongoose";

// A URI aponta para o banco de dados 'bdexer01' no MongoDB rodando localmente
const uri = "mongodb://127.0.0.1:27017/bdexer01";

export default function connect() {
  // Configura os manipuladores de eventos (opcional, mas bom para debug) 
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));

  // Conecta ao MongoDB 
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then(() => console.log("Conectado ao MongoDB (bdexer01)"))
    .catch((e) => {
      console.error("Erro ao conectar ao MongoDB:", e.message);
    });

  // ... (Restante do código de 'connection.ts' do PDF, ex: process.on('SIGINT')) 
}