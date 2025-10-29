const mongoose = require("mongoose");

// Definindo o Schema para a coleção "jogos" 
const jogoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true },
  // Adicionando um timestamp, uma boa prática
  dataCriacao: { type: Date, default: Date.now }
});

/* Mongoose criará automaticamente a coleção "jogos" (no plural)
  a partir do modelo "Jogo"
*/
module.exports = mongoose.model("Jogo", jogoSchema);