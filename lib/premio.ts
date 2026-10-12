import { RETO } from "@/config/reto";

const KEY = "corralito-reto-premio";

// "YYYY-MM-DD" en la zona horaria del restaurante.
export function dayKey(d: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: RETO.timeZone }).format(d);
}

export function saveWin() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ wonAt: new Date().toISOString() }));
  } catch {}
}

// Devuelve la hora en que ganó si fue hoy; si no, null.
export function getWinToday(): Date | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const wonAt = new Date(JSON.parse(raw).wonAt);
    if (Number.isNaN(wonAt.getTime())) return null;
    return dayKey(wonAt) === dayKey() ? wonAt : null;
  } catch {
    return null;
  }
}
