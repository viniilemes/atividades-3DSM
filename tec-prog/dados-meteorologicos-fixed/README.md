# Dados Meteorológicos — projeto de análise

Este é um projeto pequeno em TypeScript para ler um arquivo CSV com dados meteorológicos e gerar análises simples: top 10 temperaturas, top 10 pressões e médias de temperatura, vento e umidade.

## Estrutura do repositório

- `package.json` — scripts e dependências de desenvolvimento
- `tsconfig.json` — configuração TypeScript
- `src/`
  - `index.ts` — runner principal
  - `models/Meteo.ts` — parser / modelo de registro meteorológico
- `dados.csv` — arquivo CSV com os dados (não incluído por padrão)

> Eu criei esta cópia em `dados-meteorologicos-fixed` para fazer correções sem alterar os arquivos originais.

## Pré-requisitos

- Node.js 16+ (recomendado Node 18/20)
- npm

## Instalação

Abra um terminal na pasta `dados-meteorologicos-fixed` e rode:

```bash
npm install
```

## Executando

1. Copie o CSV original para a pasta do projeto e renomeie para `dados.csv` (ex.: `dados-meteorologicos/dados.csv` → `dados-meteorologicos-fixed/dados.csv`).

2. Compile e execute:

```cmd
npm run build
node dist\index.js
```

Ou rode diretamente com `ts-node`:

```cmd
npm run start
```

Saída esperada: número de registros lidos e análises como top 10 temperaturas, médias (temperatura, vento, umidade) e top 10 pressões.

## Formato do CSV suportado

O parser atual assume:

- Separador: ponto-e-vírgula (`;`)
- Decimal: vírgula (`19,54` → 19.54)
- Cabeçalho (exemplo):
  `Date;Time;Temp_C;Hum;Press_Bar;TempCabine_C;Charge;SR_Wm2;WindPeak_ms;WindSpeed_Inst;WindSpeed_Avg;WindDir_Inst;WindDir_Avg`

Os campos usados pelo analisador são (pelos índices do cabeçalho acima):
- `Temp_C` — índice 2
- `Hum` — índice 3
- `Press_Bar` — índice 4
- `WindSpeed_Avg` — índice 10

Se seu CSV tiver outra ordem ou outro separador, adapte o parser em `src/models/Meteo.ts`.

## Observações e melhorias possíveis

- Tornar o parser mais robusto: detectar separador automaticamente (`;` vs `,`) e mapear colunas por nome no cabeçalho em vez de índice fixo.
- Adicionar testes unitários para validação do parser e das funções de cálculo.
- Expor os resultados em CSV ou JSON para integração com outras ferramentas.

