# bdexer01

Projeto exemplo em TypeScript usando Express e Mongoose (MongoDB).

## Pré-requisitos

- Node.js (>= 14) e npm instalados
- MongoDB rodando localmente ou uma URI MongoDB válida (Atlas)

## Instalação

Abra o terminal (cmd.EXE) na pasta `bdexer01` e execute:

```cmd
cd /d c:\Users\Vinicius\Documents\Fatec\Semestre_03\Des_Web_3\atividades\atividade-git\tec-prog\conexao-mongodb\bdexer01
npm install
```

## Variáveis de ambiente

O projeto usa `dotenv`. Por padrão `src/models/connection.ts` usa a URI `mongodb://127.0.0.1:27017/bdexer01`.
Se quiser usar uma URI diferente, crie um arquivo `.env` na raiz com:

```
PORT=3001
MONGO_URI=mongodb://usuario:senha@host:porta/nomeDoBanco
```

E então altere `src/models/connection.ts` para ler `process.env.MONGO_URI` ou me peça para fazer isso automaticamente.

## Scripts úteis

- `npm run dev` — executa o projeto em modo desenvolvimento (recarrega quando salvar). Requer `ts-node-dev`.
- `npm run build` — compila TypeScript para `dist/`.
- `npm start` — executa a versão compilada em `dist/`.

Exemplo (modo dev):

```cmd
npm run dev
```

Exemplo (build + start):

```cmd
npm run build
npm start
```

## Endpoints (exemplos criados)

- GET /person → { message: "Lista de pessoas" }
- GET /car → { message: "Lista de carros" }
- GET /phone → { message: "Lista de telefones" }
- GET /carbyperson → { message: "Carros por pessoa" }

## Observações

- Certifique-se que o MongoDB esteja acessível na URI usada.
- Se quiser, eu posso:
  - atualizar `connection.ts` para usar `process.env.MONGO_URI` automaticamente;
  - adicionar endpoints POST/PUT/DELETE com exemplos de uso dos models.
