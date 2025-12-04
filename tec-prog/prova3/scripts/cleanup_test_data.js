/*
 Cleanup test data script (dry-run by default).

 Usage:
  - Dry run (shows what would be deleted):
      node scripts/cleanup_test_data.js

  - Confirm and execute deletions (Bash):
      CONFIRM=true node scripts/cleanup_test_data.js

  - Confirm and execute deletions (PowerShell):
      $env:CONFIRM = 'true'; node .\scripts\cleanup_test_data.js

 The script will:
  - find `Militar` documents whose `email` contains `joao+` or `script+` or equals `joao@eb.mil.br`
  - delete them via the API `DELETE /api/militar`
  - find `Soldado` documents whose `militar` matches deleted militar ids and delete them via `DELETE /api/soldado`
  - list `Patente` candidates (codigo=1 && descricao==='Soldado') and optionally delete them if CONFIRM=true
*/

(async () => {
  const base = process.env.BASE || 'http://localhost:3001/api';
  const confirm = (process.env.CONFIRM || '').toLowerCase() === 'true';
  const fetch = global.fetch || (await import('node:undici')).fetch;

  function pretty(obj){ try { return JSON.stringify(obj, null, 2); } catch(e){ return String(obj);} }

  console.log('API base:', base);

  // 1) Get militars
  const milRes = await fetch(base + '/militar');
  const militars = await milRes.json();

  const militarsToDelete = militars.filter(m => {
    if (!m.email) return false;
    const e = m.email.toLowerCase();
    return e.includes('joao+') || e.includes('script+') || e === 'joao@eb.mil.br';
  });

  console.log('\nMilitars found:', militars.length, 'candidates to delete:', militarsToDelete.length);
  militarsToDelete.forEach(m => console.log(' -', m._id, m.email));

  // 2) Get soldados
  const solRes = await fetch(base + '/soldado');
  const soldados = await solRes.json();

  // determine soldado candidates whose militar matches
  const militarIds = new Set(militarsToDelete.map(m => m._id));
  const soldadosToDelete = soldados.filter(s => {
    // s.militar may be populated object or id string
    const mid = s.militar && (typeof s.militar === 'string' ? s.militar : s.militar._id || s.militar.id);
    return mid && militarIds.has(mid);
  });

  console.log('\nSoldados total:', soldados.length, 'candidates to delete (linked to militars):', soldadosToDelete.length);
  soldadosToDelete.forEach(s => console.log(' -', s._id, 'cim:', s.cim));

  // 3) Patentes candidates
  const patRes = await fetch(base + '/patente');
  const patentes = await patRes.json();
  const patentesToDelete = patentes.filter(p => p.codigo === 1 && p.descricao && p.descricao.toLowerCase() === 'soldado');
  console.log('\nPatentes total:', patentes.length, 'candidates to delete (codigo=1, descricao=Soldado):', patentesToDelete.length);
  patentesToDelete.forEach(p => console.log(' -', p._id, 'codigo:', p.codigo, 'descricao:', p.descricao));

  if (!confirm) {
    console.log('\nDry run only. No deletions were made.');
    console.log('To actually delete the listed documents set CONFIRM=true and re-run:');
    console.log('\n  Bash: CONFIRM=true node scripts/cleanup_test_data.js');
    console.log("  PowerShell: $env:CONFIRM='true'; node .\\scripts\\cleanup_test_data.js");
    process.exit(0);
  }

  console.log('\nProceeding with deletions...');

  // delete soldados first (to avoid cascading issues)
  for (const s of soldadosToDelete) {
    try {
      const r = await fetch(base + '/soldado', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: s._id }) });
      const j = await r.json();
      console.log('Deleted soldado', s._id, '->', j);
    } catch (e) { console.error('Error deleting soldado', s._id, e); }
  }

  // delete militars
  for (const m of militarsToDelete) {
    try {
      const r = await fetch(base + '/militar', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: m._id }) });
      const j = await r.json();
      console.log('Deleted militar', m._id, '->', j);
    } catch (e) { console.error('Error deleting militar', m._id, e); }
  }

  // delete patentes
  for (const p of patentesToDelete) {
    try {
      const r = await fetch(base + '/patente', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: p._id }) });
      const j = await r.json();
      console.log('Deleted patente', p._id, '->', j);
    } catch (e) { console.error('Error deleting patente', p._id, e); }
  }

  console.log('\nCleanup finished.');
})();
