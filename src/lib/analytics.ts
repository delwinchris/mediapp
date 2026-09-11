import type { MentalEntry, RecoveryEntry } from './types';

export function computeRecoveryScore(entry?: RecoveryEntry): number {
  if (!entry) return 0;
  const painScore = (10 - entry.pain) * 10;
  const mobilityScore = entry.mobility * 5;
  const sleepScore = (entry.sleep / 8) * 25;
  const energyScore = entry.energy * 2.5;
  const moodScore = entry.mood * 2.5;
  const total = painScore + mobilityScore + sleepScore + energyScore + moodScore;
  return Math.round(Math.min(100, Math.max(0, total)));
}

export function recoveryScoreSeries(entries: RecoveryEntry[] = []): { date: string; score: number }[] {
  return entries.map((entry) => ({
    date: entry.date.slice(5), score: computeRecoveryScore(entry),
  }));
}

export function painSeries(entries: RecoveryEntry[] = []) {
  return entries.map((e) => ({ date: e.date.slice(5), value: e.pain }));
}
export function moodSeries(entries: RecoveryEntry[] = []) {
  return entries.map((e) => ({ date: e.date.slice(5), value: e.mood }));
}
export function sleepSeries(entries: RecoveryEntry[] = []) {
  return entries.map((e) => ({ date: e.date.slice(5), value: e.sleep }));
}
export function mobilitySeries(entries: RecoveryEntry[] = []) {
  return entries.map((e) => ({ date: e.date.slice(5), value: e.mobility }));
}

export function mentalSeries(entriesOrKey: MentalEntry[] | keyof MentalEntry = [], requestedKey: keyof MentalEntry = 'anxiety') {
  const entries = Array.isArray(entriesOrKey) ? entriesOrKey : [];
  const key = Array.isArray(entriesOrKey) ? requestedKey : entriesOrKey;
  return entries.map((e) => ({ date: e.date.slice(5), value: e[key] as number }));
}

export function getStreak(entries: RecoveryEntry[] = []): number {
  const dates = new Set(entries.map((entry) => entry.date));
  let streak = 0;
  const cursor = new Date();
  while (dates.has(cursor.toISOString().slice(0, 10))) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
