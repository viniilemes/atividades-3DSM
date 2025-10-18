// Carregar variáveis de ambiente o mais cedo possível
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Verificar se a API_KEY foi carregada no processo (não imprimir a chave inteira por segurança)
const rawKey = process.env.API_KEY;
console.log('[app] API_KEY loaded:', rawKey ? `${rawKey.slice(0, 4)}...${rawKey.slice(-4)}` : 'undefined');

// Em ESM, __dirname e __filename não existem — derivamos a partir de import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos (HTML, CSS, JS do frontend)
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'views')));

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rotas da aplicação
app.use('/api', weatherRoutes);

// Rota principal para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});