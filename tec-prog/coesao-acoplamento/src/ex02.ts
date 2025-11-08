class CarrinhoDeCompras {
  // Atributos
  private itens: string[];

  constructor() {
    this.itens = [];
  }

  // Implementa o método adicionarItem
  adicionarItem(item: string): void {
    this.itens.push(item);
    console.log(`Item "${item}" adicionado.`);
  }

  // Implementa o método removerItem
  removerItem(item: string): void {
    const index = this.itens.indexOf(item);
    if (index > -1) {
      this.itens.splice(index, 1);
      console.log(`Item "${item}" removido.`);
    } else {
      console.log(`Item "${item}" não encontrado no carrinho.`);
    }
    // Mantenha a lista de itens atualizada
  }

  // Implementa o método imprimir
  imprimir(): void {
    console.log("--- Itens no Carrinho ---");
    if (this.itens.length === 0) {
      console.log("O carrinho está vazio.");
      return;
    }
    this.itens.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  }
}

// --- Código para testar a implementação ---
const carrinho = new CarrinhoDeCompras();
carrinho.adicionarItem("Camiseta");
carrinho.adicionarItem("Calça");
carrinho.adicionarItem("Meia");

// Testando o imprimir antes de remover
carrinho.imprimir();

carrinho.removerItem("Camiseta");

// Testando o imprimir após remover (o PDF pede console.log, mas o método é void)
carrinho.imprimir();