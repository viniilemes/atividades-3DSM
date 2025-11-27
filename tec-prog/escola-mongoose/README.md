# Escola Mongoose

Projeto API RESTful em TypeScript usando Express e Mongoose.

Pré-requisitos
- Node.js (v14+ recomendado)
- MongoDB em execução localmente ou um URI Mongo remoto

Instalação (PowerShell)

Abra o PowerShell na pasta do projeto e execute:

```powershell
cd "c:\Users\Vinicius\Documents\Fatec\Semestre_03\Des_Web_3\atividades\atividade-git\tec-prog\escola-moongose"
npm install express dotenv mongoose
;npm i -D typescript ts-node ts-node-dev @types/express @types/node
```

Observação: se preferir instalar tudo de uma vez, pode rodar `npm install` após adicionar as dependências ao `package.json`.

Variáveis de ambiente
- Copie/edite o arquivo `.env.example` para criar um `.env` local e ajuste `MONGO_URI` e `PORT` conforme necessário. **Não** comite o arquivo `.env` no repositório.

Exemplo mínimo em `.env.example`:

```text
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/bdaula
```

Se o arquivo `.env` já tiver sido versionado anteriormente, remova-o do índice do git com:

```powershell
git rm --cached .env
git commit -m "Stop tracking .env"
```

Rodando em desenvolvimento

```powershell
npm run dev
```

Rotas base (prefixo `/api`)
- `POST /api/professor` - criar professor (body: `nome`, `email`, `cpf`)
- `GET /api/professor` - listar professores
- `PUT /api/professor` - editar professor (body: `id`, `nome`, `email`, `cpf`)
- `DELETE /api/professor` - deletar professor (body: `id`)
- `POST /api/disciplina` - criar disciplina (body: `descricao`)
- `GET /api/disciplina` - listar disciplinas
- `POST /api/professor_has_disciplina` - criar vínculo (body: `professor`, `disciplina` = ObjectId)
- `GET /api/professor_has_disciplina` - listar vínculos (com `populate`)

Testes rápidos com `curl` (substitua `localhost:3001` se usar outra porta)

- Cadastrar professor:

```bash
curl -X POST http://localhost:3001/api/professor -H "Content-Type: application/json" -d '{"nome":"Henrique Louro","email":"henrique.louro@fatec.sp.gov.br","cpf":"07494812857"}'
```

- Cadastrar disciplina:

```bash
curl -X POST http://localhost:3001/api/disciplina -H "Content-Type: application/json" -d '{"descricao":"Técnicas de Programação II"}'
```

- Listar professores:

```bash
curl -X GET http://localhost:3001/api/professor
```

Observações e dicas
- Certifique-se de que o MongoDB está rodando e que `MONGO_URI` aponta para o banco correto.
- As validações (CPF, email, tamanhos) são feitas no model e retornam mensagens JSON.
- Para desenvolvimento rápido eu recomendo usar o `Postman` ou `Insomnia` para testar rotas com bodies JSON.

Se quiser, eu posso:
- Rodar `npm install` e tentar iniciar o servidor aqui.
- Adicionar testes automáticos básicos.
- Explicar a validação de CPF ou como o `populate` funciona no Mongoose.

-- Projeto gerado automaticamente pelo assistente
