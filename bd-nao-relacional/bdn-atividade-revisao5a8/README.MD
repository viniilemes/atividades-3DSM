## bdn-atividade-revisao5a8

Projeto simples em Node.js que expõe um endpoint `/produtos` e consome um banco MongoDB local (`rede_games`).

## Descrição

O `server.js` cria um servidor Express que conecta ao MongoDB em `mongodb://localhost:27017` e fornece um endpoint:

- GET `/produtos` — retorna até 5 documentos da coleção `produtos` com os campos `nome` e `preco` (o `_id` é excluído no projection).

O repositório inclui um `package.json` com dependências `express` e `mongodb`.

## Requisitos

- Node.js (recomendado LTS: 16.x, 18.x ou superior). Verifique com:

	```cmd
	node -v
	npm -v
	```

- MongoDB rodando localmente na porta padrão (27017). Você pode instalar o MongoDB Community no Windows ou rodar via Docker.

## Instalação (passos mínimos)

No cmd.exe, abra a pasta do projeto e execute:

```cmd
npm install
```

Isso instalará `express` e `mongodb` (e `nodemon` como devDependency, se presente no `package.json`).

## Executando o servidor

```cmd
npm start
```

ou

```cmd
node server.js
```

O servidor deverá logar:

```
Conectado ao MongoDB
Servidor rodando em http://localhost:3000
```

Depois abra no navegador:

```
http://localhost:3000/produtos
```

Se a resposta for `[]`, significa que a coleção `produtos` está vazia (comportamento esperado se não houver dados).

## Seed (inserir dados de exemplo)

Para popular a coleção `produtos` com alguns documentos de teste, crie um arquivo `seed.js` na raiz do projeto com o seguinte conteúdo e execute `node seed.js`:

```js
// seed.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'rede_games';

async function run() {
	const client = new MongoClient(url);
	try {
		await client.connect();
		const db = client.db(dbName);
		const produtos = db.collection('produtos');

		const docs = [
			{ nome: 'Jogo A', preco: 59.9 },
			{ nome: 'Jogo B', preco: 79.9 },
			{ nome: 'Controle X', preco: 129.5 },
			{ nome: 'Headset Y', preco: 199.0 },
			{ nome: 'Camiseta Z', preco: 39.9 }
		];

		await produtos.insertMany(docs);
		console.log('Seed inserido com sucesso');
	} catch (err) {
		console.error(err);
	} finally {
		await client.close();
	}
}

run();
```

Após rodar o seed, recarregue `http://localhost:3000/produtos` para ver os itens.

## Endpoints

- GET `/produtos` — retorna JSON com até 5 documentos. Cada documento tem `nome` e `preco`.

## Notas

- Se o MongoDB estiver protegido por autenticação ou rodando em outra URL, atualize a variável `url` em `server.js`.
- Se quiser reinício automático durante desenvolvimento, instale e use `nodemon` e rode `npm run dev` (se `dev` estiver configurado).

## Licença

Projeto para fins de estudo. Sem licença específica.
