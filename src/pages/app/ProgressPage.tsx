import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Smile, Moon, Footprints, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { recoveryHistory } from '@/lib/mockData';
import { computeRecoveryScore, recoveryScoreSeries, painSeries, moodSeries, sleepSeries, mobilitySeries } from '@/lib/analytics';
import { cn } from '@/lib/cn';

const ranges = ['7D', '30D', '90D', 'All'];

export function ProgressPage() {
  const [range, setRange] = useState('7D');
  const score = computeRecoveryScore();
  const scoreSeries = recoveryScoreSeries();

  const charts = [
    { title: 'Pain Level', icon: HeartPulse, color: '#f43f5e', gradId: 'painGrad', data: painSeries(), domain: [0, 10] as [number, number], type: 'area' as const },
    { title: 'Mood', icon: Smile, color: '#f59e0b', gradId: 'moodGrad', data: moodSeries(), domain: [0, 10] as [number, number], type: 'area' as const },
    { title: 'Sleep (hours)', icon: Moon, color: '#8b5cf6', gradId: 'sleepGrad', data: sleepSeries(), domain: [0, 12] as [number, number], type: 'bar' as const },
    { title: 'Mobility', icon: Footprints, color: '#10b981', gradId: 'mobilityGrad', data: mobilitySeries(), domain: [0, 10] as [number, number], type: 'area' as const },
  ];

  const first = recoveryHistory[0];
  const last = recoveryHistory[recoveryHistory.length - 1];

  const summary = [
    { label: 'Pain', value: last.pain, prev: first.pain, invert: true, unit: '/10' },
    { label: 'Mobility', value: last.mobility, prev: first.mobility, invert: false, unit: '/10' },
    { label: 'Sleep', value: last.sleep, prev: first.sleep, invert: false, unit: 'h' },
    { label: 'Mood', value: last.mood, prev: first.mood, invert: false, unit: '/10' },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Progress"
        subtitle="See your recovery trends over time and celebrate how far you've come."
        action={<Button variant="outline" size="md"><Download size={16} /> Export</Button>}
      />

      <div className="mb-6 flex gap-2">
        {ranges.map((r) => (
          <button key={r} onClick={() => setRange(r)} className={cn('rounded-xl px-4 py-2 text-sm font-semibold transition-all', range === r ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' : 'bg-white text-slate-600 hover:bg-slate-100')}>{r}</button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s, i) => {
          const improved = s.invert ? s.value < s.prev : s.value > s.prev;
          const diff = Math.abs(s.value - s.prev);
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover>
                <p className="text-sm text-slate-500">{s.label}</p>
                <div className="mt-2 flex items-end gap-2">
                  <p className="text-3xl font-bold text-slate-900">{s.value}<span className="text-lg text-slate-400">{s.unit}</span></p>
                  <span className={cn('mb-1.5 flex items-center gap-0.5 text-xs font-bold', improved ? 'text-emerald-600' : 'text-rose-500')}>
                    {improved ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {diff}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">from {s.prev}{s.unit}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="mt-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Recovery Score Trend</h3>
            <p className="text-sm text-slate-500">Your overall recovery trajectory</p>
          </div>
          <div className="flex items-center gap-4">
            <RecoveryRing score={score} size={80} stroke={8} />
            <div>
              <p className="text-3xl font-bold text-slate-900">{score}<span className="text-lg text-slate-400">/100</span></p>
              <p className="text-xs font-bold text-emerald-600">+{score - recoveryScoreSeries()[0].score} this period</p>
            </div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={scoreSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="bigScoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
              <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fill="url(#bigScoreGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {charts.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${c.color}15` }}>
                  <c.icon size={18} style={{ color: c.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{c.title}</h3>
                  <p className="text-xs text-slate-400">Last 7 days</p>
                </div>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  {c.type === 'bar' ? (
                    <BarChart data={c.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis domain={c.domain} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
                      <Bar dataKey="value" fill={c.color} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  ) : (
                    <AreaChart data={c.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id={c.gradId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={c.color} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={c.color} stopOpacity={0.03} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis domain={c.domain} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
                      <Area type="monotone" dataKey="value" stroke={c.color} strokeWidth={2.5} fill={`url(#${c.gradId})`} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}
