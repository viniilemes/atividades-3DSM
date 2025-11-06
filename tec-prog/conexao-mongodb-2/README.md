# Conexao MongoDB - Projeto de Exemplo

Este repositório contém um pequeno projeto em TypeScript que demonstra uma conexão com MongoDB usando Mongoose e um servidor Express.

## Resumo
Projeto de exemplo para aula/prática de conexão com MongoDB. O projeto usa TypeScript, Express e Mongoose. Arquitetura simples com controllers e models na pasta `bdexer02/src`.

## Requisitos
- Node.js (v16+ recomendado)
- npm
- MongoDB (URI de conexão — Atlas ou local)

## Instalação
1. Clone o repositório.
2. No diretório do projeto, instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz com as variáveis necessárias (exemplo abaixo).

## Variáveis de ambiente
Crie um `.env` com, pelo menos, as seguintes variáveis:

```
MONGO_URI=mongodb+srv://usuario:senha@cluster.exemplo.mongodb.net/nomeDoBanco
PORT=3000
```

A aplicação espera que a conexão com o MongoDB seja lida a partir de `process.env.MONGO_URI`.

## Scripts úteis
- `npm run dev` — inicia em modo de desenvolvimento usando `ts-node-dev` (hot-reload)
- `npm start` — inicia com `ts-node` (para executar o código TypeScript diretamente)

Esses scripts já estão definidos no `package.json`.

## Estrutura do projeto (resumo)
- `bdexer02/src/controllers` — controllers (ex.: `CityController.ts`, `StateController.ts`)
- `bdexer02/src/models` — configuração de conexão e modelos Mongoose
- `bdexer02/src/soutes` — rotas (parece haver um pequeno erro de digitação em `soutes` — considere renomear para `routes` se decidir padronizar)

## Como executar
1. Preencha o `.env` com a string de conexão para o MongoDB.
2. Rodar em desenvolvimento:

```bash
npm run dev
```

3. Abra o navegador ou use o Postman para acessar as rotas expostas (consulte os controllers para rotas disponíveis).

## Observações e dicas
- Caso seja usado o MongoDB Atlas, verifique as permissões de IP (whitelist) e credenciais.
- Se quiser compilar para JavaScript, adicione um script de build que use `tsc` e gere para uma pasta `dist`.
- Considere renomear a pasta `soutes` para `routes` para evitar confusão.

## Contato
Projeto criado para fins didáticos.
