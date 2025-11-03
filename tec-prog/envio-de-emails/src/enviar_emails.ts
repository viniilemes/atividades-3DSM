import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import nodemailer from 'nodemailer';
import { format, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- CONFIGURAÇÕES ---

// Defina a data atual (conforme contexto) para o cálculo correto da idade
// new Date(ANO, MÊS_INDEXADO_EM_0, DIA) -> 10 = Novembro
const DATA_ATUAL = new Date(2025, 10, 3);

// --- DETALHES DO SEU SERVIDOR DE E-MAIL (PREENCHA) ---
// (Exemplo para Gmail. Ajuste para seu provedor, ex: smtp.office365.com)
const SMTP_CONFIG = {
    host: 'smtp.seu-provedor.com',
    port: 587,
    secure: false, // true para porta 465, false para outras (como 587)
    auth: {
        user: 'seu_email@exemplo.com',
        pass: 'sua_senha_de_app', // Use uma "Senha de App"
    },
};

// --- INTERFACES (Tipagem) ---
interface Aniversariante {
    Nome: string;
    Email: string;
    Nasc: string; // formato "dd/mm/AAAA"
}

// --- CAMINHOS DOS ARQUIVOS ---
// process.cwd() pega o diretório raiz onde o script foi executado
const baseDir = process.cwd();
const CSV_PATH = path.join(baseDir, 'emails.csv');
const HTML_PATH = path.join(baseDir, 'Mensagem.html');
const LOGO_PATH = path.join(baseDir, 'imagens/logo.png');
const ASSINATURA_PATH = path.join(baseDir, 'imagens/assinatura.png');


// --- FUNÇÕES AUXILIARES ---

/**
 * Converte a string "dd/mm/AAAA" para um objeto Date.
 */
function parseDataNasc(dataStr: string): Date {
    const parts = dataStr.split('/');
    const dia = Number(parts[0] || 0);
    const mes = Number(parts[1] || 1);
    const ano = Number(parts[2] || 1970);
    // Se a data for inválida, lançamos erro para não prosseguir com valores incorretos
    if (!Number.isFinite(dia) || !Number.isFinite(mes) || !Number.isFinite(ano)) {
        throw new Error(`Data de nascimento inválida: ${dataStr}`);
    }
    // Mês no objeto Date é 0-indexado (0 = Jan, 1 = Fev, ...)
    return new Date(ano, mes - 1, dia);
}

/**
 * Calcula a idade com base na data de nascimento.
 */
function calcularIdade(dataNasc: Date): number {
    const hoje = DATA_ATUAL;
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const m = hoje.getMonth() - dataNasc.getMonth();

    // Ajusta a idade se o aniversário ainda não passou este ano
    if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }
    return idade;
}

/**
 * Retorna o nome do mês seguinte ao aniversário, por extenso.
 */
function obterMesSeguinte(dataNasc: Date): string {
    // Adiciona 1 mês à data de nascimento para pegar o mês seguinte
    const dataMesSeguinte = addMonths(dataNasc, 1);

    // Formata o nome do mês em português (ex: "Dezembro")
    let nomeMes = format(dataMesSeguinte, 'MMMM', { locale: ptBR });

    // Capitaliza a primeira letra
    return nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
}

/**
 * Lê o arquivo CSV e retorna uma lista de aniversariantes.
 */
function lerCSV(): Promise<Aniversariante[]> {
    return new Promise((resolve, reject) => {
        const resultados: Aniversariante[] = [];
        fs.createReadStream(CSV_PATH)
            .pipe(csv({ separator: ';' })) // Especifica o separador
            .on('data', (data: Aniversariante) => {
                // Normaliza chaves (remove BOM e espaços) e valores
                const normalized: any = {};
                for (const [rawKey, rawVal] of Object.entries(data || {})) {
                    const key = rawKey.replace(/^\uFEFF/, '').trim();
                    normalized[key] = typeof rawVal === 'string' ? rawVal.trim() : rawVal;
                }
                // Aceita linhas que contenham pelo menos Email ou Nome
                if (Object.keys(normalized).length > 0 && (normalized.Email || normalized.Nome)) {
                    resultados.push(normalized as Aniversariante);
                }
            })
            .on('end', () => {
                resolve(resultados);
            })
            .on('error', (error: Error) => {
                reject(error);
            });
    });
}

/**
 * Prepara e envia o e-mail individual.
 */
async function enviarEmail(
    transport: nodemailer.Transporter,
    template: string,
    pessoa: Aniversariante
) {
    const { Nome, Email, Nasc } = pessoa;

    // 1. Calcular campos
    const dataNasc = parseDataNasc(Nasc);
    const idade = calcularIdade(dataNasc);
    const mesSeguinte = obterMesSeguinte(dataNasc);

    // 2. Substituir placeholders
    let corpoHtml = template.replace('{{nome}}', Nome);
    corpoHtml = corpoHtml.replace('{{percdesc}}', String(idade));
    corpoHtml = corpoHtml.replace('{{mesquevem}}', mesSeguinte);

    // 3. Modifica o HTML para usar 'cid' (Content-ID)
    corpoHtml = corpoHtml.replace('imagens/logo.png', 'cid:logo');
    corpoHtml = corpoHtml.replace('imagens/assinatura.png', 'cid:assinatura');

    // 4. Configurar opções do e-mail
    const mailOptions: nodemailer.SendMailOptions = {
        from: `"Seu Nome/Empresa" <${SMTP_CONFIG.auth.user}>`,
        to: `${Nome} <${Email}>`,
        subject: `Um presente especial para você, ${Nome}!`,
        html: corpoHtml,
        attachments: [
            {
                filename: 'logo.png',
                path: LOGO_PATH,
                cid: 'logo', // ID de conteúdo (referenciado no HTML)
            },
            {
                filename: 'assinatura.png',
                path: ASSINATURA_PATH,
                cid: 'assinatura', // ID de conteúdo
            },
        ],
    };

    // 5. Enviar
    console.log(`Preparando e-mail para: ${Nome} (${Email})...`);

    // (Remova o comentário '/*' e '*/' abaixo para ativar o envio real)
    /*
    try {
      await transport.sendMail(mailOptions);
      console.log(`✔️ E-mail para ${Nome} enviado com sucesso!`);
    } catch (error) {
      console.error(`❌ ERRO ao enviar para ${Nome}: ${error}`);
    }
    */

    // (Linha de simulação. Remova após configurar o envio)
    console.log(`SIMULAÇÃO: E-mail para ${Nome} gerado. (Envio real está comentado no código).`);
}

// --- FUNÇÃO PRINCIPAL (Execução) ---
async function main() {
    try {
        // 1. Conectar ao servidor SMTP
        let transport = nodemailer.createTransport(SMTP_CONFIG);
        try {
            await transport.verify(); // Verifica se a conexão e autenticação funcionam
            console.log('Servidor SMTP conectado e pronto para enviar.');
        } catch (err) {
            console.warn('Aviso: não foi possível conectar ao servidor SMTP; usando modo simulado. Detalhe:', err);
            // Troca para transporte simulado (não envia e-mails reais)
            transport = nodemailer.createTransport({ jsonTransport: true });
        }

        // 2. Carregar o template HTML
        const templateHtml = await fs.promises.readFile(HTML_PATH, 'utf-8');

        // 3. Ler os clientes do CSV
        const aniversariantes = await lerCSV();
        if (aniversariantes.length === 0) {
            console.warn('Nenhum aniversariante encontrado no CSV.');
            return;
        }
    console.log(`Encontrados ${aniversariantes.length} clientes.`);

        // 4. Enviar e-mail para cada um
        for (const pessoa of aniversariantes) {
            await enviarEmail(transport, templateHtml, pessoa);
        }

        console.log('\nProcesso concluído.');

    } catch (error) {
        console.error('Ocorreu um erro grave no processo:', error);
    }
}

// Executa o programa
main();