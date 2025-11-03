# Envio de E-mails — Projeto (TypeScript)

Este repositório contém uma implementação em TypeScript/Node para gerar e (opcionalmente) enviar e-mails usando um template HTML e uma lista de destinatários (CSV).

Observação: existe um script Python na pasta `src/` para referência/alternativa, mas a implementação suportada e mantida aqui é a TypeScript.

## Arquivos principais
- `src/enviar_emails.ts` — implementação em TypeScript (Node + nodemailer)
- `Mensagem.html` — template HTML do e-mail
- `emails.csv` — arquivo CSV com os destinatários. Esperado: cabeçalho `Nome;Email;Nasc`
- `imagens/logo.png` e `imagens/assinatura.png` — imagens usadas no e-mail

## Requisitos
- Node.js 16+ (recomendado Node 18/20)
- npm (ou yarn)

## Instalação (TypeScript)
Abra um terminal na raiz do projeto `envio-de-emails` e rode:

```cmd
npm install
```

Isso instalará as dependências (nodemailer, csv parser, ts-node, typescript, etc.).

## Executando localmente

### Scripts npm úteis

Após `npm install` você pode usar os scripts configurados no `package.json`:

```cmd
# modo dev (executa direto com ts-node)
npm run dev

# compilar para JS em dist/
npm run build

# executar o JS compilado
npm run start
```

> Observação: use `npm run dev` ou `npx ts-node src/enviar_emails.ts` — preste atenção ao uso de underline (`enviar_emails.ts`) no nome do arquivo; `enviar-emails.ts` (com hífen) irá gerar erro.


1) Rodar com ts-node (desenvolvimento):

```cmd
npx ts-node src/enviar_emails.ts
```

2) Ou compilar e executar com Node (produção/testes):

```cmd
npx tsc -p tsconfig.json
node dist/enviar_emails.js
```

3) Antes de fazer envio real, abra `src/enviar_emails.ts` e configure:

- `SMTP_SERVIDOR`
- `SMTP_PORTA`
- `SEU_EMAIL`
- `SUA_SENHA` (recomenda-se usar variáveis de ambiente ou senhas de app)

O envio real está comentado por padrão no código; primeiro faça testes com poucos destinatários.

## Formato do CSV esperado

O parser atual assume:

- Delimitador: `;`
- Cabeçalho mínimo: `Nome;Email;Nasc`
- `Nasc` no formato `dd/mm/AAAA`

Exemplo de linha:

```
João Silva;joao@example.com;15/04/1984
```

## Boas práticas

- Não deixe credenciais em arquivos versionados. Use variáveis de ambiente ou um arquivo `.env` (e inclua-o no `.gitignore`).
- Teste com envio simulado antes de habilitar o envio real.
- Considere limitar taxa de envio em produção e seguir políticas do provedor SMTP.

## .gitignore recomendado
Evite commitar artefatos locais como `node_modules/`, `dist/`, e arquivos de configuração local. Há um `.gitignore` no repositório que cobre Node/TypeScript e Python.

## Próximos passos
- Se quiser, posso abrir um branch com essas mudanças e preparar um PR.
- Posso ajudar a adicionar suporte a configuração via `.env` e integrar bibliotecas para leitura segura de segredos.

---
Se quiser que eu ajuste algo no README (mais detalhes, exemplo de `.env`, ou instruções para Docker), diga o que acrescentar.
