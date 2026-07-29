import { recoveryHistory, mentalHistory } from './mockData';

export function computeRecoveryScore(dayIndex = recoveryHistory.length - 1): number {
  const entry = recoveryHistory[dayIndex];
  if (!entry) return 0;
  const painScore = (10 - entry.pain) * 10;
  const mobilityScore = entry.mobility * 5;
  const sleepScore = (entry.sleep / 8) * 25;
  const energyScore = entry.energy * 2.5;
  const moodScore = entry.mood * 2.5;
  const total = painScore + mobilityScore + sleepScore + energyScore + moodScore;
  return Math.round(Math.min(100, Math.max(0, total)));
}

export function recoveryScoreSeries(): { date: string; score: number }[] {
  return recoveryHistory.map((_, i) => ({
    date: recoveryHistory[i].date.slice(5),
    score: computeRecoveryScore(i),
  }));
}

export function painSeries() {
  return recoveryHistory.map((e) => ({ date: e.date.slice(5), value: e.pain }));
}
export function moodSeries() {
  return recoveryHistory.map((e) => ({ date: e.date.slice(5), value: e.mood }));
}
export function sleepSeries() {
  return recoveryHistory.map((e) => ({ date: e.date.slice(5), value: e.sleep }));
}
export function mobilitySeries() {
  return recoveryHistory.map((e) => ({ date: e.date.slice(5), value: e.mobility }));
}

export function mentalSeries(key: keyof typeof mentalHistory[number]) {
  return mentalHistory.map((e) => ({ date: e.date.slice(5), value: e[key] as number }));
}

export function getStreak(): number {
  return 7;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
