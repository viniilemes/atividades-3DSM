# Conversor de Nomes

Repositório simples para conversão/tratamento de nomes. Contém um script `converterNomes.js` e um arquivo de exemplo `nomes.csv`.

## Descrição

Este projeto contém utilitários para processar uma lista de nomes (por exemplo, normalizar maiúsculas/minúsculas, extrair sobrenomes, etc.). O script principal é `converterNomes.js`.

Observação: Não modifique `nomes.csv` sem criar um backup caso contenha dados de exemplo importantes.

## Requisitos

- Node.js (recomendado >= 14)

## Instalação

Abra um terminal (cmd.exe no Windows) dentro da pasta do projeto e rode:

```
npm install
```

> Se o projeto não tiver dependências (arquivo `package.json` vazio ou sem dependências), este comando é seguro mas pode não instalar nada.

## Uso

Existem duas formas comuns de usar o script:

- Usar o arquivo `nomes.csv` que já está no repositório (padrão):

```
node converterNomes.js
```

- Especificar um arquivo CSV como argumento (assumindo que o script aceite um caminho):

```
node converterNomes.js caminho\para\meu_arquivo.csv
```

Se o `converterNomes.js` não aceitar argumentos, ele provavelmente lê `nomes.csv` por padrão — este README assume esse comportamento. Se o comportamento for diferente, ajuste o comando acima conforme necessário.

## Contribuição

1. Crie uma issue descrevendo a melhoria ou bug.
2. Abra um pull request com mudanças pequenas e documentadas.

## Licença

Licença não especificada — use conforme necessário. Se quiser adicionar uma licença, crie um arquivo `LICENSE`.
