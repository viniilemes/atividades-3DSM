# Sistema de Ordem de Serviço

Este repositório contém um guia passo-a-passo para implementar um sistema de Ordem de Serviço em TypeScript com Express e MongoDB (Mongoose), seguindo a arquitetura MVC (Model, Controller, Routes).

**Resumo:** Projeto backend em TypeScript + Express + MongoDB para gerenciar ordens de serviço (CRUD), com estrutura mínima para adicionar um frontend simples de testes.

**Pré-requisitos:**
- **Node.js** (recomenda-se versão LTS)
- **MongoDB Community Server** rodando localmente (porta padrão `27017`)
- **VS Code** ou outro editor de sua preferência

**Estrutura sugerida do projeto**

```
src/
├─ models/
├─ controllers/
├─ routes/
└─ server.ts
public/
.env
package.json
tsconfig.json
```

**Passos rápidos — Inicializar projeto**

Abra um terminal (PowerShell) e execute os comandos abaixo:

```powershell
# Criar pasta do projeto e entrar nela
mkdir sistema-os; cd sistema-os

# Inicializar npm
npm init -y

# Instalar dependências de produção
npm install express mongoose dotenv cors

# Instalar dependências de desenvolvimento (TypeScript)
npm install typescript ts-node nodemon @types/node @types/express @types/mongoose @types/cors -D

# Inicializar TypeScript
npx tsc --init
```

No `package.json` adicione o script de desenvolvimento (exemplo):

```json
"scripts": {
  "dev": "nodemon src/server.ts"
}
```

**Arquivo `.env` (exemplo)**

```
MONGODB_URI=mongodb://localhost:27017/ordens_servico
PORT=3000
```

**Model (exemplo) — `src/models/OrdemServico.ts`**

Defina um esquema Mongoose com os campos necessários:

- `titulo` (string, obrigatório)
- `descricao` (string, obrigatório)
- `dataAbertura` (Date, default `Date.now`)
- `status` (enum: `aberta`, `em andamento`, `concluída`)
- `prioridade` (enum: `baixa`, `média`, `alta`)
- `responsavel` (string, opcional)
- `setorSolicitante` (string, obrigatório)
- `prazoEstimado` (Date, opcional)
- `valorServico` (number, obrigatório)

**Controller (exemplo) — `src/controllers/OrdemServicoController.ts`**

Implemente os métodos básicos do CRUD:

- `create(req, res)` — cria uma ordem
- `getAll(req, res)` — lista ordens com filtros (`status`, `prioridade`, `setor`)
- `update(req, res)` — atualiza por `id`
- `delete(req, res)` — remove por `id`

**Rotas (exemplo) — `src/routes/index.ts`**

```ts
router.post('/ordens', controller.create);
router.get('/ordens', controller.getAll);
router.put('/ordens/:id', controller.update);
router.delete('/ordens/:id', controller.delete);
```

**Servidor (exemplo) — `src/server.ts`**

Importe `express`, `mongoose`, `cors`, `dotenv` e as `routes`. Configure `express.json()`, `express.static('public')` (se usar frontend), e conecte ao MongoDB usando `process.env.MONGODB_URI`.

**Servir frontend de teste**

Crie uma pasta `public/` com um `index.html` simples. No `server.ts` adicione:

```ts
app.use(express.static('public'));
```

**Executando o projeto**

1. Certifique-se que o MongoDB está rodando.
2. No terminal, dentro do diretório do projeto:

```powershell
npm run dev
```

No console você deverá ver mensagens como `MongoDB conectado` e `Servidor rodando na porta 3000`.

**Exemplos de uso da API (cURL)**

Criar ordem:

```bash
curl -X POST http://localhost:3000/ordens -H "Content-Type: application/json" -d '{"titulo":"Teste","descricao":"Desc","prioridade":"média","setorSolicitante":"TI","valorServico":100}'
```

Listar ordens:

```bash
curl http://localhost:3000/ordens
```

Filtrar por status:

```bash
curl "http://localhost:3000/ordens?status=aberta"
```

Atualizar ordem:

```bash
curl -X PUT http://localhost:3000/ordens/<ID> -H "Content-Type: application/json" -d '{"status":"concluída"}'
```

Excluir ordem:

```bash
curl -X DELETE http://localhost:3000/ordens/<ID>
```

**Próximos passos sugeridos**
- Gerar os arquivos `src/*` automaticamente (models/controllers/routes/server).
- Criar um pequeno `index.html` em `public/` para testar requisições via `fetch`.
- Adicionar validações adicionais e testes unitários.

Se desejar, eu posso:

- Gerar o frontend de teste (`public/index.html`) agora.
- Gerar automaticamente os arquivos `src/models/OrdemServico.ts`, `src/controllers/OrdemServicoController.ts`, `src/routes/index.ts` e `src/server.ts` com o código de exemplo.

Informe qual opção prefere e eu executo os passos seguintes.

---

Arquivo criado: `README.md`

**Segurança — Variáveis de ambiente**

- Nunca comite seu arquivo `.env` com segredos (senhas, URIs com usuário/senha, chaves API). Este repositório inclui um arquivo de exemplo chamado ` .env.example`.
- Crie um `.env` local copiando o exemplo:

```powershell
copy .env.example .env
```

- Garanta que `.env` esteja no `.gitignore` (já adicionado). Se por engano você comitou um `.env`, remova-o do histórico com:

```powershell
git rm --cached .env
git commit -m "Remove .env from repo"
```

- Se o `.env` com segredos já foi enviado para um remoto, considere rotacionar as credenciais (mudar senhas/chaves), e usar ferramentas como `git filter-repo` ou `BFG Repo-Cleaner` para remover entradas antigas do histórico.
