const API_URL = '/api/eventos';

document.addEventListener('DOMContentLoaded', () => {
    fetchEvents(); // Carrega a lista de eventos ao iniciar a página

    const form = document.getElementById('event-form');
    form.addEventListener('submit', handleFormSubmit);

    const searchInput = document.getElementById('search-title');
    searchInput.addEventListener('input', debounce(fetchEvents, 300)); // Pesquisa em tempo real com debounce

    document.getElementById('search-btn').addEventListener('click', fetchEvents);
});

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function displayMessage(text, isSuccess = true) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = isSuccess ? 'message success' : 'message error';
    messageElement.classList.remove('hidden');
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 4000);
}

async function fetchEvents() {
    const listElement = document.getElementById('events-list');
    const searchTitle = document.getElementById('search-title').value;
    listElement.innerHTML = '<p>Carregando eventos...</p>';

    try {
        const url = searchTitle ? `${API_URL}?titulo=${encodeURIComponent(searchTitle)}` : API_URL;
        const response = await fetch(url);
        const events = await response.json();

        listElement.innerHTML = '';

        if (!events || events.length === 0) {
            listElement.innerHTML = `<p>${searchTitle ? 'Nenhum evento encontrado com esse título.' : 'Nenhum evento cadastrado.'}</p>`;
            return;
        }

        events.forEach(event => {
            const eventCard = createEventCard(event);
            listElement.appendChild(eventCard);
        });

    } catch (error) {
        listElement.innerHTML = '<p class="error">Erro ao carregar eventos. Verifique se o servidor está rodando.</p>';
        console.error('Erro ao buscar eventos:', error);
    }
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date(event.data).toLocaleDateString('pt-BR', dateOptions);

    card.innerHTML = `
        <div class="event-details">
            <h3>${escapeHtml(event.titulo)}</h3>
            <p><strong>Descrição:</strong> ${escapeHtml(event.descricao || 'N/A')}</p>
            <p><strong>Local:</strong> ${escapeHtml(event.local)}</p>
            <p><strong>Data:</strong> ${formattedDate}</p>
            <p><strong>Valor:</strong> R$ ${Number(event.valor).toFixed(2)}</p>
        </div>
        <div class="event-actions">
            <button onclick="loadEventForEdit('${event._id}')">Editar</button>
            <button class="delete-btn" onclick="deleteEvent('${event._id}')">Excluir</button>
        </div>
    `;
    return card;
}

function escapeHtml(unsafe) {
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const eventId = document.getElementById('event-id').value;
    const method = eventId ? 'PUT' : 'POST';
    const url = eventId ? `${API_URL}/${eventId}` : API_URL;

    const eventData = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        data: document.getElementById('data').value,
        local: document.getElementById('local').value,
        valor: parseFloat(document.getElementById('valor').value),
    };

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });

        const result = await response.json();

        if (response.ok) {
            displayMessage(result.mensagem, true);
            document.getElementById('event-form').reset();
            document.getElementById('event-id').value = '';
            document.getElementById('submit-btn').textContent = 'Adicionar Evento';
            fetchEvents();
        } else {
            displayMessage(result.mensagem || 'Erro desconhecido na operação.', false);
        }

    } catch (error) {
        displayMessage('Erro de conexão com a API.', false);
        console.error('Erro de requisição:', error);
    }
}

async function loadEventForEdit(id) {
    try {
        // Tentativa: chamar GET /api/eventos/:id — se backend não tiver, buscar pela lista
        let event;
        try {
            const resp = await fetch(`${API_URL}/${id}`);
            if (resp.ok) {
                event = await resp.json();
            }
        } catch (e) {
            // ignora — fallback para buscar todos e encontrar o evento
        }

        if (!event) {
            const allResp = await fetch(API_URL);
            const all = await allResp.json();
            event = all.find(ev => ev._id === id);
        }

        if (!event) {
            displayMessage('Evento não encontrado para edição.', false);
            return;
        }

        document.getElementById('event-id').value = id;
        document.getElementById('titulo').value = event.titulo;
        document.getElementById('descricao').value = event.descricao || '';

        const date = new Date(event.data);
        const formattedDate = date.toISOString().slice(0, 16);
        document.getElementById('data').value = formattedDate;

        document.getElementById('local').value = event.local;
        document.getElementById('valor').value = event.valor;
        document.getElementById('submit-btn').textContent = 'Salvar Edição';

        document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        displayMessage('Erro ao carregar dados para edição. Verifique o backend.', false);
        console.error(error);
    }
}

async function deleteEvent(id) {
    if (!confirm('Tem certeza que deseja excluir este evento?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (response.ok) {
            displayMessage(result.mensagem, true);
            fetchEvents();
        } else {
            displayMessage(result.mensagem || 'Erro desconhecido ao excluir.', false);
        }

    } catch (error) {
        displayMessage('Erro de conexão ao tentar excluir evento.', false);
        console.error('Erro de requisição:', error);
    }
}
