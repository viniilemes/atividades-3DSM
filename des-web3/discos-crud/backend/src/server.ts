import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import discoRoutes from './routes/disco.routes.js';

const app = express();
const PORT = 3000;

// 1. Conectar ao MongoDB
connectDB();

// 2. Middlewares
app.use(cors()); // Permite requisições de origens diferentes (do frontend)
app.use(express.json()); // Permite que o Express entenda JSON

// 3. Rotas da API
app.use('/api', discoRoutes); // Prefixo /api para todas as rotas

// 4. Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});