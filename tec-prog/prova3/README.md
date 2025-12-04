# Prova III B - Técnicas de Programação II

Este projeto é uma API RESTful desenvolvida com **Node.js**, **TypeScript** e **Mongoose** para o gerenciamento de uma base de dados militar. A aplicação segue o padrão MVC e implementa validações rigorosas de dados e relacionamentos entre documentos.

## 📋 Sobre o Projeto

O sistema gerencia três entidades principais: **Militar**, **Soldado** e **Patente**. O objetivo é demonstrar o domínio sobre:
* Criação de Schemas e Models com Mongoose.
* Validações personalizadas (Regex, Arrays, Limites numéricos).
* Relacionamento entre documentos (`ref` e `populate`).
* Ordenação de resultados (`sort`).
* CRUD completo via Express.

---

## 🚀 Tecnologias

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Mongoose](https://mongoosejs.com/)
* [Dotenv](https://github.com/motdotla/dotenv)

---

## ⚙️ Configuração e Instalação

### 1. Pré-requisitos
* Node.js instalado.
* MongoDB rodando localmente ou via container Docker.

### 2. Instalação das Dependências
No terminal, execute:
```bash
npm install
````

### 3\. Configuração de Ambiente (.env)

Crie um arquivo `.env` na raiz e defina as variáveis utilizadas pela aplicação. Os nomes abaixo batem com o que o código espera:

```env
# Porta em que a API irá escutar (padrão adotado na prova):
PORT=3001

# String de conexão do MongoDB (opcional - se não definida, a aplicação usa
# mongodb://127.0.0.1:27017/p3tp2militar por padrão):
MONGO_URI=mongodb://127.0.0.1:27017/p3tp2militar
```

Observação: as rotas da API são montadas em `/api` por padrão (veja `src/index.ts` —
`app.use('/api', routes);`). Se preferir outro prefixo, altere essa linha no código.

### 4\. Banco de Dados

A aplicação se conectará automaticamente ao banco de dados MongoDB chamado:

> **`p3tp2militar`**

-----

## ▶️ Execução

Para rodar o projeto em modo de desenvolvimento (com *ts-node-dev*):

```bash
npm run dev
```

Para rodar a versão compilada/final:

```bash
npm start
```

-----

## ✅ Regras de Negócio e Validações

As seguintes regras foram implementadas nos Schemas:

### 1\. Militar

  * **Email:** Validação rigorosa via Regex. Aceita apenas domínios das forças armadas (`@eb`, `@marinha`, `@fab`) e deve terminar obrigatoriamente com `.mil.br`.
  * **Telefone:** Validação de 10 a 11 dígitos, verificando se os dois primeiros dígitos correspondem a um **DDD válido no Brasil**.
  * **Idade:** Valor mínimo de 18 anos.

### 2\. Soldado

  * **Relacionamento:** Vinculado a um `Militar`. O sistema valida se o ID informado realmente existe no banco.
  * **Altura:** Deve ser maior ou igual a **1,62m**.
  * **CIM:** Campo numérico obrigatório e único.

### 3\. Patente

  * **Código:** Deve ser um número maior que 0 e menor ou igual a 20.

-----

## 🛣️ Rotas da API

### `/militar`

  * **POST**: Cria um novo militar.
  * **GET**: Lista todos os militares em **ordem alfabética pelo nome**.
  * **PUT**: Atualiza dados (informar ID no corpo).
  * **DELETE**: Remove um militar.

### `/soldado`

  * **POST**: Cria um novo soldado (requer ID de um Militar existente).
  * **GET**: Lista os soldados trazendo os dados do Militar vinculado (**Populate**).
  * **PUT**: Atualiza dados.
  * **DELETE**: Remove o soldado e o cadastro do Militar associado (**Exclusão em Cascata**).

### `/patente`

  * **POST**: Cria uma nova patente.
  * **GET**: Lista patentes em **ordem alfabética pela descrição**.
  * **PUT**: Atualiza dados.
  * **DELETE**: Remove uma patente.

-----

## 🧪 Testes (Curl)

Um arquivo chamado `CURL_commands.txt` está disponível na raiz do projeto. Ele contém os comandos prontos para testar todos os fluxos exigidos:

1.  Cadastros (Militar, Soldado, Patente).
2.  Alterações.
3.  Listagens (validando ordenação e populate).
4.  Exclusões.

-----

## 👨‍💻 Autor

Projeto entregue para a avaliação da Prova III B - DSM.

```
```