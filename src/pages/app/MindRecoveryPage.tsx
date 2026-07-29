import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, Wind, Smile, ShieldAlert, Flame, Heart, TrendingUp, TrendingDown,
  BookHeart, Mic, Plus, Check, Quote, Trophy, Footprints, Flag, Dumbbell, Bike, Medal,
  HeartPulse, LifeBuoy, X, ArrowRight, Calendar,
  type LucideIcon,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider, Textarea } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { BreathingModal } from '@/components/ui/BreathingModal';
import {
  mindCheckInMetrics, defaultMindCheckIn, mindHistory, mindChartDates,
  journalEntries, timelineMilestones, breathingExercises,
  motivationStories, dailyQuotes, dailyWins,
} from '@/lib/mockData';
import type { MindCheckIn, BreathingExercise, TimelineMilestone } from '@/lib/types';
import { formatDate } from '@/lib/analytics';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  Flag, HeartPulse, Footprints, Dumbbell, Bike, Trophy, Medal,
};

const chartMetrics = [
  { key: 'confidence' as const, label: 'Confidence', color: '#10b981' },
  { key: 'motivation' as const, label: 'Motivation', color: '#2563eb' },
  { key: 'stress' as const, label: 'Stress', color: '#8b5cf6' },
  { key: 'fearOfReinjury' as const, label: 'Fear of Reinjury', color: '#f59e0b' },
  { key: 'hopefulness' as const, label: 'Hopefulness', color: '#0ea5e9' },
];

export function MindRecoveryPage() {
  const [checkIn, setCheckIn] = useState<MindCheckIn>(defaultMindCheckIn);
  const [savedCheckIn, setSavedCheckIn] = useState(false);
  const [feeling, setFeeling] = useState('');
  const [win, setWin] = useState('');
  const [challenge, setChallenge] = useState('');
  const [savedJournal, setSavedJournal] = useState(false);
  const [breathing, setBreathing] = useState<BreathingExercise | null>(null);
  const [wins, setWins] = useState(dailyWins);
  const [winText, setWinText] = useState('');
  const [savedWin, setSavedWin] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  const setMetric = (k: keyof MindCheckIn, v: number) => setCheckIn((c) => ({ ...c, [k]: v }));

  const saveCheckIn = () => { setSavedCheckIn(true); setTimeout(() => setSavedCheckIn(false), 2500); };
  const saveJournal = () => { setSavedJournal(true); setTimeout(() => setSavedJournal(false), 2500); };

  const addWin = () => {
    if (!winText.trim()) return;
    setWins((w) => [{ id: `dw${Date.now()}`, date: new Date().toISOString().slice(0, 10), text: winText }, ...w]);
    setWinText('');
    setSavedWin(true);
    setTimeout(() => setSavedWin(false), 2500);
  };

  const chartData = mindChartDates.map((date, i) => {
    const row: Record<string, string | number> = { date };
    chartMetrics.forEach((m) => { row[m.label] = mindHistory[i][m.key]; });
    return row;
  });

  const latest = mindHistory[mindHistory.length - 1];
  const prev = mindHistory[mindHistory.length - 2];
  const highStressDays = mindHistory.slice(-3).filter((e) => e.stress >= 7 || e.anxiety >= 7).length;
  const showEmergency = highStressDays >= 2;

  return (
    <AppLayout>
      <PageHeader title="Mind Recovery" subtitle="Your emotional and psychological wellbeing, tracked and supported." />

      {/* Section 1: Today's Mental Check-In */}
      <section className="mb-8">
        <SectionLabel icon={<Brain size={18} />} title="Today's Mental Check-In" subtitle="How are you feeling right now? Move the sliders to log your state." />
        <Card glass>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mindCheckInMetrics.map((m) => (
              <Slider
                key={m.key}
                label={m.label}
                value={checkIn[m.key]}
                onChange={(v) => setMetric(m.key, v)}
                color={m.color as 'blue' | 'emerald' | 'amber' | 'violet' | 'rose'}
                leftLabel={m.invert ? 'None' : 'Low'}
                rightLabel={m.invert ? 'High' : 'High'}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Button onClick={saveCheckIn} disabled={savedCheckIn}>
              {savedCheckIn ? (<><Check size={18} /> Saved!</>) : 'Save today\'s entry'}
            </Button>
          </div>
        </Card>
      </section>

      {/* Section 2: AI Reflection Card */}
      <section className="mb-8">
        <SectionLabel icon={<Sparkles size={18} />} title="AI Reflection" subtitle="A personalized reflection based on your recent entries." />
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-emerald-300/20 blur-2xl" />
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></div>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-blue-50">
              "Your confidence has improved over the last week while anxiety has slightly decreased.
              You're staying consistent with your recovery. Continue focusing on sleep and completing today's exercises."
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-blue-100">
              <span className="rounded-full bg-white/15 px-2.5 py-1 font-semibold">Updated today</span>
              <span>Based on your last 7 entries</span>
            </div>
            <div className="mt-6 flex items-start gap-2 rounded-2xl bg-white/10 p-3 text-xs text-blue-50 backdrop-blur">
              <LifeBuoy size={14} className="mt-0.5 shrink-0" />
              <span>AI is not a replacement for professional mental health care. If you're struggling, please reach out to a qualified healthcare professional.</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Section 3: Recovery Journal */}
      <section className="mb-8">
        <SectionLabel icon={<BookHeart size={18} />} title="Recovery Journal" subtitle="Reflect on today. There are no wrong answers." />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="space-y-5">
              <Textarea label="How do you feel today?" rows={3} placeholder="Describe your emotional state in your own words..." value={feeling} onChange={(e) => setFeeling(e.target.value)} />
              <Textarea label="What was your biggest win?" rows={2} placeholder="Even small wins count..." value={win} onChange={(e) => setWin(e.target.value)} />
              <Textarea label="What challenged you today?" rows={2} placeholder="What was difficult or frustrating?" value={challenge} onChange={(e) => setChallenge(e.target.value)} />
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={saveJournal} disabled={savedJournal}>{savedJournal ? (<><Check size={18} /> Saved!</>) : 'Save journal entry'}</Button>
                <Button variant="outline"><Mic size={16} /> Voice journal</Button>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 font-bold text-slate-900">Past entries</h3>
            <div className="space-y-3">
              {journalEntries.map((j) => (
                <div key={j.id} className="rounded-2xl border border-slate-100 p-3">
                  <p className="text-xs font-semibold text-slate-400">{formatDate(j.date)}</p>
                  <p className="mt-1 text-sm text-slate-600"><span className="font-semibold text-slate-700">Feeling:</span> {j.feeling}</p>
                  <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Win:</span> {j.win}</p>
                  <p className="text-sm text-slate-600"><span className="font-semibold text-slate-700">Challenge:</span> {j.challenge}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Section 4: Recovery Story Timeline */}
      <section className="mb-8">
        <SectionLabel
          icon={<TrendingUp size={18} />}
          title="Recovery Story Timeline"
          subtitle="Every milestone matters. Here's your journey so far."
          action={<Button variant="outline" size="sm" onClick={() => setShowAddMilestone(true)}><Plus size={16} /> Add milestone</Button>}
        />
        <Card>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-emerald-400 to-slate-200" />
            <div className="space-y-6">
              {timelineMilestones.map((m, i) => {
                const Icon = iconMap[m.icon] ?? Flag;
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative flex gap-4"
                  >
                    <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-md', m.achieved ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white' : 'bg-slate-100 text-slate-400')}>
                      <Icon size={16} />
                    </div>
                    <div className={cn('flex-1 rounded-2xl border p-4', m.achieved ? 'border-slate-200 bg-white' : 'border-dashed border-slate-200 bg-slate-50')}>
                      <div className="flex items-center justify-between">
                        <h4 className={cn('font-bold', m.achieved ? 'text-slate-900' : 'text-slate-500')}>{m.title}</h4>
                        <span className="text-xs font-semibold text-slate-400">{formatDate(m.date)}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{m.description}</p>
                      {!m.achieved && <span className="mt-2 inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600">Upcoming</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      </section>

      {/* Section 5: Mental Progress Charts */}
      <section className="mb-8">
        <SectionLabel icon={<TrendingUp size={18} />} title="Mental Progress Charts" subtitle="Visualize your emotional trajectory over the past week." />
        <Card>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                {chartMetrics.map((m) => (
                  <Line key={m.key} type="monotone" dataKey={m.label} stroke={m.color} strokeWidth={2.5} dot={false} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Section 6: Breathing Exercises */}
      <section className="mb-8">
        <SectionLabel icon={<Wind size={18} />} title="Breathing Exercises" subtitle="Short, guided practices to calm your mind and body." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {breathingExercises.map((b, i) => (
            <motion.button
              key={b.id}
              onClick={() => setBreathing(b)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-3xl p-5 text-left shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md', b.color)}>
                <Wind size={22} />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">{b.name}</h3>
              <p className="mt-1 text-xs font-semibold text-slate-400">{b.duration} · {b.pattern}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:gap-2">
                Start session <ArrowRight size={14} />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Section 7: Motivation Library */}
      <section className="mb-8">
        <SectionLabel icon={<Heart size={18} />} title="Motivation Library" subtitle="Comeback stories and daily wisdom to keep you going." />
        <div className="grid gap-6 lg:grid-cols-3">
          {motivationStories.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card hover className="h-full overflow-hidden p-0">
                <div className="relative h-40 overflow-hidden">
                  <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-xs font-semibold text-blue-200">{s.sport}</p>
                    <h3 className="text-lg font-bold text-white">{s.title}</h3>
                    <p className="text-sm text-slate-200">{s.athlete}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm leading-relaxed text-slate-600">{s.excerpt}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card glass className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"><Quote size={22} /></div>
            <div>
              <p className="text-lg font-medium italic leading-relaxed text-slate-700">"{dailyQuotes[0].quote}"</p>
              <p className="mt-2 text-sm font-semibold text-slate-400">— {dailyQuotes[0].author}</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Section 8: Daily Win */}
      <section className="mb-8">
        <SectionLabel icon={<Trophy size={18} />} title="Daily Win" subtitle="Celebrate one thing you're proud of today." />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <h3 className="mb-3 font-bold text-slate-900">What is one thing you're proud of today?</h3>
            <Textarea rows={3} placeholder="Today I'm proud of..." value={winText} onChange={(e) => setWinText(e.target.value)} />
            <Button onClick={addWin} disabled={!winText.trim() || savedWin} className="mt-3" fullWidth>
              {savedWin ? (<><Check size={18} /> Saved!</>) : 'Save win'}
            </Button>
          </Card>
          <Card className="lg:col-span-2">
            <h3 className="mb-4 font-bold text-slate-900">Your wins timeline</h3>
            <div className="relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber-300 to-slate-100" />
              <div className="space-y-4">
                {wins.map((w, i) => (
                  <motion.div key={w.id} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative flex gap-4">
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md"><Trophy size={14} /></div>
                    <div className="flex-1 rounded-2xl border border-slate-100 bg-amber-50/50 p-3">
                      <p className="text-xs font-semibold text-slate-400">{formatDate(w.date)}</p>
                      <p className="mt-0.5 text-sm font-medium text-slate-700">{w.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 9: Emergency Support */}
      {showEmergency && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card glass className="border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg"><LifeBuoy size={24} /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">You don't have to do this alone</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  We've noticed your stress or anxiety has been high for several days in a row. That's a signal
                  worth listening to. Please consider reaching out to a trusted friend, family member, or a
                  qualified mental health professional. Talking to someone is a sign of strength — not weakness.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="danger" size="sm">Find support resources</Button>
                  <Button variant="outline" size="sm">Talk to AI coach</Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>
      )}

      {/* Breathing modal */}
      <AnimatePresence>
        {breathing && <BreathingModal exercise={breathing} onClose={() => setBreathing(null)} />}
      </AnimatePresence>

      {/* Add milestone modal */}
      <AnimatePresence>
        {showAddMilestone && <AddMilestoneModal onClose={() => setShowAddMilestone(false)} />}
      </AnimatePresence>
    </AppLayout>
  );
}

function SectionLabel({ icon, title, subtitle, action }: { icon: React.ReactNode; title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-md shadow-blue-500/20">{icon}</div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

function AddMilestoneModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(onClose, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Add a milestone</h3>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Milestone title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. First run post-surgery" className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Target date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Description</label>
            <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What does this milestone mean to you?" className="w-full resize-none rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100" />
          </div>
        </div>
        <Button onClick={save} fullWidth disabled={!title || saved} className="mt-5">
          {saved ? (<><Check size={18} /> Added!</>) : 'Add to timeline'}
        </Button>
      </motion.div>
    </motion.div>
  );
}
