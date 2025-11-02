export class Meteo {
  date: string;
  time: string;
  tempC: number | null;
  hum: number | null;
  pressBar: number | null;
  windSpeedAvg: number | null;

  constructor(date: string, time: string, tempC: number | null, hum: number | null, pressBar: number | null, windSpeedAvg: number | null) {
    this.date = date;
    this.time = time;
    this.tempC = tempC;
    this.hum = hum;
    this.pressBar = pressBar;
    this.windSpeedAvg = windSpeedAvg;
  }

  static parsePtBrNumber(value: string): number | null {
    if (!value) return null;
    // remove spaces, replace comma with dot
    const normalized = value.trim().replace(/\./g, '').replace(',', '.');
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }

  static fromCSVRow(row: string): Meteo | null {
    // CSV uses semicolon (;) as separator and numbers use comma as decimal separator.
    // Expected header (example): Date;Time;Temp_C;Hum;Press_Bar;TempCabine_C;Charge;SR_Wm2;WindPeak_ms;WindSpeed_Inst;WindSpeed_Avg;...
    const cols = row.split(';');
    // Need at least up to WindSpeed_Avg (index 10)
    if (cols.length < 11) return null;
    const date = cols[0].trim();
    const time = cols[1].trim();
    const tempC = Meteo.parsePtBrNumber(cols[2]);
    const hum = Meteo.parsePtBrNumber(cols[3]);
    const pressBar = Meteo.parsePtBrNumber(cols[4]);
    // WindSpeed_Avg is at index 10 in the provided CSV header
    const windSpeedAvg = Meteo.parsePtBrNumber(cols[10]);
    return new Meteo(date, time, tempC, hum, pressBar, windSpeedAvg);
  }
}
