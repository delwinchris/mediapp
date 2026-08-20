import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Footprints, Activity, Dumbbell, Trophy, Flag, Check, Clock,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAuth } from '@/lib/auth';
import { recoveryLogService } from '@/services';
import { personalizedPlan } from '@/lib/mockData';
import type { RecoveryEntry } from '@/lib/types';
import { cn } from '@/lib/cn';

const milestoneIcons: Record<string, LucideIcon> = { Activity, Footprints, Dumbbell, Trophy };
const timelineStatusStyles = {
  completed: 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white',
  current: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white ring-4 ring-amber-200',
  upcoming: 'bg-slate-100 text-slate-400',
};

function computeScore(entry: RecoveryEntry): number {
  const painScore = (10 - entry.pain) * 10;
  const mobilityScore = entry.mobility * 5;
  const sleepScore = (entry.sleep / 8) * 25;
  const energyScore = entry.energy * 2.5;
  const moodScore = entry.mood * 2.5;
  return Math.round(Math.min(100, Math.max(0, painScore + mobilityScore + sleepScore + energyScore + moodScore)));
}

function weeksSince(dateStr: string): number {
  const start = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diffMs / (7 * 86400000)));
}

export function RecoveryPlanPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState(personalizedPlan.todayGoals);
  const [history, setHistory] = useState<RecoveryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const toggleGoal = (id: string) => setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  const completed = goals.filter((g) => g.done).length;

  useEffect(() => {
    let mounted = true;
    recoveryLogService.getAll()
      .then((entries) => { if (mounted) setHistory(entries); })
      .catch((err) => console.error('Failed to load recovery history:', err))
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const profile = user?.profile;
  const latestEntry = history[history.length - 1];

  const injury = profile?.injury || personalizedPlan.injury;
  const injuryDate = profile?.injuryDate || '';
  const week = injuryDate ? weeksSince(injuryDate) : 0;
  const stage = injuryDate ? `Week ${week} of recovery` : personalizedPlan.stage;

  const painLevel = latestEntry ? latestEntry.pain : (profile?.painLevel ?? null);
  const mobilityLevel = latestEntry ? latestEntry.mobility * 10 : (profile?.mobilityLevel ?? null);
  const readiness = latestEntry ? computeScore(latestEntry) : 0;

  return (
    <AppLayout>
      <PageHeader title="Recovery Plan" subtitle="Your personalized plan based on your injury, recovery stage, pain, and mobility." />

      {/* Plan overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card glass className="bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
          <p className="text-sm text-blue-100">Injury</p>
          <p className="mt-1 font-bold">{injury || '—'}</p>
          <div className="mt-4 rounded-2xl bg-white/10 p-3 backdrop-blur">
            <p className="text-xs text-blue-100">Current Stage</p>
            <p className="text-sm font-bold">{stage}</p>
          </div>
        </Card>
        <Card className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500">Pain</p>
            <p className="mt-1 text-3xl font-bold text-rose-500">{loading ? '…' : (painLevel ?? '—')}<span className="text-lg text-slate-400">/10</span></p>
          </div>
          <div className="h-12 w-px bg-slate-100" />
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500">Mobility</p>
            <p className="mt-1 text-3xl font-bold text-emerald-500">{loading ? '…' : (mobilityLevel ?? '—')}<span className="text-lg text-slate-400">%</span></p>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center">
          <RecoveryRing score={readiness} size={110} label="readiness" />
        </Card>
      </div>

      {/* Today's Goals */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Today's Goals</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{completed}/{goals.length} done</span>
        </div>
        <Card>
          <div className="space-y-2">
            {goals.map((g) => (
              <button key={g.id} onClick={() => toggleGoal(g.id)} className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50">
                <div className={cn('flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all', g.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300')}>
                  {g.done && <Check size={14} />}
                </div>
                <div className="flex-1">
                  <p className={cn('text-sm font-medium', g.done ? 'text-slate-400 line-through' : 'text-slate-700')}>{g.title}</p>
                  <p className="text-xs text-slate-400">{g.detail}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Goals */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Weekly Goals</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {personalizedPlan.weeklyGoals.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{g.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{g.detail}</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{g.progress}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${g.progress}%` }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Upcoming Milestones</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personalizedPlan.milestones.map((m, i) => {
            const Icon = milestoneIcons[m.icon] ?? Flag;
            return (
              <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card hover className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-lg">
                    <Icon size={20} />
                  </div>
                  <span className="mt-3 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600">{m.phase}</span>
                  <h4 className="mt-2 font-bold text-slate-900">{m.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.description}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-400">Target: {new Date(m.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recovery Timeline */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recovery Timeline</h3>
        <Card>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-emerald-400 to-slate-200" />
            <div className="space-y-6">
              {personalizedPlan.timeline.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative flex gap-4">
                  <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md', timelineStatusStyles[t.status])}>
                    {t.status === 'completed' ? <Check size={16} /> : t.status === 'current' ? <Clock size={16} /> : <Activity size={16} />}
                  </div>
                  <div className={cn('flex-1 rounded-2xl border p-4', t.status === 'current' ? 'border-amber-200 bg-amber-50/50' : t.status === 'completed' ? 'border-slate-200 bg-white' : 'border-dashed border-slate-200 bg-slate-50')}>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600">{t.phase}</span>
                      {t.status === 'current' && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-600">You are here</span>}
                    </div>
                    <h4 className={cn('mt-2 font-bold', t.status === 'upcoming' ? 'text-slate-500' : 'text-slate-900')}>{t.title}</h4>
                    <p className="mt-1 text-sm text-slate-500">{t.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}