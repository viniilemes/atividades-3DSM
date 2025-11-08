class Contato {
  nome: string;
  telefone: string;
  email: string;

  constructor(nome: string, telefone: string, email: string) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }
}

// --- Classe Agenda --- 
class Agenda {
  // Atributos
  contatos: Contato[];

  constructor() {
    this.contatos = [];
  }

  // Implementa o método adicionarContato
  adicionarContato(contato: Contato): void {
    this.contatos.push(contato);
    console.log(`Contato ${contato.nome} adicionado.`);
  }

  // Implementa o método removerContato
  removerContato(contato: Contato): void {
    const index = this.contatos.indexOf(contato);
    if (index > -1) {
      this.contatos.splice(index, 1);
      console.log(`Contato ${contato.nome} removido.`);
    } else {
      console.log(`Contato ${contato.nome} não encontrado.`);
    }
  }

  listarContatos(): void {
    console.log("--- Lista de Contatos ---");
    if (this.contatos.length === 0) {
      console.log("Agenda vazia.");
      return;
    }
    this.contatos.forEach(c => {
      console.log(`- ${c.nome} | ${c.telefone} | ${c.email}`);
    });
  }
}

// --- Linhas de código para testar as classes --- 
const agenda = new Agenda();

const contato1 = new Contato("Alice", "11 99999-1111", "alice@email.com");
const contato2 = new Contato("Bob", "11 98888-2222", "bob@email.com");
const contato3 = new Contato("Carol", "11 97777-3333", "carol@email.com");

agenda.adicionarContato(contato1);
agenda.adicionarContato(contato2);
agenda.adicionarContato(contato3);

agenda.listarContatos();

console.log("\nRemovendo Bob...");
agenda.removerContato(contato2);

agenda.listarContatos();