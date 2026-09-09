import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartPulse, Smile, Moon, Footprints, Flame, ArrowRight, Check, Sparkles, Dumbbell,
  Droplets, Pill, TrendingUp, BookHeart, Trophy, LifeBuoy, Calendar, Quote, Brain,
  Sunrise, Sun, Sunset, Play, ClipboardList, Activity,
  Target, Mountain, Mail, type LucideIcon,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAuth } from '@/lib/auth';
import { useAppStore } from '@/lib/store';
import {
  aiCoachMessage,
} from '@/lib/mockData';
import { formatDate } from '@/lib/analytics';
import { getAiEncouragement, myWhyOptions } from '@/lib/emotionalData';
import { recoveryLogService } from '@/services';
import type { MentalEntry, RecoveryEntry } from '@/lib/types';
import { cn } from '@/lib/cn';

const insightIcons: Record<string, LucideIcon> = { HeartPulse, Smile, Moon, Dumbbell, TrendingUp, Brain };
const insightAccents: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-400 to-amber-500',
  violet: 'from-violet-500 to-violet-600',
  rose: 'from-rose-400 to-rose-500',
  sky: 'from-sky-400 to-sky-500',
};

function computeScore(entry: RecoveryEntry): number {
  const painScore = (10 - entry.pain) * 10;
  const mobilityScore = entry.mobility * 5;
  const sleepScore = (entry.sleep / 8) * 25;
  const energyScore = entry.energy * 2.5;
  const moodScore = entry.mood * 2.5;
  return Math.round(Math.min(100, Math.max(0, painScore + mobilityScore + sleepScore + energyScore + moodScore)));
}

function computeStreak(entries: RecoveryEntry[]): number {
  if (entries.length === 0) return 0;
  const dates = [...new Set(entries.map((e) => e.date))].sort();
  let streak = 1;
  for (let i = dates.length - 1; i > 0; i--) {
    const prev = new Date(dates[i - 1] + 'T00:00:00');
    const curr = new Date(dates[i] + 'T00:00:00');
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diffDays === 1) streak++;
    else break;
  }
  return streak;
}

function computeRecoveryDay(startDate?: string): number | null {
  if (!startDate) return null;
  const start = new Date(`${startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;
  return Math.max(1, Math.floor((Date.now() - start.getTime()) / 86400000) + 1);
}

function formatActivityDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function DashboardPage() {
  const { user } = useAuth();
  const { goals, updateGoal, mentalLogs } = useAppStore();
  const [history, setHistory] = useState<RecoveryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    recoveryLogService.getAll()
      .then((entries) => { if (mounted) setHistory(entries); })
      .catch((err) => console.error('Failed to load recovery history:', err))
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayEntry = history.find((e) => e.date === todayStr);
  const latestEntry = history[history.length - 1];
  const latestPersistedEntry = history[0];

  const score = todayEntry ? computeScore(todayEntry) : (latestEntry ? computeScore(latestEntry) : 0);
  const streak = computeStreak(history);
  const series = history.map((e) => ({ date: e.date.slice(5), score: computeScore(e) }));
  const painData = history.map((e) => ({ date: e.date.slice(5), value: e.pain }));
  const mobilityData = history.map((e) => ({ date: e.date.slice(5), value: e.mobility }));

  const firstName = user?.name?.split(' ')[0] ?? 'there';
  const recoveryStartDate = user?.profile?.surgeryDate ?? user?.profile?.injuryDate;
  const recoveryDayMetric = computeRecoveryDay(recoveryStartDate);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const greetingIcon = hour < 12 ? Sunrise : hour < 18 ? Sun : Sunset;
  const GreetingIcon = greetingIcon;
  const toggleGoal = async (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (!goal) return;
    const completed = goal.status === 'completed';
    await updateGoal(id, { status: completed ? 'active' : 'completed', progress: completed ? 0 : 100 });
  };
  const completedGoals = goals.filter((g) => g.status === 'completed').length;
  const activeGoals = goals.filter((g) => g.status === 'active');
  const dashboardGoals = (activeGoals.length > 0 ? activeGoals : goals).slice(0, 4);

  const userMyWhy = user?.profile?.myWhy;
  const myWhyOption = userMyWhy ? myWhyOptions.find((o) => o.value === userMyWhy) : undefined;
  const aiEncouragement = getAiEncouragement(recoveryDayMetric ?? 0);
  const motivationMessage = history.length > 0
    ? 'Keep taking recovery one check-in at a time.'
    : 'Every recovery journey starts with one small step.';
  const dailyEncouragement = 'Keep taking the next step that supports your recovery today.';
  const recoveryReadiness = latestPersistedEntry ? computeScore(latestPersistedEntry) : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - 6);
  const previousWeekStart = new Date(today);
  previousWeekStart.setDate(today.getDate() - 13);
  const previousWeekEnd = new Date(today);
  previousWeekEnd.setDate(today.getDate() - 7);
  const getLocalDate = (date: string) => new Date(`${date}T00:00:00`);
  const currentWeekEntries = history.filter((entry) => {
    const date = getLocalDate(entry.date);
    return date >= currentWeekStart && date <= today;
  });
  const previousWeekEntries = history.filter((entry) => {
    const date = getLocalDate(entry.date);
    return date >= previousWeekStart && date <= previousWeekEnd;
  });
  const average = (entries: RecoveryEntry[], getValue: (entry: RecoveryEntry) => number) =>
    entries.length > 0 ? entries.reduce((sum, entry) => sum + getValue(entry), 0) / entries.length : null;
  const currentWeekScore = average(currentWeekEntries, computeScore);
  const previousWeekScore = average(previousWeekEntries, computeScore);
  const currentWeekPain = average(currentWeekEntries, (entry) => entry.pain);
  const previousWeekPain = average(previousWeekEntries, (entry) => entry.pain);
  const currentWeekMobility = average(currentWeekEntries, (entry) => entry.mobility * 10);
  const previousWeekMobility = average(previousWeekEntries, (entry) => entry.mobility * 10);
  const currentWeekMentalLogs = mentalLogs.filter((entry) => {
    const date = getLocalDate(entry.date);
    return date >= currentWeekStart && date <= today;
  });
  const previousWeekMentalLogs = mentalLogs.filter((entry) => {
    const date = getLocalDate(entry.date);
    return date >= previousWeekStart && date <= previousWeekEnd;
  });
  const averageMental = (entries: MentalEntry[], getValue: (entry: MentalEntry) => number) =>
    entries.length > 0 ? entries.reduce((sum, entry) => sum + getValue(entry), 0) / entries.length : null;
  const currentWeekSleep = average(currentWeekEntries, (entry) => entry.sleep);
  const currentWeekEnergy = average(currentWeekEntries, (entry) => entry.energy);
  const currentWeekMood = average(currentWeekEntries, (entry) => entry.mood);
  const currentWeekAnxiety = averageMental(currentWeekMentalLogs, (entry) => entry.anxiety);
  const previousWeekAnxiety = averageMental(previousWeekMentalLogs, (entry) => entry.anxiety);
  const currentWeekConfidence = averageMental(currentWeekMentalLogs, (entry) => entry.confidence);
  const previousWeekConfidence = averageMental(previousWeekMentalLogs, (entry) => entry.confidence);
  const currentWeekStress = averageMental(currentWeekMentalLogs, (entry) => entry.stress);
  const previousWeekStress = averageMental(previousWeekMentalLogs, (entry) => entry.stress);
  const last30Start = new Date(today);
  last30Start.setDate(today.getDate() - 29);
  const recentRecoveryDays = new Set(history.filter((entry) => {
    const date = getLocalDate(entry.date);
    return date >= last30Start && date <= today;
  }).map((entry) => entry.date));
  const recentMentalDays = new Set(mentalLogs.filter((entry) => {
    const date = getLocalDate(entry.date);
    return date >= last30Start && date <= today;
  }).map((entry) => entry.date));
  const dnaComponents = [
    recentRecoveryDays.size > 0 ? Math.round((recentRecoveryDays.size / 30) * 100) : null,
    currentWeekScore,
    goals.length > 0 ? goals.reduce((sum, goal) => sum + Math.min(100, Math.max(0, goal.progress)), 0) / goals.length : null,
    recentMentalDays.size > 0 ? Math.round((recentMentalDays.size / 30) * 100) : null,
  ].filter((value): value is number => value !== null);
  const dnaAvg = dnaComponents.length > 0
    ? Math.round(dnaComponents.reduce((sum, value) => sum + value, 0) / dnaComponents.length)
    : null;
  const todaysMission = !todayEntry
    ? { title: 'Log today\'s recovery check-in', detail: 'Record how you feel to keep your recovery data current.' }
    : activeGoals[0]
      ? { title: `Continue: ${activeGoals[0].title}`, detail: `${Math.min(100, Math.max(0, activeGoals[0].progress))}% progress on your active goal.` }
      : { title: 'Keep tracking your recovery', detail: 'Your check-in is recorded. Continue logging your recovery as it changes.' };
  const recoveryScoreChange = currentWeekScore !== null && previousWeekScore !== null
    ? Math.round((currentWeekScore - previousWeekScore) * 10) / 10
    : null;
  const upcomingMilestones = goals
    .filter((goal) => goal.status !== 'completed' && goal.targetDate && getLocalDate(goal.targetDate) >= today)
    .sort((a, b) => a.targetDate.localeCompare(b.targetDate))
    .slice(0, 3);
  const activeGoalSummary = activeGoals.length > 0
    ? `You have ${activeGoals.length} active ${activeGoals.length === 1 ? 'goal' : 'goals'} to work toward.`
    : 'No active goals. Create one to define your next step.';
  const formatChange = (current: number | null, previous: number | null, suffix = '') => {
    if (current === null || previous === null) return '—';
    const change = Math.round((current - previous) * 10) / 10;
    return `${change > 0 ? '+' : ''}${change}${suffix}`;
  };
  const realInsights = [
    ...(currentWeekEntries.length >= 2 && previousWeekEntries.length >= 2 && currentWeekPain !== null && previousWeekPain !== null ? [{
      id: 'pain-trend', title: 'Pain trend', description: `Average pain is ${currentWeekPain.toFixed(1)}/10 this week, compared with ${previousWeekPain.toFixed(1)}/10 in the previous 7 days.`, icon: 'HeartPulse', trend: currentWeekPain <= previousWeekPain ? 'up' as const : 'down' as const, trendValue: formatChange(currentWeekPain, previousWeekPain), accent: 'rose',
    }] : []),
    ...(currentWeekEntries.length >= 2 && previousWeekEntries.length >= 2 && currentWeekMobility !== null && previousWeekMobility !== null ? [{
      id: 'mobility-trend', title: 'Mobility trend', description: `Average mobility is ${currentWeekMobility.toFixed(1)}% this week, compared with ${previousWeekMobility.toFixed(1)}% in the previous 7 days.`, icon: 'Footprints', trend: currentWeekMobility >= previousWeekMobility ? 'up' as const : 'down' as const, trendValue: formatChange(currentWeekMobility, previousWeekMobility, '%'), accent: 'emerald',
    }] : []),
    ...(currentWeekEntries.length >= 2 && previousWeekEntries.length >= 2 && currentWeekScore !== null && previousWeekScore !== null ? [{
      id: 'score-trend', title: 'Recovery score trend', description: `Average recovery score is ${currentWeekScore.toFixed(0)} this week, compared with ${previousWeekScore.toFixed(0)} in the previous 7 days.`, icon: 'TrendingUp', trend: currentWeekScore >= previousWeekScore ? 'up' as const : 'down' as const, trendValue: formatChange(currentWeekScore, previousWeekScore), accent: 'violet',
    }] : []),
    ...(currentWeekSleep !== null ? [{
      id: 'sleep-average', title: 'Sleep average', description: `You logged an average of ${currentWeekSleep.toFixed(1)} hours of sleep across ${currentWeekEntries.length} recovery ${currentWeekEntries.length === 1 ? 'check-in' : 'check-ins'} this week.`, icon: 'Moon', trend: 'neutral' as const, trendValue: `${currentWeekSleep.toFixed(1)}h`, accent: 'amber',
    }] : []),
    ...(currentWeekEnergy !== null ? [{
      id: 'energy-average', title: 'Energy average', description: `Your logged average energy level is ${currentWeekEnergy.toFixed(1)}/10 across this week's recovery check-ins.`, icon: 'TrendingUp', trend: 'neutral' as const, trendValue: `${currentWeekEnergy.toFixed(1)}/10`, accent: 'blue',
    }] : []),
    ...(currentWeekMood !== null ? [{
      id: 'mood-average', title: 'Mood average', description: `Your logged average mood is ${currentWeekMood.toFixed(1)}/10 across this week's recovery check-ins.`, icon: 'Smile', trend: 'neutral' as const, trendValue: `${currentWeekMood.toFixed(1)}/10`, accent: 'sky',
    }] : []),
    ...(currentWeekMentalLogs.length >= 2 && previousWeekMentalLogs.length >= 2 && currentWeekAnxiety !== null && previousWeekAnxiety !== null ? [{
      id: 'anxiety-trend', title: 'Anxiety trend', description: `Average anxiety is ${currentWeekAnxiety.toFixed(1)}/10 this week, compared with ${previousWeekAnxiety.toFixed(1)}/10 in the previous 7 days.`, icon: 'Brain', trend: currentWeekAnxiety <= previousWeekAnxiety ? 'up' as const : 'down' as const, trendValue: formatChange(currentWeekAnxiety, previousWeekAnxiety), accent: 'sky',
    }] : []),
    ...(currentWeekMentalLogs.length >= 2 && previousWeekMentalLogs.length >= 2 && currentWeekConfidence !== null && previousWeekConfidence !== null ? [{
      id: 'confidence-trend', title: 'Confidence trend', description: `Average confidence is ${currentWeekConfidence.toFixed(1)}/10 this week, compared with ${previousWeekConfidence.toFixed(1)}/10 in the previous 7 days.`, icon: 'Smile', trend: currentWeekConfidence >= previousWeekConfidence ? 'up' as const : 'down' as const, trendValue: formatChange(currentWeekConfidence, previousWeekConfidence), accent: 'emerald',
    }] : []),
    ...(currentWeekMentalLogs.length >= 2 && previousWeekMentalLogs.length >= 2 && currentWeekStress !== null && previousWeekStress !== null ? [{
      id: 'stress-trend', title: 'Stress trend', description: `Average stress is ${currentWeekStress.toFixed(1)}/10 this week, compared with ${previousWeekStress.toFixed(1)}/10 in the previous 7 days.`, icon: 'Brain', trend: currentWeekStress <= previousWeekStress ? 'up' as const : 'down' as const, trendValue: formatChange(currentWeekStress, previousWeekStress), accent: 'violet',
    }] : []),
  ];
  const recentActivityItems = history.slice(0, 4).map((entry) => ({
    id: entry.id,
    title: `Logged recovery check-in: pain ${entry.pain}/10, mobility ${entry.mobility * 10}%`,
    time: formatActivityDate(entry.date),
  }));
  const weeklyHighlights = currentWeekEntries.length > 0 ? [
    `${currentWeekEntries.length} recovery ${currentWeekEntries.length === 1 ? 'check-in' : 'check-ins'} logged in the last 7 days`,
    `Average pain: ${currentWeekPain?.toFixed(1)}/10`,
    `Average mobility: ${currentWeekMobility?.toFixed(1)}%`,
  ] : [];

  const quickActions = [
    { label: 'Log Recovery', icon: HeartPulse, route: '/app/tracker', color: 'from-rose-400 to-rose-500' },
    { label: 'Exercises', icon: Dumbbell, route: '/app/exercises', color: 'from-blue-500 to-blue-600' },
    { label: 'AI Coach', icon: Sparkles, route: '/app/coach', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Calendar', icon: Calendar, route: '/app/calendar', color: 'from-violet-500 to-violet-600' },
  ];

  return (
    <AppLayout>
      {/* Welcome header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2">
          <GreetingIcon size={20} className="text-amber-500" />
          <p className="text-sm font-medium text-slate-500">{greeting},</p>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{firstName}</h2>
        <p className="mt-1 text-slate-500">
          You're on a <span className="font-semibold text-emerald-600">{streak}-day streak</span>. Keep showing up.
        </p>
      </motion.div>

      {/* My Comeback Section */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {/* Recovery Day + Score + Readiness */}
        <Card glass className="flex flex-col items-center justify-center py-6">
          <p className="text-sm font-semibold text-slate-500">Recovery Score</p>
          <div className="mt-3"><RecoveryRing score={score} size={150} label="out of 100" /></div>
          {recoveryScoreChange !== null && (
            <div className={cn('mt-3 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold', recoveryScoreChange >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500')}>
              <TrendingUp size={14} className={recoveryScoreChange < 0 ? 'rotate-180' : undefined} /> {recoveryScoreChange > 0 ? '+' : ''}{recoveryScoreChange} this week
            </div>
          )}
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {/* Recovery Day */}
          <Card className="flex flex-col justify-center bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Calendar size={22} /></div>
              <div>
                <p className="text-3xl font-bold">{recoveryDayMetric === null ? '—' : `Day ${recoveryDayMetric}`}</p>
                <p className="text-sm text-blue-100">of your comeback</p>
              </div>
            </div>
          </Card>

          {/* Recovery Readiness */}
          <Card className="flex flex-col justify-center bg-gradient-to-br from-violet-500 to-purple-500 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Activity size={22} /></div>
              <div>
                <p className="text-3xl font-bold">{recoveryReadiness === null ? '—' : `${recoveryReadiness}%`}</p>
                <p className="text-sm text-violet-100">recovery readiness</p>
              </div>
            </div>
          </Card>

          {/* Today's Mission */}
          <Card className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-lg"><Target size={18} /></div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-500">Today's Mission</p>
                <p className="mt-1 font-bold text-slate-900">{todaysMission.title}</p>
                <p className="text-sm text-slate-500">{todaysMission.detail}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Encouragement + My Why */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        {/* AI Encouragement */}
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-100">AI Encouragement</p>
              <p className="mt-2 text-base font-medium leading-relaxed">{aiEncouragement}</p>
              <p className="mt-3 text-xs text-violet-200">Recovery differs for every individual. Consult your physiotherapist for personalized guidance.</p>
            </div>
          </div>
        </Card>

        {/* My Why + Daily Encouragement */}
        <div className="grid gap-4">
          <Card glass className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <span className="text-4xl">{userMyWhy && myWhyOption ? myWhyOption.emoji : '♥'}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-50">My Why</p>
                <p className="text-xl font-bold">{userMyWhy ? `Return to ${userMyWhy}` : 'Your recovery matters'}</p>
                <p className="text-sm text-amber-50">{userMyWhy ? 'A reason to keep taking the next step.' : 'Keep taking the next step at your own pace.'}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg"><HeartPulse size={18} /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-500">Daily Encouragement</p>
                <p className="mt-1 text-sm font-medium italic leading-relaxed text-slate-700">"{dailyEncouragement}"</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Comeback Journey Links */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Comeback Timeline', icon: Calendar, route: '/app/timeline', color: 'from-blue-500 to-blue-600' },
          { label: 'Recovery DNA', icon: Activity, route: '/app/dna', color: 'from-violet-500 to-purple-500' },
          { label: 'Recovery Mountain', icon: Mountain, route: '/app/mountain', color: 'from-emerald-500 to-teal-600' },
          { label: 'Future Self Letter', icon: Mail, route: '/app/letter', color: 'from-amber-400 to-orange-500' },
        ].map((a, i) => (
          <motion.div key={a.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link to={a.route}>
              <Card hover className="flex items-center gap-3 py-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', a.color)}>
                  <a.icon size={18} />
                </div>
                <span className="text-sm font-bold text-slate-700">{a.label}</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recovery Streak Banner */}
      <Card glass className="relative mb-6 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"><Flame size={24} /></div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{streak}-day streak</p>
            <p className="text-sm text-slate-500">You completed your rehabilitation exercises for {streak} consecutive days. That kind of consistency is exactly what drives long-term recovery.</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((a, i) => (
          <motion.div key={a.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link to={a.route}>
              <Card hover className="flex items-center gap-3 py-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', a.color)}>
                  <a.icon size={18} />
                </div>
                <span className="text-sm font-bold text-slate-700">{a.label}</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Continue Recovery */}
      <Card glass className="relative mb-6 overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Play size={22} /></div>
            <div>
              <h3 className="font-bold">Continue your recovery</h3>
              <p className="text-sm text-blue-100">{activeGoalSummary}</p>
            </div>
          </div>
          <Link to="/app/goals">
            <Button className="bg-white text-blue-700 hover:bg-blue-50" size="sm">View goals <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </Card>

      {/* Top section: Recovery Score (now in My Comeback above) — show DNA preview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card glass className="flex flex-col items-center justify-center py-8">
          <p className="text-sm font-semibold text-slate-500">Recovery DNA</p>
          {dnaAvg === null ? (
            <div className="mt-4 w-full"><EmptyState icon={Activity} title="Not enough data" description="Log recovery, mental check-ins, or goals to build this profile." /></div>
          ) : (
            <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-xl">
              <div className="text-center">
                <p className="text-4xl font-bold">{dnaAvg}</p>
                <p className="text-xs text-violet-100">data profile</p>
              </div>
            </div>
          )}
          <Link to="/app/dna" className="mt-4"><Button variant="ghost" size="sm">View DNA <ArrowRight size={14} /></Button></Link>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <Card className="flex flex-col justify-center bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Calendar size={22} /></div>
              <div>
                <p className="text-3xl font-bold">{recoveryDayMetric === null ? '—' : `Day ${recoveryDayMetric}`}</p>
                <p className="text-sm text-blue-100">of your recovery</p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"><Flame size={22} /></div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{streak}</p>
                <p className="text-sm text-slate-500">day streak</p>
              </div>
            </div>
          </Card>
          <Card className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg"><Quote size={18} /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-violet-500">Daily Motivation</p>
                <p className="mt-1 text-sm font-medium italic leading-relaxed text-slate-700">"{motivationMessage}"</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pain Today" value={loading ? '…' : (todayEntry ? todayEntry.pain : '—')} unit="/10" icon={<HeartPulse size={20} />} accent="rose" />
        <StatCard label="Mobility" value={loading ? '…' : (todayEntry ? todayEntry.mobility * 10 : '—')} unit="%" icon={<Footprints size={20} />} accent="emerald" />
        <StatCard label="Sleep" value={loading ? '…' : (todayEntry ? todayEntry.sleep : '—')} unit="hrs" icon={<Moon size={20} />} accent="violet" />
        <StatCard label="Mood" value={loading ? '…' : (todayEntry ? todayEntry.mood : '—')} unit="/10" icon={<Smile size={20} />} accent="amber" />
      </div>

      {/* Recovery Insights */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recovery Insights</h3>
        {realInsights.length === 0 ? (
          <Card><EmptyState icon={TrendingUp} title="Not enough data for insights" description="Log recovery or mental check-ins to see data-derived insights here." /></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {realInsights.map((ins, i) => {
            const Icon = insightIcons[ins.icon] ?? TrendingUp;
              const neutral = ins.trend === 'neutral';
              const good = ins.trend === 'up';
              return (
                <motion.div key={ins.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover className="h-full">
                    <div className="flex items-start justify-between">
                      <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', insightAccents[ins.accent])}>
                        <Icon size={20} />
                      </div>
                      <span className={cn('flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold', neutral ? 'bg-slate-50 text-slate-500' : good ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500')}>
                        {neutral ? '—' : good ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />} {ins.trendValue}
                      </span>
                    </div>
                    <h4 className="mt-4 font-bold text-slate-900">{ins.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{ins.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recovery Goals Preview */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Your Recovery Goals</h3>
        {dashboardGoals.length === 0 ? (
          <Card><EmptyState icon={Target} title="No recovery goals yet" description="Create a recovery goal to see it here." /></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardGoals.map((goal, i) => {
              const progress = Math.min(100, Math.max(0, goal.progress));
              const completed = goal.status === 'completed';
            return (
                <motion.div key={goal.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover className="h-full">
                    <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', completed ? 'from-emerald-500 to-teal-500' : 'from-blue-500 to-emerald-500')}>
                      {completed ? <Check size={20} /> : <Target size={20} />}
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-900">{goal.title}</h4>
                      <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold capitalize', completed ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600')}>{goal.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{goal.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>{progress}% progress</span>
                      {goal.targetDate && <span>Due {formatDate(goal.targetDate)}</span>}
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <motion.div className={cn('h-full rounded-full bg-gradient-to-r', completed ? 'from-emerald-500 to-teal-500' : 'from-blue-500 to-emerald-500')} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }} />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress Preview Charts */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Progress Preview</h3>
          <Link to="/app/progress"><Button variant="ghost" size="sm">View all <ArrowRight size={16} /></Button></Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Pain Trend</h4>
            <p className="mb-4 text-xs text-slate-400">Lower is better</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={painData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs><linearGradient id="painG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} /><stop offset="100%" stopColor="#f43f5e" stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2.5} fill="url(#painG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Mobility Trend</h4>
            <p className="mb-4 text-xs text-slate-400">Higher is better</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mobilityData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs><linearGradient id="mobG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#mobG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Recovery Score</h4>
            <p className="mb-4 text-xs text-slate-400">Overall progress</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="mt-8">
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-100">AI Recovery Insight</p>
              <p className="mt-2 text-base font-medium leading-relaxed">{aiCoachMessage}</p>
              <Link to="/app/insights" className="mt-4 inline-block">
                <Button className="bg-white/20 text-white hover:bg-white/30" size="sm">View all insights <ArrowRight size={14} /></Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Checklist */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900"><ClipboardList size={20} className="text-blue-500" /> Today's Checklist</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{completedGoals}/{goals.length} done</span>
        </div>
        <Card>
          {goals.length === 0 ? (
            <EmptyState icon={Target} title="No goals yet" description="Create a recovery goal to see it in your dashboard checklist." />
          ) : (
            <div className="space-y-2">
              {goals.map((g) => {
                const completed = g.status === 'completed';
                return (
                  <button key={g.id} onClick={() => { void toggleGoal(g.id); }} className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50">
                    <div className={cn('flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all', completed ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300')}>
                      {completed && <Check size={14} />}
                    </div>
                    <span className={cn('text-sm font-medium', completed ? 'text-slate-400 line-through' : 'text-slate-700')}>{g.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Weekly Progress Summary */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Weekly Progress Summary</h3>
        {currentWeekEntries.length === 0 ? (
          <Card><EmptyState icon={Calendar} title="No recovery data this week" description="Log a recovery check-in to build your weekly summary." /></Card>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card hover className="bg-gradient-to-br from-emerald-50 to-green-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white"><TrendingUp size={18} /></div>
                  <div><p className="text-2xl font-bold text-slate-900">{currentWeekScore?.toFixed(0)}</p><p className="text-xs text-slate-500">Average recovery score</p><p className="text-xs text-slate-400">vs prior 7 days: {formatChange(currentWeekScore, previousWeekScore)}</p></div>
                </div>
              </Card>
              <Card hover className="bg-gradient-to-br from-rose-50 to-pink-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white"><HeartPulse size={18} /></div>
                  <div><p className="text-2xl font-bold text-slate-900">{currentWeekPain?.toFixed(1)}/10</p><p className="text-xs text-slate-500">Average pain</p><p className="text-xs text-slate-400">vs prior 7 days: {formatChange(currentWeekPain, previousWeekPain)}</p></div>
                </div>
              </Card>
              <Card hover className="bg-gradient-to-br from-blue-50 to-sky-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white"><Footprints size={18} /></div>
                  <div><p className="text-2xl font-bold text-slate-900">{currentWeekMobility?.toFixed(1)}%</p><p className="text-xs text-slate-500">Average mobility</p><p className="text-xs text-slate-400">vs prior 7 days: {formatChange(currentWeekMobility, previousWeekMobility, '%')}</p></div>
                </div>
              </Card>
              <Card hover className="bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white"><Calendar size={18} /></div>
                  <div><p className="text-2xl font-bold text-slate-900">{currentWeekEntries.length}/7</p><p className="text-xs text-slate-500">Logged days</p></div>
                </div>
              </Card>
            </div>
            <Card className="mt-4">
              <h4 className="mb-3 font-bold text-slate-900">This week's highlights</h4>
              <ul className="space-y-2">
                {weeklyHighlights.map((highlight, i) => (
                  <motion.li key={highlight} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {highlight}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </>
        )}
      </div>

      {/* Upcoming Milestones */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Milestones</h3>
          <Link to="/app/goals"><Button variant="ghost" size="sm">View goals <ArrowRight size={16} /></Button></Link>
        </div>
        {upcomingMilestones.length === 0 ? (
          <Card><EmptyState icon={Trophy} title="No upcoming goal deadlines" description="Goals with target dates will appear here." /></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {upcomingMilestones.map((goal, i) => (
              <motion.div key={goal.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card hover className="h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-lg"><Target size={18} /></div>
                  <span className="mt-3 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600">Goal deadline</span>
                  <h4 className="mt-2 font-bold text-slate-900">{goal.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{goal.description}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-400">Target: {formatDate(goal.targetDate)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* AI Coach Preview */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={22} /></div>
            <h3 className="mt-4 text-lg font-bold">AI Recovery Coach</h3>
            <p className="mt-2 text-sm leading-relaxed text-blue-50">"{aiCoachMessage}"</p>
            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-white/10 p-3 text-xs text-blue-50 backdrop-blur">
              <LifeBuoy size={14} className="mt-0.5 shrink-0" />
              <span>AI provides educational information only and is not a substitute for professional medical advice.</span>
            </div>
            <Link to="/app/coach" className="mt-4 block">
              <Button className="bg-white text-blue-700 hover:bg-blue-50" size="sm" fullWidth>Chat with coach <ArrowRight size={16} /></Button>
            </Link>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Activity</h3>
            <span className="text-xs text-slate-400">Latest check-ins</span>
          </div>
          {recentActivityItems.length === 0 ? (
            <EmptyState icon={HeartPulse} title="No recent activity" description="Your recovery check-ins will appear here once you log them." />
          ) : (
            <div className="space-y-2">
              {recentActivityItems.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><HeartPulse size={14} /></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-slate-700">{activity.title}</p><p className="text-xs text-slate-400">{activity.time}</p></div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Upcoming Exercises */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Exercises</h3>
          <Link to="/app/exercises"><Button variant="ghost" size="sm">View library <ArrowRight size={16} /></Button></Link>
        </div>
        <Card><EmptyState icon={Dumbbell} title="No upcoming exercises" description="Exercises will appear here when a recovery plan is available." /></Card>
      </div>
    </AppLayout>
  );
}