# api-games

API simples para gerenciar jogos - projeto de aula (Fatec, disciplina de Desenvolvimento Web 3).

Stack
- Node.js
- Express
- MongoDB (Mongoose)

Status
- Servidor: OK (iniciar com `npm run dev`)
- Banco: MongoDB local (uri padrão `mongodb://127.0.0.1:27017/api_games`)

Pré-requisitos
- Node.js 18+ instalado
- MongoDB instalado e em execução (mongod)

Instalação
1. Clone este repositório e entre na pasta do projeto:

```cmd
cd \path\to\api-games
```

2. Instale dependências:

```cmd
npm install
```

Scripts úteis
- `npm run dev` — inicia o servidor em modo desenvolvimento com `nodemon` (reinício automático)
- `npm start` — inicia com `node server.js`

Como rodar
1. Certifique-se que o MongoDB está rodando localmente. No Windows (CMD) você pode conferir:

```cmd
sc query MongoDB
```

Se o serviço não existir, inicie `mongod` manualmente (exemplo):

```cmd
"C:\Program Files\MongoDB\Server\<versao>\bin\mongod.exe" --dbpath "C:\data\db"
```

2. Na raiz do projeto:

```cmd
npm run dev
```

3. Acesse os endpoints via Insomnia, Postman ou curl:

- GET /jogos — lista todos os jogos
- POST /jogos — cria um jogo
  Body (JSON):
  {
    "nome": "Jogo Exemplo",
    "categoria": "Ação",
    "preco": 59.9,
    "estoque": 10
  }
- PUT /jogos/:id — atualiza por id
- DELETE /jogos/:id — remove por id

Exemplo curl (Windows):

```cmd
curl -i http://localhost:3000/jogos
```

Model (camada de dados)
Arquivo: `src/models/Jogo.js`
Campos principais:
- nome: String (required)
- categoria: String (required)
- preco: Number (required)
- estoque: Number (required)
- dataCriacao: Date (default: now)

Rotas
Arquivo: `src/routes/jogos.js`
- Implementa as 4 rotas básicas (GET, POST, PUT, DELETE) usando o modelo `Jogo`.

Troubleshooting (erros comuns)
- Erro: `Operation \`jogos.find()\` buffering timed out after 10000ms`
  - Causa comum: sua aplicação chamou métodos do Mongoose antes da conexão estar pronta, ou (mais raramente) houve múltiplas cópias de `mongoose` carregadas. Neste projeto especificamente havia uma cópia extra em `src/node_modules` que fazia com que o modelo usasse uma instância diferente da que chamou `connect()` — o problema foi corrigido.
  - Solução: garanta que o servidor só seja iniciado após `mongoose.connect()` (implementado aqui). Verifique também se existe apenas uma cópia de `mongoose` em `./node_modules` (execute `npm ls mongoose`).

- Erro: `mongo` ou `mongosh` não reconhecido
  - O cliente shell (`mongo`/`mongosh`) pode não estar no PATH do Windows. Use o caminho completo para o executável dentro da instalação do MongoDB ou abra o serviço como indicado acima.

Notas de desenvolvimento
- O servidor foi alterado para iniciar apenas após a conexão com o MongoDB ser estabelecida.
- Existe um middleware de debug que imprime `mongoose.connection.readyState` em cada requisição — útil para diagnóstico. Se preferir um console mais limpo, remova esse middleware em `server.js`.

Próximos passos sugeridos
- Adicionar validação mais robusta de entrada (celebrate/Joi ou express-validator).
- Adicionar testes automatizados (jest/supertest) para as rotas.
- Adicionar variáveis de ambiente (usar `dotenv`) para não hardcodear a URI do Mongo.


