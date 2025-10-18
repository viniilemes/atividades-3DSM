document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

async function getWeather(city) {
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');

    // Reset view
    weatherResult.classList.add('hidden');
    errorMessage.classList.add('hidden');

    if (!city) {
        showError('Por favor, digite o nome de uma cidade.'); // Validação para buscas vazias
        return;
    }

    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(data.message);
        }

        displayWeather(data);
    } catch (error) {
        showError(error.message); // Mensagem quando a cidade não é encontrada
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`; // Nome da cidade e país
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`; // Temperatura atual
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Ícone representando a condição climática
    document.getElementById('description').textContent = data.weather[0].description; // Condição do tempo
    document.getElementById('humidity').textContent = `Umidade: ${data.main.humidity}%`; // Umidade
    document.getElementById('feels-like').textContent = `Sensação térmica: ${Math.round(data.main.feels_like)}°C`; // Sensação térmica

    document.getElementById('weather-result').classList.remove('hidden');
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}