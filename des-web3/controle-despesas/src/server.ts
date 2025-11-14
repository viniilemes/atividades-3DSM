import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import expenseRoutes from './routes/expenseRoutes';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS do frontend)
// Isso faz com que o 'index.html' seja servido na rota '/'
app.use(express.static(path.join(__dirname, 'views')));

// Rotas da API
app.use('/api/expenses', expenseRoutes);

// Conexão com MongoDB
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI não definida no arquivo .env');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Conectado ao MongoDB');
    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });