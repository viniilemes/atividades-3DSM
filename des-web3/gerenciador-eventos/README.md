# Gerenciador de Eventos (Backend)

Projeto backend em TypeScript usando Express e MongoDB (Mongoose).

Instalação e execução:

1. Instalar dependências:

```powershell
npm install
```

2. Criar arquivo `.env` na raiz com o conteúdo (ou copiar de `.env.example`):

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/evento
```

3. Rodar em modo desenvolvimento (reinicia automaticamente nas mudanças):

```powershell
npm run dev
```

4. Compilar e iniciar:

```powershell
npm run build; npm start
```

Rotas principais:

- `POST /api/eventos` — criar evento
- `GET /api/eventos` — listar eventos (opcional: `?titulo=...`)
- `PUT /api/eventos/:id` — atualizar evento
- `DELETE /api/eventos/:id` — excluir evento
