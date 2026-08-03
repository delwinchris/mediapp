import { motion } from 'framer-motion';
import {
  Dumbbell, HeartPulse, Moon, Footprints, Activity, Flame, Brain, Trophy,
  Sparkles, type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { smallVictories } from '@/lib/emotionalData';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  Dumbbell, HeartPulse, Moon, Footprints, Activity, Flame, Brain, Trophy,
};

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function SmallVictoriesPage() {
  const categoryCounts = smallVictories.reduce((acc, v) => {
    acc[v.category] = (acc[v.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AppLayout>
      <PageHeader
        title="Small Victories"
        subtitle="The tiny wins that add up to a full comeback. Every one deserves celebrating."
      />

      {/* Hero */}
      <Card glass className="relative mb-8 overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-rose-400 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Trophy size={28} />
          </div>
          <div>
            <p className="text-3xl font-bold">{smallVictories.length} victories</p>
            <p className="text-sm text-amber-50">celebrated in the last 90 days</p>
          </div>
        </div>
      </Card>

      {/* Category summary */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(categoryCounts).map(([cat, count]) => (
          <span key={cat} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
            {cat}: {count}
          </span>
        ))}
      </div>

      {/* Victory cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {smallVictories.map((victory, i) => {
          const Icon = iconMap[victory.icon] ?? Trophy;
          return (
            <motion.div
              key={victory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start justify-between">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', victory.color)}>
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">{victory.category}</span>
                </div>
                <h3 className="mt-4 font-bold text-slate-900">{victory.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{victory.message}</p>
                <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-400">
                  <Sparkles size={12} className="text-amber-400" /> {formatDate(victory.date)}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Encouragement */}
      <Card glass className="relative mt-8 overflow-hidden bg-gradient-to-br from-violet-500 to-purple-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-violet-100">Remember</p>
            <p className="mt-1 text-base font-medium leading-relaxed">
              Small victories aren't small. They're the building blocks of everything you've gained.
              Every exercise completed, every hour of sleep, every step walked — they all count.
            </p>
          </div>
        </div>
      </Card>
    </AppLayout>
  );
}
