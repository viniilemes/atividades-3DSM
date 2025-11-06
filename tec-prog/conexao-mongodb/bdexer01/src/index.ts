import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./models/connection";

dotenv.config();

// Define a porta pela variável de ambiente ou usa 3001 
const PORT = process.env.PORT || 3001;
const app = express(); // Cria o servidor 

// Suporte a JSON no body da requisição
app.use(express.json());

// Conecta ao MongoDB
connect();

// Inicializa o servidor na porta 
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

// Define as rotas da aplicação
app.use(routes);