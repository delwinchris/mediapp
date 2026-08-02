import { useEffect, useState, useCallback } from 'react';
import type { DashboardMetrics } from '@/types';
import { mockRecoveryLogs, mockMentalLogs, mockExerciseHistory } from '@/lib/mockDatabase';
import { mockGoals } from '@/lib/mockDatabase';

/**
 * Calculates all dashboard metrics from mock data.
 * When Supabase is connected, this hook will fetch data from the database
 * instead of importing mock data directly.
 */

export function useDashboardMetrics(): { metrics: DashboardMetrics | null; loading: boolean } {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const calculate = useCallback(() => {
    const logs = mockRecoveryLogs;
    const mental = mockMentalLogs;
    const exerciseSessions = mockExerciseHistory;

    if (logs.length === 0) {
      return null;
    }

    // Use last 7 days for current period
    const recentLogs = logs.slice(-7);
    const recentMental = mental.slice(-7);

    // Recovery Score: weighted average of pain (inverted), mobility, sleep, energy, mood
    const avgPain = recentLogs.reduce((s, l) => s + l.pain, 0) / recentLogs.length;
    const avgMobility = recentLogs.reduce((s, l) => s + l.mobility, 0) / recentLogs.length;
    const avgSleep = recentLogs.reduce((s, l) => s + l.sleep, 0) / recentLogs.length;
    const avgEnergy = recentLogs.reduce((s, l) => s + l.energy, 0) / recentLogs.length;
    const avgMood = recentLogs.reduce((s, l) => s + l.mood, 0) / recentLogs.length;

    const painScore = (10 - avgPain) * 10;
    const mobilityScore = avgMobility * 5;
    const sleepScore = (avgSleep / 8) * 25;
    const energyScore = avgEnergy * 2.5;
    const moodScore = avgMood * 2.5;
    const recoveryScore = Math.round(Math.min(100, Math.max(0, painScore + mobilityScore + sleepScore + energyScore + moodScore)));

    // Recovery Readiness: combination of recovery score + exercise completion + mental wellness
    const exerciseCompletion = Math.round(
      (exerciseSessions.filter((s) => s.completed).length / Math.max(1, exerciseSessions.length)) * 100
    );

    // Mental Wellness Score: average of inverted anxiety, fear, stress + confidence, motivation
    const avgAnxiety = recentMental.reduce((s, m) => s + m.anxiety, 0) / recentMental.length;
    const avgConfidence = recentMental.reduce((s, m) => s + m.confidence, 0) / recentMental.length;
    const avgFear = recentMental.reduce((s, m) => s + m.fearOfReinjury, 0) / recentMental.length;
    const avgMotivation = recentMental.reduce((s, m) => s + m.motivation, 0) / recentMental.length;
    const avgStress = recentMental.reduce((s, m) => s + m.stress, 0) / recentMental.length;
    const mentalWellnessScore = Math.round(
      ((10 - avgAnxiety) + avgConfidence + (10 - avgFear) + avgMotivation + (10 - avgStress)) / 5 * 10
    );

    const recoveryReadiness = Math.round(
      recoveryScore * 0.4 + exerciseCompletion * 0.3 + mentalWellnessScore * 0.3
    );

    // Consistency Score: percentage of days with a recovery log in the last 30 days
    const last30 = logs.slice(-30);
    const consistencyScore = Math.round((last30.length / 30) * 100);

    // Streak: consecutive days with logs from most recent
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[logs.length - 1 - i].date + 'T00:00:00');
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      if (logDate.toDateString() === expected.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    // Trends: compare last 7 days vs previous 7 days
    const prevLogs = logs.slice(-14, -7);
    const prevAvgPain = prevLogs.length > 0 ? prevLogs.reduce((s, l) => s + l.pain, 0) / prevLogs.length : avgPain;
    const prevAvgMobility = prevLogs.length > 0 ? prevLogs.reduce((s, l) => s + l.mobility, 0) / prevLogs.length : avgMobility;

    return {
      recoveryScore,
      recoveryReadiness,
      exerciseCompletion,
      mentalWellnessScore,
      consistencyScore,
      streak: Math.max(streak, 30),
      painTrend: Math.round((avgPain - prevAvgPain) * 10) / 10,
      mobilityTrend: Math.round((avgMobility - prevAvgMobility) * 10) / 10,
    };
  }, []);

  useEffect(() => {
    const result = calculate();
    setMetrics(result);
    setLoading(false);
  }, [calculate]);

  return { metrics, loading };
}
