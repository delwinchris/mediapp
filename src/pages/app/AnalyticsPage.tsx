import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse, Footprints, Moon, Brain, Smile, TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/lib/store';
import type { MentalEntry, RecoveryEntry } from '@/lib/types';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Footprints, Moon, Brain, Smile, TrendingUp,
};

const ranges = [
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'yearly', label: 'Yearly' },
] as const;

type RangeKey = (typeof ranges)[number]['key'];

type MetricDefinition =
  | {
      key: string;
      label: string;
      color: string;
      icon: string;
      domain: [number, number];
      invert?: boolean;
      source: 'recovery';
      getValue: (entry: RecoveryEntry) => number;
    }
  | {
      key: string;
      label: string;
      color: string;
      icon: string;
      domain: [number, number];
      invert?: boolean;
      source: 'mental';
      getValue: (entry: MentalEntry) => number;
    };

const metricDefinitions: MetricDefinition[] = [
  { key: 'pain', label: 'Pain', color: '#f43f5e', icon: 'HeartPulse', domain: [0, 10], invert: true, source: 'recovery', getValue: (entry) => entry.pain },
  { key: 'mobility', label: 'Mobility', color: '#10b981', icon: 'Footprints', domain: [0, 100], source: 'recovery', getValue: (entry) => entry.mobility * 10 },
  { key: 'strength', label: 'Strength', color: '#2563eb', icon: 'TrendingUp', domain: [0, 100], source: 'recovery', getValue: (entry) => entry.strength },
  { key: 'sleep', label: 'Sleep (hours)', color: '#8b5cf6', icon: 'Moon', domain: [0, 12], source: 'recovery', getValue: (entry) => entry.sleep },
  { key: 'anxiety', label: 'Anxiety', color: '#f43f5e', icon: 'Brain', domain: [0, 10], invert: true, source: 'mental', getValue: (entry) => entry.anxiety },
  { key: 'confidence', label: 'Confidence', color: '#10b981', icon: 'Smile', domain: [0, 10], source: 'mental', getValue: (entry) => entry.confidence },
  {
    key: 'recoveryScore', label: 'Recovery Score', color: '#2563eb', icon: 'TrendingUp', domain: [0, 100], source: 'recovery',
    getValue: (entry) => computeRecoveryScore(entry),
  },
];

function computeRecoveryScore(entry: RecoveryEntry): number {
  const painScore = (10 - entry.pain) * 10;
  const mobilityScore = entry.mobility * 5;
  const sleepScore = (entry.sleep / 8) * 25;
  const energyScore = entry.energy * 2.5;
  const moodScore = entry.mood * 2.5;
  return Math.round(Math.min(100, Math.max(0, painScore + mobilityScore + sleepScore + energyScore + moodScore)));
}

function getRangeStart(range: RangeKey, today: Date): Date {
  if (range === 'weekly') {
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    return start;
  }
  if (range === 'monthly') {
    const start = new Date(today);
    start.setDate(today.getDate() - 29);
    return start;
  }
  return new Date(today.getFullYear(), today.getMonth() - 11, 1);
}

function formatChartDate(date: string, range: RangeKey): string {
  const parsed = new Date(`${date}T00:00:00`);
  return range === 'yearly'
    ? parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : parsed.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
}

function buildSeries<T extends { date: string }>(entries: T[], range: RangeKey, getValue: (entry: T) => number): { date: string; value: number }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const rangeStart = getRangeStart(range, today);
  return entries
    .filter((entry) => {
      const date = new Date(`${entry.date}T00:00:00`);
      return date >= rangeStart && date <= today;
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => ({ date: formatChartDate(entry.date, range), value: getValue(entry) }));
}

export function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>('weekly');
  const { recoveryLogs, mentalLogs } = useAppStore();

  return (
    <AppLayout>
      <PageHeader title="Advanced Analytics" subtitle="Deep-dive into every recovery metric across weekly, monthly, and yearly views." />

      <div className="mb-6 flex gap-2">
        {ranges.map((r) => (
          <button
            key={r.key}
            onClick={() => setRange(r.key)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-semibold transition-all',
              range === r.key ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' : 'bg-white text-slate-600 hover:bg-slate-100'
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {metricDefinitions.map((s, i) => {
          const Icon = iconMap[s.icon] ?? TrendingUp;
          const data = s.source === 'recovery'
            ? buildSeries(recoveryLogs, range, s.getValue)
            : buildSeries(mentalLogs, range, s.getValue);
          const diff = data.length >= 2
            ? Math.round((data[data.length - 1].value - data[0].value) * 10) / 10
            : null;
          const improved = diff !== null && (s.invert ? diff < 0 : diff > 0);
          const gradId = `grad-${s.key}`;

          return (
            <motion.div key={s.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}15` }}>
                      <Icon size={18} style={{ color: s.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{s.label}</h3>
                      <p className="text-xs text-slate-400">{range === 'weekly' ? 'Last 7 days' : range === 'monthly' ? 'Last 30 days' : 'Last 12 months'}</p>
                    </div>
                  </div>
                  {diff !== null && (
                    <span className={cn('flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold', improved ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500')}>
                      {improved ? '▲' : '▼'} {Math.abs(diff)}
                    </span>
                  )}
                </div>
                <div className="h-56">
                  {data.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center text-sm text-slate-400">No data in this range. Log a check-in to see this metric.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
                            <stop offset="100%" stopColor={s.color} stopOpacity={0.03} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis domain={s.domain} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                        <Area type="monotone" dataKey="value" stroke={s.color} strokeWidth={2.5} fill={`url(#${gradId})`} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
