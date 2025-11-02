import * as fs from 'fs';
import { Meteo } from './models/Meteo';

function loadCSV(filePath: string): string[] {
  const txt = fs.readFileSync(filePath, { encoding: 'utf8' });
  const lines = txt.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  return lines;
}

function parseData(lines: string[]): Meteo[] {
  const header = lines[0];
  const rows = lines.slice(1);
  const items: Meteo[] = [];
  for (const r of rows) {
    const m = Meteo.fromCSVRow(r);
    if (m) items.push(m);
  }
  return items;
}

function findHighestTemps(items: Meteo[], top = 10) {
  return items
    .filter(i => i.tempC !== null)
    .sort((a, b) => (b.tempC! - a.tempC!))
    .slice(0, top);
}

function average(values: (number | null)[]) {
  const nums = values.filter((v): v is number => v !== null);
  if (nums.length === 0) return null;
  return nums.reduce((s, v) => s + v, 0) / nums.length;
}

function findHighestPressures(items: Meteo[], top = 10) {
  return items
    .filter(i => i.pressBar !== null)
    .sort((a, b) => (b.pressBar! - a.pressBar!))
    .slice(0, top);
}

async function run() {
  const csvPath = 'dados.csv';
  if (!fs.existsSync(csvPath)) {
    console.error(`File not found: ${csvPath}. Please copy the original CSV into this folder and name it dados.csv`);
    process.exit(1);
  }

  console.log('Reading CSV...');
  const lines = loadCSV(csvPath);
  console.log(`Lines (including header): ${lines.length}`);
  const items = parseData(lines);
  console.log(`Parsed records: ${items.length}`);

  console.log('\nTop 10 highest temperatures:');
  const tops = findHighestTemps(items);
  for (const t of tops) {
    console.log(`${t.date} ${t.time} -> ${t.tempC} °C`);
  }

  console.log('\nAverage temperature (all records):', average(items.map(i => i.tempC)));
  console.log('Average wind speed (all records):', average(items.map(i => i.windSpeedAvg)));
  console.log('Average humidity (all records):', average(items.map(i => i.hum)));

  console.log('\nTop 10 highest pressures:');
  const pTops = findHighestPressures(items);
  for (const p of pTops) {
    console.log(`${p.date} ${p.time} -> ${p.pressBar} bar`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
