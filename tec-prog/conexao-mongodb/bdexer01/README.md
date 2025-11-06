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

O projeto usa `dotenv`. Para evitar expor segredos no repositório, criamos um arquivo de exemplo chamado `.env.example` com as chaves esperadas (sem valores). Nunca comite o arquivo `.env` com valores reais.

Copie `.env.example` para `.env` e preencha os valores locais:

- No Windows (cmd.exe):

```cmd
copy .env.example .env
```

- No Unix/macOS:

```sh
cp .env.example .env
```

O arquivo `.env.example` contém (exemplo):

```
PORT=3001
MONGO_URI=
JWT_SECRET=
```

No código (por exemplo em `src/models/connection.ts`) você deve ler a URI do Mongo a partir de `process.env.MONGO_URI`. Se quiser, eu posso atualizar `connection.ts` para usar `process.env.MONGO_URI` automaticamente.

Se você já comitou um arquivo `.env` com segredos, remova-o do repositório (mantendo local) e envie a alteração:

```cmd
git rm --cached .env
git commit -m "Remover .env do repositório"
git push
```

Além disso, rotacione (troque) quaisquer credenciais possivelmente comprometidas.

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
