class AutenticacaoDeUsuario {
  // Atributos 
  usuarios: Map<string, string>;

  constructor() {
    this.usuarios = new Map<string, string>();
  }

  // Método para registrar usuário 
  registrarUsuario(usuario: string, senha: string): void {
    if (this.usuarios.has(usuario)) {
      console.log(`Usuário "${usuario}" já existe.`);
    } else {
      this.usuarios.set(usuario, senha);
      console.log(`Usuário "${usuario}" registrado com sucesso.`);
    }
  }

  // Método para autenticar usuário 
  autenticarUsuario(usuario: string, senha: string): boolean {
    const senhaArmazenada = this.usuarios.get(usuario);
    return senhaArmazenada !== undefined && senhaArmazenada === senha;
  }
}

// --- Execute as linhas a seguir para testar suas classes ---
// Atenção: evite colocar senhas reais no código antes de enviar ao GitHub.
// Este arquivo agora usa variáveis de ambiente (se definidas) com valores
// padrão não sensíveis para testes locais.

const autenticacao = new AutenticacaoDeUsuario();

// Captura senhas a partir de variáveis de ambiente (ex.: ALI_PASS), com
// fallback para strings de exemplo (não-sensíveis) — você pode criar um
// arquivo `.env` local com valores reais se precisar testar com senhas reais.
const alicePass = process.env.ALI_PASS || "example";
const bobPass = process.env.BOB_PASS || "example2";

autenticacao.registrarUsuario("alice", alicePass);
autenticacao.registrarUsuario("bob", bobPass);

// Teste 1: Autenticação bem-sucedida
console.log("\nTestando Alice...");
let usuarioAutenticado = autenticacao.autenticarUsuario("alice", alicePass);

if (usuarioAutenticado) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}

// Teste 2: Falha na autenticação (senha errada)
console.log("\nTestando Bob com senha errada...");
usuarioAutenticado = autenticacao.autenticarUsuario("bob", "senha123");

if (usuarioAutenticado) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}

// Teste 3: Falha na autenticação (usuário inexistente)
console.log("\nTestando 'charlie'...");
usuarioAutenticado = autenticacao.autenticarUsuario("charlie", "senha123");

if (usuarioAutenticado) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}