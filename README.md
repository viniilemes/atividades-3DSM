# CRUD de Livros

Este projeto é uma aplicação web simples para cadastro, listagem, edição e exclusão de livros, utilizando Node.js, Express, MongoDB e frontend em HTML/CSS/JS puro.

## Funcionalidades

- Cadastro de livros (título, autor, ano)
- Listagem de livros cadastrados
- Edição e exclusão de livros
- Interface web responsiva

## Pré-requisitos

- Node.js (v16 ou superior)
- npm
- MongoDB rodando localmente (padrão: mongodb://localhost:27017/crud_livros)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/MarioC3sar/atividadeBD.git
   cd crud-livros
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o MongoDB (caso não esteja rodando):

   ```bash
   mongod
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

5. Acesse a aplicação no navegador:
   - Abra: [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
crud-livros/
├── public/
│   ├── index.html
│   └── styles.css
├── src/
│   ├── index.ts
│   └── models/
│       └── livro.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Observações

- Certifique-se de que o MongoDB está rodando antes de iniciar o servidor.
- O frontend está em `public/index.html` e consome a API REST do backend.

## Autor

- MarioC3sar

---

Sinta-se à vontade para contribuir ou sugerir melhorias!
# crud-livros
