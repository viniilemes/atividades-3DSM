const expenseForm = document.getElementById('expenseForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const expenseIdInput = document.getElementById('expenseId');
const expenseList = document.getElementById('expenseList');
const totalExpensesEl = document.getElementById('totalExpenses');
const submitButton = document.getElementById('submitButton');

const API_URL = 'http://localhost:3000/api/expenses';

// Carregar despesas e o somatório ao iniciar a página [cite: 124]
window.addEventListener('DOMContentLoaded', () => {
  fetchExpenses(); // [cite: 126]
  fetchTotalExpenses(); // [cite: 127]
});

// Função para buscar o total das despesas [cite: 114]
async function fetchTotalExpenses() {
  try {
    const response = await fetch(`${API_URL}/total`); // [cite: 117]
    const data = await response.json(); // [cite: 117]
    // Atualiza o texto do elemento total [cite: 118]
    totalExpensesEl.innerText = `Total das Despesas: R$${data.totalAmount.toFixed(2)}`; // [cite: 119]
  } catch (error) { // [cite: 120]
    console.error('Erro ao buscar o total das despesas:', error); // [cite: 121]
  }
}

// Função para buscar e exibir todas as despesas
async function fetchExpenses() {
  try {
    const response = await fetch(API_URL);
    const expenses = await response.json();

    expenseList.innerHTML = ''; // Limpa a lista atual

    expenses.forEach(expense => {
      const li = document.createElement('li');

      // Formata data [cite: 27] e valor [cite: 26]
      const formattedDate = new Date(expense.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
      const formattedAmount = Number(expense.amount).toFixed(2);

      li.innerHTML = `
        <span>${expense.description} - R$${formattedAmount} - ${formattedDate}</span>
        <div>
          <button class="btn-alterar" data-id="${expense._id}">Alterar</button>
          <button class="btn-excluir" data-id="${expense._id}">Excluir</button>
        </div>
      `;

      // Guarda os dados no elemento para facilitar a edição
      li.dataset.id = expense._id;
      li.dataset.description = expense.description;
      li.dataset.amount = expense.amount;
      li.dataset.date = expense.date.split('T')[0]; // Formato YYYY-MM-DD para o input date

      expenseList.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao buscar despesas:', error);
  }
}

// Lidar com submit do formulário (Adicionar ou Atualizar)
expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = amountInput.value;
  const date = dateInput.value;
  const id = expenseIdInput.value; // ID para edição

  // Validação frontend (extra) [cite: 58]
  if (!description || amount <= 0) {
    alert('Por favor, preencha a descrição e um valor positivo.');
    return;
  }

  const expenseData = {
    description,
    amount: parseFloat(amount),
    date: date ? date : undefined // Envia undefined se vazio para usar o default do backend
  };

  try {
    let response;
    if (id) {
      // Modo de Edição (Atualizar) [cite: 46]
      response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });
    } else {
      // Modo de Criação [cite: 45]
      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao salvar despesa');
    }

    resetForm();
    fetchExpenses();
    fetchTotalExpenses(); // Recalcula total após adicionar/editar [cite: 48, 131]
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});

// Lidar com cliques nos botões de Excluir e Alterar
expenseList.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('btn-excluir')) {
    // Exclusão de Despesa [cite: 47]
    const id = target.dataset.id;
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
      deleteExpense(id);
    }
  }

  if (target.classList.contains('btn-alterar')) {
    // Edição de Despesa [cite: 46]
    const li = target.closest('li');
    startEditMode(li.dataset);
  }
});

// Função para deletar despesa
async function deleteExpense(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchExpenses();
    fetchTotalExpenses(); // Recalcula total após excluir [cite: 48, 131]
  } catch (error) {
    console.error('Erro ao excluir despesa:', error);
  }
}

// Prepara o formulário para edição
function startEditMode(data) {
  expenseIdInput.value = data.id;
  descriptionInput.value = data.description;
  amountInput.value = data.amount;
  dateInput.value = data.date;
  submitButton.textContent = 'Atualizar Despesa';
  window.scrollTo(0, 0); // Rola para o topo (formulário)
}

// Reseta o formulário
function resetForm() {
  expenseForm.reset();
  expenseIdInput.value = '';
  submitButton.textContent = 'Cadastrar Despesa';
}