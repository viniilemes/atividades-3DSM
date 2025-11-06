import mongoose from "mongoose";

// A URI aponta para o banco de dados 'bdexer02'
const uri = "mongodb://127.0.0.1:27017/bdexer02";

export default function connect() {
  // ... (código de conexão idêntico ao Exemplo 1, apenas mudando a URI) ...
  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then(() => console.log("Conectado ao MongoDB (bdexer02)"))
    .catch((e) => {
      console.error("Erro ao conectar ao MongoDB:", e.message);
    });
  // ...
}