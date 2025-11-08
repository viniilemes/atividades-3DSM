class ContaBancaria {
  // Atributo privado para saldo 
  private _saldo: number;

  constructor() {
    this._saldo = 0; // Saldo inicial
  }

  get saldo(): number {
    return this._saldo;
  }

  // Implementa o método depositar 
  depositar(valor: number): void {
    if (valor > 0) {
      this._saldo += valor;
      console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this._saldo.toFixed(2)}`);
    } else {
      console.log("Valor de depósito inválido.");
    }
  }

  // Implementa o método sacar 
  sacar(valor: number): void {
    // Garante que o saldo não fique negativo 
    if (valor > 0 && valor <= this._saldo) {
      this._saldo -= valor;
      console.log(`Saque de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this._saldo.toFixed(2)}`);
    } else {
      console.log("Saldo insuficiente ou valor de saque inválido.");
    }
  }
}

// --- Classe Cliente ---
class Cliente {
  // Atributos da classe Cliente 
  nome: string;
  cpf: string;
  nasc: Date;
  private nomemae: string;
  conta: ContaBancaria;

  // Construtor
  constructor(nome: string, cpf: string, nasc: Date, nomemae: string, conta: ContaBancaria) {
    this.nome = nome;
    this.cpf = cpf;
    this.nasc = nasc;
    this.nomemae = nomemae;
    this.conta = conta;
  }
}

// --- Tarefas de Implementação (Testes) ---

// Instancia um objeto da classe ContaBancaria
const minhaConta = new ContaBancaria();

// Instancia um objeto da classe Cliente
// (Use seus próprios dados)
const cliente = new Cliente(
  "Seu Nome",
  "123.456.789-00",
  new Date("1990-01-01"),
  "NomeMae",
  minhaConta
);

console.log(`Cliente ${cliente.nome} criado com saldo: R$${cliente.conta.saldo.toFixed(2)}`);

// Faça um depósito de R$ 100,00
cliente.conta.depositar(100.00);

// Faça um saque de R$ 50,00
cliente.conta.sacar(50.00);

// Tente fazer um saque de R$ 60,00
console.log("Tentando sacar R$ 60,00...");
cliente.conta.sacar(60.00);