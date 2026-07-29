import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Wind, Smile, ShieldAlert, Flame, TrendingDown, TrendingUp, BookHeart, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider, Textarea } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { mentalHistory } from '@/lib/mockData';
import { formatDate } from '@/lib/analytics';
import { cn } from '@/lib/cn';

const metrics = [
  { key: 'anxiety' as const, label: 'Anxiety', icon: Wind, color: 'rose', invert: true },
  { key: 'confidence' as const, label: 'Confidence', icon: Smile, color: 'emerald', invert: false },
  { key: 'fearOfReinjury' as const, label: 'Fear of Re-injury', icon: ShieldAlert, color: 'amber', invert: true },
  { key: 'motivation' as const, label: 'Motivation', icon: Flame, color: 'blue', invert: false },
  { key: 'stress' as const, label: 'Stress', icon: Brain, color: 'violet', invert: true },
];

const colorHex: Record<string, string> = {
  rose: '#f43f5e', emerald: '#10b981', amber: '#f59e0b', blue: '#2563eb', violet: '#8b5cf6',
};

export function MentalRecoveryPage() {
  const [values, setValues] = useState<Record<string, number>>({
    anxiety: 3, confidence: 8, fearOfReinjury: 4, motivation: 9, stress: 3,
  });
  const [journal, setJournal] = useState('');
  const [saved, setSaved] = useState(false);

  const chartData = mentalHistory.map((e) => ({
    date: e.date.slice(5),
    Anxiety: e.anxiety, Confidence: e.confidence, Motivation: e.motivation, Stress: e.stress,
  }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const latest = mentalHistory[mentalHistory.length - 1];
  const prev = mentalHistory[mentalHistory.length - 2];

  return (
    <AppLayout>
      <PageHeader title="Mental Recovery" subtitle="Your mind heals too. Track how you feel mentally and reflect in your journal." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.slice(0, 4).map((m, i) => {
          const val = latest[m.key];
          const prevVal = prev[m.key];
          const improved = m.invert ? val < prevVal : val > prevVal;
          const diff = Math.abs(val - prevVal);
          return (
            <motion.div key={m.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover>
                <div className="flex items-center justify-between">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50', `text-${m.color}-600`)}><m.icon size={18} /></div>
                  {improved ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600"><TrendingUp size={12} /> {diff}</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-500"><TrendingDown size={12} /> {diff}</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-slate-500">{m.label}</p>
                <p className="text-2xl font-bold text-slate-900">{val}<span className="text-base font-medium text-slate-400">/10</span></p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="mb-6 font-bold text-slate-900">How's your mindset today?</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {metrics.map((m) => (
                <Slider
                  key={m.key}
                  label={m.label}
                  value={values[m.key]}
                  onChange={(v) => setValues((s) => ({ ...s, [m.key]: v }))}
                  color={m.color as 'rose' | 'emerald' | 'amber' | 'blue' | 'violet'}
                  leftLabel="Low" rightLabel="High"
                />
              ))}
            </div>
            <div className="mt-6">
              <Textarea label="Journal entry" rows={5} placeholder="What's on your mind today? Wins, worries, reflections..." value={journal} onChange={(e) => setJournal(e.target.value)} />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save reflection'}</Button>
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900"><BookHeart size={18} className="text-blue-500" /> Past reflections</h3>
          <div className="space-y-3">
            {mentalHistory.slice(-4).reverse().map((e) => (
              <div key={e.id} className="rounded-2xl border border-slate-100 p-3">
                <p className="text-xs font-semibold text-slate-400">{formatDate(e.date)}</p>
                <p className="mt-1 text-sm italic text-slate-600">"{e.journal}"</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="mb-4 font-bold text-slate-900">Mental health trends</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="Anxiety" stroke={colorHex.rose} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Confidence" stroke={colorHex.emerald} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Motivation" stroke={colorHex.blue} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Stress" stroke={colorHex.violet} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AppLayout>
  );
}
