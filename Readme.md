# Atividades do 3º Semestre — Desenvolvimento de Software Multiplataforma — Fatec Jacareí (SP)

Este repositório contém as atividades práticas realizadas durante o 3º semestre do curso
de Desenvolvimento de Software Multiplataforma na Fatec Jacareí, São Paulo.

Cada pasta corresponde a uma atividade, exercício ou pequeno projeto entregue nas
diferentes disciplinas do semestre. As atividades têm foco em desenvolvimento web
e práticas de backend/frontend usando TypeScript e ferramentas modernas. Abaixo há um
resumo das pastas, tecnologias usadas e instruções para executar cada atividade em
ambiente de desenvolvimento (Windows - cmd.exe).

## Resumo das pastas / projetos

- `conversor-moeda/` — App simples de conversão de moedas (frontend + backend de exemplo).
- `crud-livros/` — CRUD de livros com TypeScript no frontend e estrutura de modelo para persistência.
- `discos-crud/` — Projeto completo (backend em Node/Express + MongoDB, frontend estático em TS)
	- Backend: API REST para gerenciar discos (CRUD).
	- Frontend: SPA simples que consome a API e faz operações de listagem, criação, edição e exclusão.
- `weatherApp/` — Consumo de API externa (weather), rotas e controllers em TypeScript.

## Tecnologias e conceitos praticados

- Linguagens: TypeScript, JavaScript, HTML, CSS
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: HTML/CSS, DOM, Fetch API, TypeScript
- Ferramentas: npm, tsc (TypeScript), ts-node-dev, http-server (para servir estático)
- Versionamento: Git (atenção a submódulos e gitlinks ao adicionar pastas com `.git`)
- Conceitos: APIs REST, CORS, Content-Security-Policy (CSP), ESM vs CommonJS, tipagem em TS

## Como rodar os projetos (comandos para cmd.exe)

Observação: abra um terminal `cmd.exe` na pasta do projeto desejado.

1. Backend do `discos-crud` (compilado e executável — recomendado para evitar problemas com ESM no ts-node-dev):

	cd discos-crud\backend
	npm install
	npm start

	- O `npm start` compila (`tsc`) e executa `node dist/server.js`.
	- O servidor roda por padrão em: http://localhost:3000

2. Frontend (servidor estático simples):

	cd discos-crud\frontend
	npm run start

	- Isso executa `npx http-server -p 8080` e serve os arquivos estáticos em http://127.0.0.1:8080

3. Alternativas de desenvolvimento:

	- Para desenvolvimento do backend com reload automático, existe o script `npm run dev` que usa `ts-node-dev`,
		porém em projetos ESM isso pode gerar mensagens do tipo "Must use import to load ES Module" — se ocorrer,
		prefira `npm start`.

## Dicas e observações (problemas comuns)

- CSP / fontes externas: durante o desenvolvimento pode ser necessário ajustar a política de segurança (CSP)
	para permitir fontes externas (Google Fonts) e conexões ao backend em `localhost`. No repositório foi adicionada
	uma meta-tag CSP permissiva para ambiente de desenvolvimento (`frontend/index.html`). Remova ou ajuste essa
	tag antes de colocar em produção.
- Submódulos Git: se ao commitar você vir `create mode 160000 <pasta>` significa que a pasta foi adicionada como
	submódulo (gitlink). Remova o `.git` interno dentro da pasta para transformá-la em diretório normal no repositório
	pai, se esse não for o comportamento desejado.

## O que eu aprendi neste semestre

- Construir APIs REST com TypeScript e Express.
- Trabalhar com modelos Mongoose para persistência no MongoDB.
- Consumir e manipular APIs no frontend usando fetch e TypeScript.
- Diferenças entre módulos ESM e CommonJS no Node e como adaptar projetos TypeScript.
- Debugging: analisar erros do TypeScript, resolver problemas de compilação e lidar com políticas de segurança (CSP).

## Contato / referência

Se quiser testar alguma funcionalidade específica, gerar dados de exemplo ou receber ajuda para
empacotar e publicar algum dos projetos, me avise e eu auxilio com os passos.

---
_README gerado como resumo das atividades do 3º semestre — Fatec Jacareí (Desenvolvimento de Software Multiplataforma)._ 

