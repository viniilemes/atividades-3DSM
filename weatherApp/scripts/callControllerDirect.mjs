import { getWeather } from '../dist/controllers/weatherController.js';

function makeReq(city) {
  return { query: { city } };
}

function makeRes() {
  return {
    status(code) { this._status = code; return this; },
    json(obj) { console.log('RESPONSE:', this._status || 200, obj); }
  };
}

(async () => {
  console.log('Calling getWeather with city containing ç (encoded)');
  await getWeather(makeReq('Caçapava'), makeRes());

  console.log('\nCalling getWeather with city already encoded');
  await getWeather(makeReq('Ca%C3%A7apava'), makeRes());

  console.log('\nCalling getWeather with Sao Jose');
  await getWeather(makeReq('São José dos Campos'), makeRes());
})();
