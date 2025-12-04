(async () => {
  const base = process.env.BASE || 'http://localhost:3001/api';

  function pretty(obj) {
    try { return JSON.stringify(obj, null, 2); } catch(e){ return String(obj); }
  }

  try {
    const unique = Date.now();
    const email = `script+${unique}@eb.mil.br`;
    console.log('1) Criando Militar...');
    let resp = await fetch(base + '/militar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: 'Script Test', idade: 25, email, fone: '11988887777' })
    });
    let militar = null;
    try { militar = await resp.json(); } catch(e) { console.error('Erro ao parsear resposta militar:', await resp.text()); process.exit(1);}    
    console.log('Militar criado:', pretty(militar));

    const militarId = militar._id || militar.id;
    if (!militarId) {
      console.error('Não recebi _id do militar. Abortando.');
      process.exit(1);
    }

    console.log('\n2) Criando Soldado referenciando o Militar...');
    const cim = Math.floor(Math.random() * 900000) + 10000;
    resp = await fetch(base + '/soldado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cim, altura: 1.75, militar: militarId })
    });
    let soldado = null;
    try { soldado = await resp.json(); } catch(e) { console.error('Erro ao parsear resposta soldado:', await resp.text()); process.exit(1);}    
    console.log('Soldado criado:', pretty(soldado));

    console.log('\n3) Listando militares...');
    resp = await fetch(base + '/militar');
    const militares = await resp.json();
    console.log(pretty(militares));

    console.log('\n4) Listando soldados...');
    resp = await fetch(base + '/soldado');
    const soldados = await resp.json();
    console.log(pretty(soldados));

    console.log('\nFluxo concluído.');
  } catch (err) {
    console.error('Erro no script:', err);
    process.exit(1);
  }
})();
