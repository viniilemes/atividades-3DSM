import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import eventoRoutes from './routes/eventoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string || 'mongodb://localhost:27017/evento';

app.use(express.json());

// Servir frontend estático (pasta `frontend` na raiz do projeto)
app.use(express.static(path.join(__dirname, '../frontend')));

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');

    app.use('/api', eventoRoutes);

    // Para aplicações SPA ou acessos diretos, servir o index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro: any) => {
    console.error('❌ Erro na conexão com o MongoDB:', erro.message);
    process.exit(1);
  });
