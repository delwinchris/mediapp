import { useEffect, useMemo, useState } from 'react';
import { Brain, Check, Wind } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Slider, Textarea } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { BreathingModal } from '@/components/ui/BreathingModal';
import { breathingExercises } from '@/lib/mockData';
import { journalService, mentalLogService } from '@/services';
import { useAppStore } from '@/lib/store';
import type { BreathingExercise, JournalEntry, MentalEntry } from '@/lib/types';

const defaults = { anxiety: 5, confidence: 5, fearOfReinjury: 5, motivation: 5, stress: 5 };

export function MentalRecoveryPage() {
  const { addMentalLog } = useAppStore();
  const [values, setValues] = useState(defaults);
  const [reflection, setReflection] = useState('');
  const [history, setHistory] = useState<MentalEntry[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [breathing, setBreathing] = useState<BreathingExercise | null>(null);
  const load = async () => {
    const [mental, entries] = await Promise.all([mentalLogService.getAll(), journalService.getAll()]);
    setHistory(mental); setJournals(entries);
  };
  useEffect(() => { void load().catch(() => setMessage('Could not load your mental recovery history.')).finally(() => setLoading(false)); }, []);
  const setValue = (key: keyof typeof defaults, value: number) => setValues((current) => ({ ...current, [key]: value }));
  const save = async () => {
    setSaving(true); setMessage(null);
    try {
      await addMentalLog({ id: '', date: new Date().toISOString().slice(0, 10), ...values, journal: reflection.trim() });
      setReflection(''); await load(); setMessage('Your mental check-in was saved.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not save your check-in.'); }
    finally { setSaving(false); }
  };
  const chartData = useMemo(() => history.slice().reverse().map((entry) => ({ date: new Date(`${entry.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), Confidence: entry.confidence, Stress: entry.stress })), [history]);
  return <AppLayout>
    <PageHeader title="Mental Recovery" subtitle="Check in with your mindset and build a record you can return to." />
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2"><div className="mb-6 flex items-center gap-3"><span className="rounded-2xl bg-violet-50 p-3 text-violet-600"><Brain size={22} /></span><div><h2 className="font-bold text-slate-900">Today's mental check-in</h2><p className="text-sm text-slate-500">Your entries are private to your account.</p></div></div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Slider label="Anxiety" value={values.anxiety} min={0} max={10} onChange={(value) => setValue('anxiety', value)} color="rose" leftLabel="Low" rightLabel="High" />
          <Slider label="Confidence" value={values.confidence} min={0} max={10} onChange={(value) => setValue('confidence', value)} color="emerald" leftLabel="Low" rightLabel="High" />
          <Slider label="Fear of reinjury" value={values.fearOfReinjury} min={0} max={10} onChange={(value) => setValue('fearOfReinjury', value)} color="amber" leftLabel="Low" rightLabel="High" />
          <Slider label="Motivation" value={values.motivation} min={0} max={10} onChange={(value) => setValue('motivation', value)} color="blue" leftLabel="Low" rightLabel="High" />
          <Slider label="Stress" value={values.stress} min={0} max={10} onChange={(value) => setValue('stress', value)} color="violet" leftLabel="Low" rightLabel="High" />
        </div>
        <div className="mt-6"><Textarea label="Reflection (optional)" rows={3} value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="What is on your mind today?" /></div>
        <div className="mt-6 flex items-center gap-3"><Button onClick={save} disabled={saving}>{saving ? 'Saving...' : <><Check size={16} /> Save check-in</>}</Button>{message && <p className={message.includes('saved') ? 'text-sm text-emerald-600' : 'text-sm text-rose-600'}>{message}</p>}</div>
      </Card>
      <Card><h2 className="font-bold text-slate-900">Recent reflections</h2>{loading ? <p className="mt-4 text-sm text-slate-400">Loading your entries...</p> : journals.length === 0 ? <p className="mt-4 text-sm text-slate-400">Write your first reflection to see it here.</p> : <div className="mt-4 space-y-3">{journals.slice(0, 4).map((entry) => <div key={entry.id} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600"><p className="text-xs text-slate-400">{entry.date}</p>{entry.grateful || entry.feeling || entry.win || entry.challenge}</div>)}</div>}</Card>
    </div>
    <section className="mt-8"><h2 className="mb-4 text-lg font-bold text-slate-900">Your mental trends</h2><Card className="h-72">{chartData.length === 0 ? <EmptyState icon={Brain} title="No mental check-ins yet" description="Complete your first check-in to begin seeing honest trends." /> : <ResponsiveContainer width="100%" height="100%"><LineChart data={chartData}><XAxis dataKey="date" /><YAxis domain={[0, 10]} /><Tooltip /><Line type="monotone" dataKey="Confidence" stroke="#10b981" strokeWidth={3} /><Line type="monotone" dataKey="Stress" stroke="#8b5cf6" strokeWidth={3} /></LineChart></ResponsiveContainer>}</Card></section>
    <section className="mt-8"><h2 className="mb-4 text-lg font-bold text-slate-900">Breathing exercises</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{breathingExercises.map((exercise) => <Card key={exercise.id} hover><Wind className="text-blue-500" /><h3 className="mt-3 font-bold text-slate-900">{exercise.name}</h3><p className="mt-1 text-sm text-slate-500">{exercise.description}</p><Button size="sm" variant="outline" className="mt-4" onClick={() => setBreathing(exercise)}>Start session</Button></Card>)}</div></section>
    {breathing && <BreathingModal exercise={breathing} onClose={() => setBreathing(null)} />}
  </AppLayout>;
}
