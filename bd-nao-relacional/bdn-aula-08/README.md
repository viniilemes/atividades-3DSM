# bdn-aula-08

Exercícios da Aula 08 — testes de conexão com MongoDB e logs com Mongoose.

Pré-requisitos
- Node.js
- MongoDB rodando em `127.0.0.1:27017` (ou ajustar MONGO_URI)

Instalação

```bat
cd /d "c:\Users\Vinicius\Documents\Fatec\Semestre_03\Des_Web_3\atividades\atividade-git\bd-nao-relacional\bdn-aula-08"
npm install
```

Configurar variáveis de ambiente (opcional)
- Copie `.env.example` para `.env` e ajuste `MONGO_URI` se quiser usar credenciais diferentes.
- O código tem fallback para a URI hardcoded usada no exercício, então `.env` não é obrigatório para testes locais.

Executar os testes

```bat
npm run testar-conexao   # testará a conexão e desconectará imediatamente
npm run testar-logs      # exibirá logs de connected / disconnected (desconecta após ~5s)
```

Criar usuário no MongoDB (exemplo)

Abra o `mongosh` com permissões admin e execute:

```js
use admin
db.createUser({
  user: "devAluno",
  pwd: "aluno123",
  roles: [ { role: "read", db: "estacao_meteorologica" } ]
})
```

