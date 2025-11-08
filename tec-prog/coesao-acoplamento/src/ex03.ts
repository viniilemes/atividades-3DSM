class Item {
  // Atributos
  descricao: string;
  valor: number;
  quantidade: number;

  // Construtor
  constructor(descricao: string, valor: number, quantidade: number) {
    this.descricao = descricao;
    this.valor = valor;
    this.quantidade = quantidade;
  }
}

// --- Classe Carrinho ---
class Carrinho {
  // Atributos 
  itens: Item[];

  constructor() {
    this.itens = [];
  }

  // Métodos 
  adicionarItem(item: Item): void {
    this.itens.push(item);
    console.log(`Item "${item.descricao}" adicionado.`);
  }

  removerItem(item: Item): void {
    const index = this.itens.indexOf(item);
    if (index > -1) {
      this.itens.splice(index, 1);
      console.log(`Item "${item.descricao}" removido.`);
    }
  }

  // Lógica para calcular o total
  calcularTotal(): number {
    let total = 0;
    for (const item of this.itens) {
      total += item.valor * item.quantidade;
    }
    return total;
  }
}

// --- Classe Pagamento ---
class Pagamento {
  // Lógica para processar o pagamento 
  processarPagamento(total: number, forma: string): void {
    // Imprimir a mensagem solicitada 
    console.log(`Pagamento de R$ ${total.toFixed(2)} em ${forma} processado com sucesso!`);
  }
}

// --- Código para testar as classes --- 
const carrinhoc = new Carrinho();

let item = new Item("Camiseta", 50, 2);
carrinhoc.adicionarItem(item);

item = new Item("Calça", 130, 1);
carrinhoc.adicionarItem(item);

item = new Item("Meia", 20, 3);
carrinhoc.adicionarItem(item);

const total = carrinhoc.calcularTotal();
console.log(`Total do carrinho: R$ ${total.toFixed(2)}`); // Ajustado para logar o total

const pagamento = new Pagamento();
pagamento.processarPagamento(total, "dinheiro");