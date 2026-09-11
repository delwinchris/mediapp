import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, HeartPulse, Calendar, Shield, Trophy, Medal, Brain, Activity, Lock,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/cn';
import { buildAchievementSet, exerciseService, journalService } from '@/services';
import type { ExerciseSession, JournalEntry } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  Flame, HeartPulse, Calendar, Shield, Trophy, Medal, Brain, Activity,
};

const tierStyles: Record<string, { ring: string; bg: string; text: string; label: string }> = {
  bronze: { ring: 'from-amber-600 to-amber-700', bg: 'from-amber-50 to-orange-50', text: 'text-amber-700', label: 'Bronze' },
  silver: { ring: 'from-slate-400 to-slate-500', bg: 'from-slate-50 to-slate-100', text: 'text-slate-600', label: 'Silver' },
  gold: { ring: 'from-yellow-400 to-amber-500', bg: 'from-yellow-50 to-amber-50', text: 'text-amber-600', label: 'Gold' },
  platinum: { ring: 'from-cyan-400 to-blue-500', bg: 'from-cyan-50 to-blue-50', text: 'text-cyan-600', label: 'Platinum' },
};

export function AchievementsPage() {
  const { recoveryLogs, mentalLogs, goals } = useAppStore();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [exerciseSessions, setExerciseSessions] = useState<ExerciseSession[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      journalService.getAll(),
      exerciseService.getHistory(),
    ]).then(([journals, sessions]) => {
      if (!active) return;
      setJournalEntries(journals);
      setExerciseSessions(sessions);
    }).catch(() => {
      if (active) {
        setJournalEntries([]);
        setExerciseSessions([]);
      }
    });

    return () => { active = false; };
  }, []);

  const achievements = useMemo(() => buildAchievementSet({
    recoveryLogs,
    mentalLogs,
    journalEntries,
    exerciseSessions,
    goals,
  }), [recoveryLogs, mentalLogs, goals, journalEntries, exerciseSessions]);

  const earned = achievements.filter((achievement) => achievement.unlocked);
  const inProgress = achievements.filter((achievement) => !achievement.unlocked && achievement.progress > 0);
  const locked = achievements.filter((achievement) => !achievement.unlocked && achievement.progress === 0);
  const totalXp = achievements.filter((achievement) => achievement.unlocked).reduce((sum, achievement) => sum + achievement.xp, 0);
  const recoveryLevel = { level: Math.min(5, Math.floor(totalXp / 150) + 1), title: totalXp > 0 ? 'Building Momentum' : 'Getting started', totalXp, currentXp: totalXp % 150, nextLevelXp: 150 };
  const xpPercent = recoveryLevel.nextLevelXp === 0 ? 0 : (recoveryLevel.currentXp / recoveryLevel.nextLevelXp) * 100;

  return (
    <AppLayout>
      <PageHeader title="Achievements" subtitle="Celebrate every milestone in your recovery journey." />

      <Card glass className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-emerald-300/20 blur-2xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Trophy size={28} /></div>
              <div>
                <p className="text-sm text-blue-100">Recovery Level {recoveryLevel.level}</p>
                <h3 className="text-2xl font-bold">{recoveryLevel.title}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-blue-100">Total XP earned: <span className="font-bold text-white">{recoveryLevel.totalXp.toLocaleString()}</span></p>
          </div>
          <div className="sm:w-80">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-blue-100">Level {recoveryLevel.level}</span>
              <span className="font-bold">{recoveryLevel.currentXp} / {recoveryLevel.nextLevelXp} XP</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-white/20">
              <motion.div initial={{ width: 0 }} animate={{ width: `${xpPercent}%` }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-amber-300 to-yellow-400" />
            </div>
            <p className="mt-2 text-xs text-blue-100">{recoveryLevel.nextLevelXp - recoveryLevel.currentXp} XP to next level</p>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Trophy size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{earned.length}</p>
              <p className="text-sm text-slate-500">Unlocked</p>
            </div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Flame size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{inProgress.length}</p>
              <p className="text-sm text-slate-500">In progress</p>
            </div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Medal size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{totalXp}</p>
              <p className="text-sm text-slate-500">Total XP</p>
            </div>
          </div>
        </Card>
      </div>

      <h3 className="mb-4 mt-8 text-lg font-bold text-slate-900">Unlocked</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earned.length === 0 ? <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">No achievements unlocked yet. Start with a recovery check-in or a goal to build momentum.</div> : earned.map((achievement, index) => {
          const Icon = iconMap[achievement.icon] ?? Trophy;
          const tier = tierStyles[achievement.tier];
          return (
            <motion.div key={achievement.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card hover className={cn('h-full bg-gradient-to-br', tier.bg)}>
                <div className="flex items-start gap-4">
                  <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', tier.ring)}>
                    <Icon size={26} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900">{achievement.title}</h4>
                      <span className={cn('rounded-full bg-white/60 px-2 py-0.5 text-xs font-bold', tier.text)}>{tier.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{achievement.description}</p>
                    <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-amber-600">+{achievement.xp} XP</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-700">UNLOCKED</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <h3 className="mb-4 mt-8 text-lg font-bold text-slate-900">In Progress</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inProgress.length === 0 ? <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">No achievements are in progress yet.</div> : inProgress.map((achievement, index) => {
          const Icon = iconMap[achievement.icon] ?? Trophy;
          const tier = tierStyles[achievement.tier];
          return (
            <motion.div key={achievement.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card hover className="h-full opacity-90">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                    <Icon size={26} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-700">{achievement.title}</h4>
                      <span className={cn('rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold', tier.text)}>{tier.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{achievement.description}</p>
                    <div className="mt-3 text-xs font-bold text-amber-600">{achievement.progress} / {achievement.goal}</div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${Math.min((achievement.progress / achievement.goal) * 100, 100)}%` }} /></div>
                    <div className="mt-2 text-xs font-bold uppercase tracking-wide text-blue-600">IN PROGRESS</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <h3 className="mb-4 mt-8 text-lg font-bold text-slate-900">Locked</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locked.map((achievement, index) => {
          const Icon = iconMap[achievement.icon] ?? Trophy;
          const tier = tierStyles[achievement.tier];
          return (
            <motion.div key={achievement.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card hover className="h-full opacity-70">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-400">
                    <Icon size={26} />
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-100/80"><Lock size={18} /></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-500">{achievement.title}</h4>
                      <span className={cn('rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold', tier.text)}>{tier.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{achievement.description}</p>
                    <div className="mt-3 text-xs font-bold text-amber-500">+{achievement.xp} XP when unlocked</div>
                    <div className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-400">LOCKED</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
