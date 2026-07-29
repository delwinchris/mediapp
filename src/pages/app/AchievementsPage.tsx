import { motion } from 'framer-motion';
import {
  Flame, HeartPulse, Calendar, Shield, Trophy, Medal, Brain, Activity, Lock,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { achievements, recoveryLevel } from '@/lib/mockData';
import { cn } from '@/lib/cn';

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
  const earned = achievements.filter((a) => a.earned);
  const locked = achievements.filter((a) => !a.earned);
  const xpPercent = Math.round((recoveryLevel.currentXp / recoveryLevel.nextLevelXp) * 100);

  return (
    <AppLayout>
      <PageHeader title="Achievements" subtitle="Celebrate every milestone in your recovery journey." />

      {/* Level & XP Card */}
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
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-amber-300 to-yellow-400"
              />
            </div>
            <p className="mt-2 text-xs text-blue-100">{recoveryLevel.nextLevelXp - recoveryLevel.currentXp} XP to next level</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Trophy size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{earned.length}</p>
              <p className="text-sm text-slate-500">Badges earned</p>
            </div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><Flame size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-slate-900">30</p>
              <p className="text-sm text-slate-500">Day streak</p>
            </div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Medal size={20} /></div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{recoveryLevel.totalXp.toLocaleString()}</p>
              <p className="text-sm text-slate-500">Total XP</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Earned badges */}
      <h3 className="mb-4 mt-8 text-lg font-bold text-slate-900">Earned Badges</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earned.map((a, i) => {
          const Icon = iconMap[a.icon] ?? Trophy;
          const tier = tierStyles[a.tier];
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover className={cn('h-full bg-gradient-to-br', tier.bg)}>
                <div className="flex items-start gap-4">
                  <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', tier.ring)}>
                    <Icon size={26} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900">{a.title}</h4>
                      <span className={cn('rounded-full bg-white/60 px-2 py-0.5 text-xs font-bold', tier.text)}>{tier.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{a.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="font-bold text-amber-600">+{a.xp} XP</span>
                      <span className="text-slate-400">· Earned {a.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Locked badges */}
      <h3 className="mb-4 mt-8 text-lg font-bold text-slate-900">Locked Badges</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locked.map((a, i) => {
          const Icon = iconMap[a.icon] ?? Trophy;
          const tier = tierStyles[a.tier];
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover className="h-full opacity-70">
                <div className="flex items-start gap-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-400">
                    <Icon size={26} />
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-100/80"><Lock size={18} /></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-500">{a.title}</h4>
                      <span className={cn('rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold', tier.text)}>{tier.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{a.description}</p>
                    <div className="mt-3 text-xs font-bold text-amber-500">+{a.xp} XP when unlocked</div>
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
