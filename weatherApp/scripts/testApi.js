import axios from 'axios';

const localUrl = 'http://localhost:3000/api/weather?city=Ca%C3%A7apava';
const remoteUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Ca%C3%A7apava&appid=27e56366617146b4ef5024ee09933408&units=metric&lang=pt_br';

(async () => {
  try {
    console.log('Chamando endpoint local...');
    const local = await axios.get(localUrl);
    console.log('LOCAL status:', local.status);
    console.log('LOCAL data:', JSON.stringify(local.data, null, 2));
  } catch (err) {
    console.error('LOCAL error:', err.response?.status, err.response?.data || err.message);
  }

  try {
    console.log('\nChamando OpenWeather diretamente...');
    const remote = await axios.get(remoteUrl);
    console.log('REMOTE status:', remote.status);
    console.log('REMOTE data:', JSON.stringify(remote.data, null, 2));
  } catch (err) {
    console.error('REMOTE error:', err.response?.status, err.response?.data || err.message);
  }
})();
