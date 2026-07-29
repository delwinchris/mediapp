import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse, Footprints, Dumbbell, Moon, Brain, Smile, TrendingUp, CheckCircle,
  type LucideIcon,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { analyticsSeries } from '@/lib/mockData';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Footprints, Dumbbell, Moon, Brain, Smile, TrendingUp, CheckCircle,
};

const ranges = [
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'yearly', label: 'Yearly' },
] as const;

type RangeKey = (typeof ranges)[number]['key'];

export function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>('weekly');

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
        {analyticsSeries.map((s, i) => {
          const Icon = iconMap[s.icon] ?? TrendingUp;
          const data = s[range];
          const first = data[0]?.value ?? 0;
          const last = data[data.length - 1]?.value ?? 0;
          const diff = Math.round((last - first) * 10) / 10;
          const improved = s.invert ? diff < 0 : diff > 0;
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
                  <span className={cn('flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold', improved ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500')}>
                    {improved ? '▲' : '▼'} {Math.abs(diff)}
                  </span>
                </div>
                <div className="h-56">
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
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
