import { motion } from 'framer-motion';
import {
  HeartPulse, Footprints, Moon, Flame, TrendingUp, Smile, Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/lib/cn';
import { useAppStore } from '@/lib/store';

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Footprints, Moon, Flame, TrendingUp, Smile,
};

const accentGradients: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-400 to-amber-500',
  violet: 'from-violet-500 to-violet-600',
  rose: 'from-rose-400 to-rose-500',
  sky: 'from-sky-400 to-sky-500',
};

export function AdvancedInsightsPage() {
  const { recoveryLogs, mentalLogs, goals } = useAppStore();
  const latest = recoveryLogs[0];
  const previous = recoveryLogs[1];
  const insights = [
    ...(latest ? [{ id: 'latest-check-in', title: 'Latest check-in', description: `Your latest recorded pain level is ${latest.pain}/10 and mobility is ${latest.mobility * 10}%.`, icon: 'HeartPulse', trend: 'neutral', trendValue: 'Latest', accent: 'blue', metric: 'Recovery log' }] : []),
    ...(latest && previous ? [{ id: 'pain-change', title: 'Pain change', description: `Pain changed from ${previous.pain}/10 to ${latest.pain}/10 between your two most recent check-ins.`, icon: 'HeartPulse', trend: latest.pain <= previous.pain ? 'up' : 'down', trendValue: `${latest.pain - previous.pain}`, accent: 'rose', metric: 'Pain' }] : []),
    ...(mentalLogs[0] ? [{ id: 'mental-check-in', title: 'Mental check-in', description: `Your latest confidence is ${mentalLogs[0].confidence}/10 and stress is ${mentalLogs[0].stress}/10.`, icon: 'Smile', trend: 'neutral', trendValue: 'Latest', accent: 'emerald', metric: 'Mental log' }] : []),
    ...(goals.length ? [{ id: 'goals', title: 'Goal progress', description: `You have ${goals.filter((goal) => goal.status === 'active').length} active recovery goal${goals.filter((goal) => goal.status === 'active').length === 1 ? '' : 's'}.`, icon: 'TrendingUp', trend: 'neutral', trendValue: `${goals.length}`, accent: 'violet', metric: 'Goals' }] : []),
  ];
  return (
    <AppLayout>
      <PageHeader title="AI Insights" subtitle="Premium, AI-generated insights based on your recovery data trends." />

      {/* Hero card */}
      <Card glass className="relative mb-8 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-emerald-300/20 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={28} /></div>
          <div>
            <h3 className="text-xl font-bold">Your Recovery at a Glance</h3>
            <p className="mt-1 text-sm text-blue-50">Insights calculated from your saved recovery data</p>
          </div>
        </div>
      </Card>

      {/* Insight cards */}
      {insights.length === 0 ? <Card className="py-16 text-center"><p className="font-semibold text-slate-700">Keep logging your recovery to unlock personalized insights.</p><p className="mt-2 text-sm text-slate-400">Your data stays empty until you record a check-in, goal, or mental check-in.</p></Card> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((ins, i) => {
          const Icon = iconMap[ins.icon] ?? TrendingUp;
          const isPositive = ins.trend === 'up';
          const isNeutral = ins.trend === 'neutral';
          return (
            <motion.div key={ins.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card hover className="relative h-full overflow-hidden">
                <div className={cn('absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br opacity-10', accentGradients[ins.accent])} />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', accentGradients[ins.accent])}>
                      <Icon size={24} />
                    </div>
                    <span className={cn(
                      'flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold',
                      isNeutral ? 'bg-slate-100 text-slate-500' : isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                    )}>
                      {isNeutral ? '—' : isPositive ? '▲' : '▼'} {ins.trendValue}
                    </span>
                  </div>
                  <h4 className="mt-5 text-lg font-bold text-slate-900">{ins.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{ins.description}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <span className="text-xs font-semibold text-slate-400">Metric:</span>
                    <span className="rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-bold text-slate-600">{ins.metric}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>}
    </AppLayout>
  );
}
