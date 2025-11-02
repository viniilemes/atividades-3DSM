"use strict";
// Classe DataUtil para lidar com cálculos de data
class DataUtil {
    // Método estático para verificar se um ano é bissexto
    static isBissexto(ano) {
        if (ano % 400 == 0) {
            return true;
        }
        else if (ano % 4 == 0 && ano % 100 != 0) {
            return true; // 
        }
        return false;
    }
}
// Classe Pessoa com todos os métodos implementados
class Pessoa {
    constructor(nome, email, nasc) {
        this.nome = nome;
        this.email = email;
        this.nasc = nasc;
    }
    // Método para imprimir os dados da pessoa, incluindo idade e anos bissextos
    imprimir() {
        console.log("Nome: " + this.nome);
        console.log("e-Mail: " + this.email);
        console.log("Data Nasc.: " + this.nasc);
        console.log("Idade: " + this.idade(this.nasc) + " anos");
        console.log("Anos Bissextos: " + this.numBissextos());
    }
    // Método para calcular a idade com base na data de nascimento
    idade(nasc) {
        const hoje = new Date();
        // Extrai ano, mês e dia da string de nascimento
        const ano = parseInt(nasc.substring(6, 10));
        const mes = parseInt(nasc.substring(3, 5)) - 1;
        const dia = parseInt(nasc.substring(0, 2));
        const datan = new Date(ano, mes, dia);
        let idade = hoje.getFullYear() - datan.getFullYear();
        const m = hoje.getMonth() - datan.getMonth();
        // Ajusta a idade caso o aniversário deste ano ainda não tenha ocorrido
        if (m < 0 || (m === 0 && hoje.getDate() < datan.getDate())) {
            idade--;
        }
        return idade;
    }
    // Método para calcular o número de anos bissextos que a pessoa viveu
    numBissextos() {
        const ano = parseInt(this.nasc.substring(6, 10));
        const hoje = new Date();
        const anoatual = hoje.getFullYear();
        let quant = 0;
        // Itera do ano de nascimento até o ano atual
        for (let x = ano; x <= anoatual; x++) {
            // Verifica se o ano 'x' é bissexto usando a DataUtil
            if (DataUtil.isBissexto(x)) {
                // console.log(x); // Descomente para ver os anos bissextos
                quant++;
            }
        }
        return quant;
    }
}
// Instanciando a classe Pessoa
// ! Lembre-se de trocar "DD/MM/AAAA" por uma data de nascimento real
const cliente = new Pessoa("Seu Nome", "seu@email.com", "25/12/1990");
// Chamando o método imprimir para ver o resultado
cliente.imprimir();
