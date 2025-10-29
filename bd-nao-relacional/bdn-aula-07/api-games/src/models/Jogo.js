
const mongoose = require("mongoose");

// Definindo o Schema (baseado no exemplo da aula) 
// Os campos são os pedidos na atividade 
const jogoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  estoque: { type: Number, required: true },
  dataCriacao: { type: Date, default: Date.now } // Campo extra (boa prática)
});

// Exporta o modelo para ser usado pelas rotas
module.exports = mongoose.model("Jogo", jogoSchema);