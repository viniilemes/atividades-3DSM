const fs = require('fs');
const path = require('path');

// Caminhos dos arquivos
const inputFilePath = path.join(__dirname, 'nomes.csv');
const outputFilePath = path.join(__dirname, 'nomes_capitalizados.csv');

// Conjunto (Set) de preposições para manter em minúsculas
// Usar um Set é eficiente para verificações (includes)
const preposicoes = new Set([
  'de', 'da', 'das', 'do', 'dos', 'e'
]);

/**
 * Converte um nome para o formato capitalizado correto.
 * Ex: "JOAO DA SILVA" -> "Joao da Silva"
 * Ex: "E SILVA" -> "E Silva"
 * @param {string} nomeCompleto O nome em maiúsculas
 * @returns {string} O nome capitalizado
 */
function capitalizarNome(nomeCompleto) {
  if (typeof nomeCompleto !== 'string' || !nomeCompleto) {
    return '';
  }

  // 1. Converter tudo para minúsculas
  const nomeMinusc = nomeCompleto.toLowerCase();

  // 2. Separar o nome em palavras
  const palavras = nomeMinusc.split(' ');

  // 3. Mapear cada palavra
  const palavrasCapitalizadas = palavras.map((palavra, index) => {
    // Se a palavra está na lista de preposições E NÃO é a primeira palavra...
    if (preposicoes.has(palavra) && index > 0) {
      return palavra; // ...mantém em minúsculas.
    }

    // Se não for preposição (ou se for a primeira palavra), capitaliza.
    // (Ex: "E SILVA" deve virar "E Silva", não "e Silva")
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
  });

  // 4. Juntar as palavras de volta com espaço
  return palavrasCapitalizadas.join(' ');
}

// --- Script Principal ---

try {
  // 1. Ler o arquivo de entrada
  // Assumindo que o arquivo não tem cabeçalho
  const data = fs.readFileSync(inputFilePath, 'utf8');

  // 2. Processar os nomes
  const nomes = data.split(/\r?\n/); // Divide por linha (Windows ou Unix)
  const nomesConvertidos = [];

  // Se o seu CSV tiver um cabeçalho (ex: "NOME"), 
  // o script atual vai tentar capitalizá-lo (ex: "Nome").
  // Se quiser pular o cabeçalho, seria necessário um ajuste.
  // Pelo que vi no seu arquivo, ele não tem cabeçalho, então este código funciona perfeitamente.

  for (const nome of nomes) {
    if (nome) { // Ignora linhas em branco
      nomesConvertidos.push(capitalizarNome(nome));
    }
  }

  // 3. Preparar o conteúdo do novo CSV
  const outputContent = nomesConvertidos.join('\n');

  // 4. Gravar o novo arquivo .csv
  fs.writeFileSync(outputFilePath, outputContent, 'utf8');

  console.log(`Arquivo "nomes_capitalizados.csv" gerado com sucesso!`);

} catch (error) {
  console.error('Ocorreu um erro ao processar os arquivos:', error.message);
  if (error.code === 'ENOENT') {
    console.error(`Erro: O arquivo "nomes.csv" não foi encontrado.`);
    console.error(`Certifique-se de que ele está na mesma pasta que o script.`);
  }
}