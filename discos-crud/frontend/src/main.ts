// Interface para tipagem (deve ser similar à do backend)
interface IDisco {
  _id: string; // O MongoDB adiciona o _id
  titulo: string;
  artista: string;
  ano: number;
  genero: string;
  formato: 'Vinil' | 'CD';
  preco: number;
}

const API_URL = 'http://localhost:3000/api/discos';

// Elementos do DOM
const form = document.getElementById('disco-form') as HTMLFormElement;
const discoIdInput = document.getElementById('disco-id') as HTMLInputElement;
const tituloInput = document.getElementById('titulo') as HTMLInputElement;
const artistaInput = document.getElementById('artista') as HTMLInputElement;
const anoInput = document.getElementById('ano') as HTMLInputElement;
const generoInput = document.getElementById('genero') as HTMLInputElement;
const formatoInput = document.getElementById('formato') as HTMLSelectElement;
const precoInput = document.getElementById('preco') as HTMLInputElement;
const btnCancelar = document.getElementById('btn-cancelar') as HTMLButtonElement;
const tbody = document.getElementById('discos-tbody') as HTMLTableSectionElement;

// ---------- FUNÇÕES DE RENDERIZAÇÃO E API ----------

/**
 * Busca todos os discos na API e os renderiza na tabela. 
 */
async function fetchEListarDiscos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Falha ao buscar discos');
    }
    const discos: IDisco[] = await response.json();

    // Limpa o corpo da tabela
    tbody.innerHTML = '';

    // Preenche a tabela
    discos.forEach(disco => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${disco.titulo}</td>
        <td>${disco.artista}</td>
        <td>${disco.ano}</td>
        <td>${disco.formato}</td>
        <td>R$ ${disco.preco.toFixed(2)}</td>
        <td>
          <button class="btn-editar" data-id="${disco._id}">Editar</button>
          <button class="btn-excluir" data-id="${disco._id}">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error('Erro ao buscar discos:', error);
  }
}

/**
 * Limpa o formulário e o input oculto de ID.
 */
function limparFormulario() {
  discoIdInput.value = '';
  form.reset();
  btnCancelar.classList.add('hidden');
}

/**
 * Preenche o formulário com dados de um disco para edição. 
 */
async function carregarParaEdicao(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Disco não encontrado');
    }
    const disco: IDisco = await response.json();

    // Preenche o formulário
    discoIdInput.value = disco._id;
    tituloInput.value = disco.titulo;
    artistaInput.value = disco.artista;
    anoInput.value = String(disco.ano);
    generoInput.value = disco.genero;
    formatoInput.value = disco.formato;
    precoInput.value = String(disco.preco);

    btnCancelar.classList.remove('hidden');
    window.scrollTo(0, 0); // Rola a página para o topo (onde está o form)

  } catch (error) {
    console.error('Erro ao carregar disco para edição:', error);
  }
}

/**
 * Lida com o submit do formulário (Criar ou Atualizar)
 */
async function handleFormSubmit(event: SubmitEvent) {
  event.preventDefault();

  const id = discoIdInput.value; // Pega o ID (se houver)

  // Monta o objeto disco
  const discoData = {
    titulo: tituloInput.value,
    artista: artistaInput.value,
    ano: parseInt(anoInput.value, 10),
    genero: generoInput.value,
    formato: formatoInput.value as 'Vinil' | 'CD',
    preco: parseFloat(precoInput.value),
  };

  const method = id ? 'PUT' : 'POST'; // Se tem ID, atualiza (PUT), senão cria (POST)
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discoData),
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar disco');
    }

    limparFormulario();
    await fetchEListarDiscos(); // Recarrega a lista

  } catch (error) {
    console.error('Erro ao salvar:', error);
  }
}

/**
 * Lida com cliques na tabela (para botões de Editar ou Excluir).
 */
function handleTableClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const id = target.getAttribute('data-id');

  if (!id) return; // Sai se não clicou em um botão com data-id

  // Botão Editar
  if (target.classList.contains('btn-editar')) {
    carregarParaEdicao(id);
  }

  // Botão Excluir 
  if (target.classList.contains('btn-excluir')) {
    // Exige confirmação
    if (confirm('Tem certeza que deseja excluir este disco?')) {
      deleteDisco(id);
    }
  }
}

/**
 * Exclui um disco da API. 
 */
async function deleteDisco(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir disco');
    }

    await fetchEListarDiscos(); // Recarrega a lista

  } catch (error) {
    console.error('Erro ao excluir:', error);
  }
}

// ---------- EVENT LISTENERS ----------

// Carrega a lista quando a página é iniciada
document.addEventListener('DOMContentLoaded', fetchEListarDiscos);

// Listener para o formulário (Salvar/Atualizar)
form.addEventListener('submit', handleFormSubmit);

// Listener para os botões na tabela (Editar/Excluir)
tbody.addEventListener('click', handleTableClick);

// Listener para o botão Cancelar Edição
btnCancelar.addEventListener('click', limparFormulario);