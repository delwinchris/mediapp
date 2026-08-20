import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse, Footprints, Moon, Zap, Droplets, StickyNote, Check, Calendar, Dumbbell,
  Activity, Trophy, Flag, Bike, Medal, ShieldCheck, AlertTriangle, Pill,
  type LucideIcon,
} from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider, Textarea, Select } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { swellingLevels, exercises } from '@/lib/mockData';
import { formatDate } from '@/lib/analytics';
import { recoveryLogService } from '@/services';
import type { RecoveryEntry } from '@/lib/types';
import { cn } from '@/lib/cn';

const milestoneIcons: Record<string, LucideIcon> = {
  Flag, HeartPulse, Footprints, Activity, Dumbbell, Bike, Trophy, Medal,
};

const recoveryMilestones = [
  { id: 'm1', title: 'Surgery Completed', date: '2026-05-14', achieved: true, icon: 'Flag' },
  { id: 'm2', title: 'First Pain-Free Day', date: '2026-05-28', achieved: true, icon: 'HeartPulse' },
  { id: 'm3', title: 'First Walk', date: '2026-06-14', achieved: true, icon: 'Footprints' },
  { id: 'm4', title: 'First Full Range of Motion', date: '2026-08-14', achieved: false, icon: 'Activity' },
  { id: 'm5', title: 'First Gym Session', date: '2026-11-14', achieved: false, icon: 'Dumbbell' },
  { id: 'm6', title: 'Return to Work', date: '2026-09-01', achieved: false, icon: 'Medal' },
  { id: 'm7', title: 'Return to Sport', date: '2027-02-14', achieved: false, icon: 'Trophy' },
];

const todaysExercises = exercises.slice(0, 4);

function computeScore(entry: RecoveryEntry): number {
  const painScore = (10 - entry.pain) * 10;
  const mobilityScore = entry.mobility * 5;
  const sleepScore = (entry.sleep / 8) * 25;
  const energyScore = entry.energy * 2.5;
  const moodScore = entry.mood * 2.5;
  return Math.round(Math.min(100, Math.max(0, painScore + mobilityScore + sleepScore + energyScore + moodScore)));
}

export function RecoveryTrackerPage() {
  const [pain, setPain] = useState(3);
  const [mobility, setMobility] = useState(70);
  const [strength, setStrength] = useState(55);
  const [sleep, setSleep] = useState(7);
  const [energy, setEnergy] = useState(8);
  const [swelling, setSwelling] = useState(3);
  const [medication, setMedication] = useState(true);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<RecoveryEntry[]>([]);

  useEffect(() => {
    recoveryLogService.getAll()
      .then(setHistory)
      .catch((err) => console.error('Failed to load recovery history:', err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      const date = new Date().toISOString().slice(0, 10);
      const data = {
        date,
        pain,
        mobility: Math.round(mobility / 10),
        strength,
        sleep,
        energy,
        swelling,
        mood: energy,
        medication,
        notes,
      };
      const existing = history.find((e) => e.date === date);
      if (existing) {
        await recoveryLogService.update(existing.id, data);
      } else {
        await recoveryLogService.create(data);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      const fresh = await recoveryLogService.getAll();
      setHistory(fresh);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save your entry. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const today = history[history.length - 1] ?? { date: new Date().toISOString().slice(0, 10) };

  const readiness = Math.round(
    ((10 - pain) * 10 + mobility + strength + (sleep / 12) * 100 + (Object.values(completed).filter(Boolean).length / todaysExercises.length) * 100 + 80) / 6
  );

  const strengths = [
    { label: 'Pain Level', value: `${pain}/10`, good: pain <= 4 },
    { label: 'Mobility', value: `${mobility}%`, good: mobility >= 60 },
    { label: 'Exercise Completion', value: `${Object.values(completed).filter(Boolean).length}/${todaysExercises.length}`, good: Object.values(completed).filter(Boolean).length >= 3 },
    { label: 'Sleep', value: `${sleep}h`, good: sleep >= 7 },
  ];

  const painData = history.map((e) => ({ date: e.date.slice(5), value: e.pain }));
  const mobilityData = history.map((e) => ({ date: e.date.slice(5), value: e.mobility }));
  const strengthData = history.map((e) => ({ date: e.date.slice(5), value: e.strength }));
  const scoreData = history.map((e) => ({ date: e.date.slice(5), score: computeScore(e) }));

  return (
    <AppLayout>
      <PageHeader title="Recovery Tracker" subtitle="Log how your body feels today. Daily tracking reveals real trends." />

      {/* Daily Check-in */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white"><Calendar size={20} /></div>
              <div>
                <h3 className="font-bold text-slate-900">Today's Check-in</h3>
                <p className="text-sm text-slate-500">{formatDate(today.date)}, 2026</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Slider label="Pain level" value={pain} min={0} max={10} onChange={setPain} color="rose" leftLabel="No pain" rightLabel="Worst" />
              <Slider label="Mobility" value={mobility} min={0} max={100} onChange={setMobility} color="emerald" leftLabel="Limited" rightLabel="Full" />
              <Slider label="Strength" value={strength} min={0} max={100} onChange={setStrength} color="blue" leftLabel="Weak" rightLabel="Full" />
              <Slider label="Energy" value={energy} min={0} max={10} onChange={setEnergy} color="amber" leftLabel="Exhausted" rightLabel="Energetic" />
              <Slider label="Sleep (hours)" value={sleep} min={0} max={12} onChange={setSleep} color="violet" leftLabel="0h" rightLabel="12h" />
              <Select label="Swelling" value={String(swelling)} onChange={(e) => setSwelling(Number(e.target.value))}>
                {swellingLevels.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setMedication((m) => !m)}
                className={cn('flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition-all', medication ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white')}
              >
                <div className={cn('flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all', medication ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300')}>
                  {medication && <Check size={14} />}
                </div>
                <span className="text-sm font-semibold text-slate-700">Medication taken</span>
              </button>
            </div>

            <div className="mt-6">
              <Textarea label="Notes" rows={4} placeholder="How did today go? Anything to remember for your next physio visit?" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : saveSuccess ? (<><Check size={18} /> Saved!</>) : 'Save entry'}
              </Button>
              <Button variant="outline" onClick={() => { setPain(5); setMobility(50); setStrength(40); setSleep(7); setEnergy(5); setSwelling(3); setNotes(''); }}>Reset</Button>
            </div>

            {saveError && (
              <p className="mt-3 flex items-center gap-2 text-sm font-medium text-rose-600">
                <AlertTriangle size={16} /> {saveError}
              </p>
            )}
          </Card>
        </div>

        {/* Today's snapshot */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 font-bold text-slate-900">Today's Snapshot</h3>
            <div className="space-y-3">
              {[
                { label: 'Pain', value: `${pain}/10`, icon: HeartPulse, color: 'text-rose-500 bg-rose-50' },
                { label: 'Mobility', value: `${mobility}%`, icon: Footprints, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Strength', value: `${strength}%`, icon: Dumbbell, color: 'text-blue-600 bg-blue-50' },
                { label: 'Sleep', value: `${sleep}h`, icon: Moon, color: 'text-violet-600 bg-violet-50' },
                { label: 'Energy', value: `${energy}/10`, icon: Zap, color: 'text-amber-600 bg-amber-50' },
                { label: 'Swelling', value: swellingLevels.find((s) => s.value === swelling)?.label ?? 'None', icon: Droplets, color: 'text-cyan-600 bg-cyan-50' },
                { label: 'Medication', value: medication ? 'Yes' : 'No', icon: Pill, color: medication ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', s.color)}><s.icon size={16} /></div>
                  <span className="text-sm font-medium text-slate-600">{s.label}</span>
                  <span className="ml-auto font-bold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900"><StickyNote size={18} className="text-slate-400" /> Recent Notes</h3>
            <div className="space-y-3">
              {history.slice(-3).reverse().map((e) => (
                <div key={e.id} className="rounded-2xl border border-slate-100 p-3">
                  <p className="text-xs font-semibold text-slate-400">{formatDate(e.date)}</p>
                  <p className="mt-1 text-sm text-slate-600">{e.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Progress Charts</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Pain Trend</h4>
            <p className="mb-4 text-xs text-slate-400">Lower is better</p>
            <div className="h-48">
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
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mobilityData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs><linearGradient id="mobG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#mobG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Strength Progress</h4>
            <p className="mb-4 text-xs text-slate-400">Higher is better</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={strengthData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs><linearGradient id="strG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} /><stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2.5} fill="url(#strG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Recovery Score</h4>
            <p className="mb-4 text-xs text-slate-400">Overall progress</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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

      {/* Recovery Readiness */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recovery Readiness</h3>
        <Card glass className="overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center">
              <RecoveryRing score={readiness} size={180} label="readiness" />
              <p className="mt-4 text-sm font-semibold text-slate-500">Based on pain, mobility, sleep, exercise completion & confidence</p>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {strengths.map((s) => (
                  <div key={s.label} className={cn('rounded-2xl border p-4', s.good ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50')}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">{s.label}</span>
                      {s.good ? <ShieldCheck size={18} className="text-emerald-500" /> : <AlertTriangle size={18} className="text-amber-500" />}
                    </div>
                    <p className={cn('mt-1 text-2xl font-bold', s.good ? 'text-emerald-600' : 'text-amber-600')}>{s.value}</p>
                    <p className="mt-1 text-xs text-slate-500">{s.good ? 'On track' : 'Needs attention'}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">Strengths</p>
                <p className="mt-1 text-sm text-slate-600">Pain is well-managed and sleep quality is strong. Keep maintaining your medication schedule.</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-amber-600">Areas needing attention</p>
                <p className="mt-1 text-sm text-slate-600">Focus on completing all prescribed exercises and gradually increasing strength work.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recovery Timeline */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recovery Timeline</h3>
        <Card>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-emerald-400 to-slate-200" />
            <div className="space-y-6">
              {recoveryMilestones.map((m, i) => {
                const Icon = milestoneIcons[m.icon] ?? Flag;
                return (
                  <motion.div key={m.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative flex gap-4">
                    <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-md', m.achieved ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white' : 'bg-slate-100 text-slate-400')}>
                      <Icon size={16} />
                    </div>
                    <div className={cn('flex-1 rounded-2xl border p-4', m.achieved ? 'border-slate-200 bg-white' : 'border-dashed border-slate-200 bg-slate-50')}>
                      <div className="flex items-center justify-between">
                        <h4 className={cn('font-bold', m.achieved ? 'text-slate-900' : 'text-slate-500')}>{m.title}</h4>
                        <span className="text-xs font-semibold text-slate-400">{formatDate(m.date)}</span>
                      </div>
                      {m.achieved ? (
                        <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600">Completed</span>
                      ) : (
                        <span className="mt-2 inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600">Upcoming</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Exercises */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Today's Exercises</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {todaysExercises.map((ex, i) => {
            const done = !!completed[ex.id];
            return (
              <motion.div key={ex.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card hover className={cn('transition-all', done && 'opacity-70')}>
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                      <img src={ex.image} alt={ex.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900">{ex.name}</h4>
                        <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', ex.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' : ex.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600')}>{ex.difficulty}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{ex.targetArea}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                        <span>{ex.sets} sets × {ex.reps} reps</span>
                        <span>~{ex.duration}</span>
                      </div>
                      <Button
                        size="sm"
                        variant={done ? 'outline' : 'primary'}
                        className="mt-3"
                        onClick={() => setCompleted((c) => ({ ...c, [ex.id]: !c[ex.id] }))}
                      >
                        {done ? (<><Check size={16} /> Completed</>) : 'Complete'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent history table */}
      <Card className="mt-8">
        <h3 className="mb-4 font-bold text-slate-900">Recent History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">Date</th><th className="pb-3 pr-4">Pain</th><th className="pb-3 pr-4">Mobility</th>
                <th className="pb-3 pr-4">Strength</th><th className="pb-3 pr-4">Sleep</th><th className="pb-3 pr-4">Energy</th><th className="pb-3 pr-4">Swelling</th><th className="pb-3 pr-4">Mood</th>
              </tr>
            </thead>
            <tbody>
              {history.slice().reverse().map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-700">{formatDate(e.date)}</td>
                  <td className="py-3 pr-4"><span className={cn('rounded-lg px-2 py-0.5 text-xs font-bold', e.pain <= 3 ? 'bg-emerald-50 text-emerald-600' : e.pain <= 6 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600')}>{e.pain}/10</span></td>
                  <td className="py-3 pr-4 text-slate-600">{e.mobility}/10</td>
                  <td className="py-3 pr-4 text-slate-600">{e.strength}%</td>
                  <td className="py-3 pr-4 text-slate-600">{e.sleep}h</td>
                  <td className="py-3 pr-4 text-slate-600">{e.energy}/10</td>
                  <td className="py-3 pr-4 text-slate-600">{e.swelling}/10</td>
                  <td className="py-3 pr-4 text-slate-600">{e.mood}/10</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}