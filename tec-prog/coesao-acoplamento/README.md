# Coesão e Acoplamento — Exercícios TypeScript

Repositório com vários exercícios sobre coesão e acoplamento implementados em TypeScript.

## Descrição
Projetos/exercícios didáticos feitos em TypeScript para demonstrar conceitos de coesão e acoplamento. Cada exercício é um arquivo TypeScript independente localizado na pasta `src/src/`.

## Pré-requisitos
- Node.js (versão 14+ recomendada)
- npm (ou yarn)

## Instalação
1. Clone o repositório
2. No diretório do projeto, instale dependências:

```cmd
npm install
```

## Rodando os exercícios
Este projeto usa `ts-node` para executar diretamente os arquivos TypeScript. Os scripts disponíveis (definidos em `package.json`) são:

```cmd
npm run ex01   # executa src/src/ex01.ts
npm run ex02   # executa src/src/ex02.ts
npm run ex03   # executa src/src/ex03.ts
npm run ex04   # executa src/src/ex04.ts
npm run ex05   # executa src/src/ex05.ts
```

Também é possível compilar TypeScript e executar com Node (opcional):

```cmd
npx tsc
node dist/<arquivo>.js
```

> Observação: a estrutura atual do projeto coloca os arquivos em `src/src/` — mantenha este caminho ao executar os scripts ou adapte os scripts em `package.json` se preferir mover os arquivos para `src/`.

## Estrutura do projeto

- `package.json` — scripts e dependências
- `tsconfig.json` — configuração do TypeScript
- `src/src/` — código-fonte dos exercícios (ex01.ts, ex02.ts, ...)

## Boas práticas
- Use `npm run <script>` para executar um exercício isoladamente.
- Para desenvolvimento iterativo, considere usar um watcher (ex.: `ts-node-dev` ou `nodemon`) se for editar e testar frequentemente.

## Licença
Este repositório está disponível sob a licença ISC (ver `package.json`).

## Contato
Se precisar de ajuda com os exercícios, adicione uma issue neste repositório ou envie uma mensagem ao autor.
