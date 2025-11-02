# Revisão: TypeScript e Lógica —  (atividade)

Este diretório contém uma pequena atividade de revisão de TypeScript e lógica de programação.
O exercício foca em classes, manipulação de datas, métodos estáticos e tipagem em TypeScript.

## Objetivo

- Praticar a criação de classes em TypeScript.
- Implementar utilitários para manipulação de datas (ex.: verificação de ano bissexto).
- Calcular idade e estatísticas relacionadas (ex.: número de anos bissextos vividos).

## Estrutura do projeto

- `package.json` — scripts e dependências de desenvolvimento (ts-node, typescript).
- `src/` — código-fonte TypeScript.
  - `index.ts` — ponto de entrada (imprime dados de exemplo).
  - `DataUtil`, `Pessoa` — implementações dentro do `index.ts` (ou módulos separados se você preferir separar).
- `.gitignore` — criado para ignorar node_modules, build e arquivos temporários.

> Nota: O arquivo inicial foi renomeado para `index.ts`. Caso você tenha o arquivo com nome `indesx.ts` (erro de digitação), renomeie para `index.ts` para que o script `npm run index` funcione.

## Como executar (Windows - cmd.exe)

1. Instalar dependências (uma vez):

```cmd
cd tec-prog\revisao-typescript-logica
npm install
```

2. Executar o script `index` que usa `ts-node` para rodar diretamente o TypeScript:

```cmd
npm run index
```

O script definido no `package.json` é:

```json
"scripts": {
  "index": "ts-node ./src/index"
}
```

Se preferir rodar diretamente com `ts-node` (sem npm):

```cmd
npx ts-node ./src/index.ts
```

## Possíveis problemas e soluções rápidas

- Error: Cannot find module './index'
  - Causa: o arquivo de entrada foi chamado `indesx.ts` por engano. Renomeie para `index.ts`.
  - Comando para renomear (cmd.exe):

```cmd
cd tec-prog\revisao-typescript-logica\src
ren indesx.ts index.ts
```

- Se houver erros de permissão ou bloqueio de arquivo (EPERM) ao renomear no Windows:
  - Feche o VS Code, terminais e servidores que possam estar usando os arquivos.
  - Use `Task Manager` ou Process Explorer para identificar processos que travam arquivos.
  - Execute como Administrador para tomar posse com `takeown`/`icacls` se for necessário.

- Caso queira compilar para JavaScript em vez de rodar com `ts-node`:

```cmd
npx tsc -p .
node dist/index.js
```

(Verifique `tsconfig.json` para `outDir` e ajuste os caminhos se necessário.)

## Sugestões de extensão

- Separar `DataUtil` e `Pessoa` em módulos próprios (`src/DataUtil.ts`, `src/Pessoa.ts`) e importar em `index.ts` para manter o código organizado.
- Adicionar testes simples com Jest ou Vitest para validar lógica de datas (anos bissextos, cálculo de idade).

## O que aprendi com esta atividade

- A forma correta de estruturar classes e métodos em TypeScript.
- Como trabalhar com datas nativas do JavaScript e evitar erros comuns no cálculo de idade.
- Como usar `ts-node` para executar TypeScript sem compilação intermediária e quando preferir compilar com `tsc` para produção.



