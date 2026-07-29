import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartPulse, Smile, Moon, Footprints, Flame, ArrowRight, Check, Sparkles, Dumbbell, TrendingUp,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { Button } from '@/components/ui/Button';
import { dailyGoals, upcomingExercises, mockUser } from '@/lib/mockData';
import { computeRecoveryScore, recoveryScoreSeries, getStreak } from '@/lib/analytics';

export function DashboardPage() {
  const score = computeRecoveryScore();
  const series = recoveryScoreSeries();
  const streak = getStreak();
  const [goals, setGoals] = useState(dailyGoals);

  const toggleGoal = (id: string) => setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  const completedGoals = goals.filter((g) => g.done).length;

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <p className="text-sm font-medium text-slate-500">Good morning,</p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{mockUser.name.split(' ')[0]}</h2>
        <p className="mt-1 text-slate-500">
          You're on a <span className="font-semibold text-emerald-600">{streak}-day streak</span>. Keep showing up.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card glass className="flex flex-col items-center justify-center py-8">
          <p className="text-sm font-semibold text-slate-500">Recovery Score</p>
          <div className="mt-4"><RecoveryRing score={score} size={170} label="out of 100" /></div>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
            <TrendingUp size={14} /> +12 this week
          </div>
        </Card>

        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          <StatCard label="Pain Today" value="3" unit="/10" icon={<HeartPulse size={20} />} accent="rose" trend={{ value: '3 pts lower', up: true }} />
          <StatCard label="Mood" value="9" unit="/10" icon={<Smile size={20} />} accent="amber" trend={{ value: '1 pt higher', up: true }} />
          <StatCard label="Sleep" value="7" unit="hrs" icon={<Moon size={20} />} accent="violet" trend={{ value: '0.5h more', up: true }} />
          <StatCard label="Mobility" value="7" unit="/10" icon={<Footprints size={20} />} accent="emerald" trend={{ value: '1 pt higher', up: true }} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Weekly Progress</h3>
              <p className="text-sm text-slate-500">Your recovery score over the past week</p>
            </div>
            <Link to="/app/progress"><Button variant="ghost" size="sm">View all <ArrowRight size={16} /></Button></Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} labelStyle={{ fontWeight: 600 }} />
                <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="relative">
            <div className="pulse-ring relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30">
              <Flame size={36} />
            </div>
          </div>
          <p className="mt-5 text-4xl font-bold text-slate-900">{streak}</p>
          <p className="text-sm font-semibold text-slate-500">day recovery streak</p>
          <p className="mt-3 text-center text-xs text-slate-400">Log your recovery today to keep your streak alive.</p>
          <Link to="/app/tracker" className="mt-4 w-full"><Button variant="secondary" size="sm" fullWidth>Log today</Button></Link>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Daily Goals</h3>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{completedGoals}/{goals.length} done</span>
          </div>
          <div className="space-y-2">
            {goals.map((g) => (
              <button key={g.id} onClick={() => toggleGoal(g.id)} className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50">
                <div className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${g.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>
                  {g.done && <Check size={14} />}
                </div>
                <span className={`text-sm font-medium ${g.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{g.title}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card glass className="flex flex-col bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={22} /></div>
          <h3 className="mt-4 text-lg font-bold">AI Recovery Coach</h3>
          <p className="mt-2 flex-1 text-sm text-blue-50">"You've lowered your pain from 6 to 3 this week — that's real progress. Want me to suggest today's exercises?"</p>
          <Link to="/app/coach" className="mt-4">
            <Button className="bg-white text-blue-700 hover:bg-blue-50" size="sm" fullWidth>Chat with coach <ArrowRight size={16} /></Button>
          </Link>
        </Card>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Upcoming Exercises</h3>
          <Link to="/app/exercises"><Button variant="ghost" size="sm">View library <ArrowRight size={16} /></Button></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingExercises.map((ex, i) => (
            <motion.div key={ex.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover className="overflow-hidden p-0">
                <div className="relative h-32 overflow-hidden">
                  <img src={ex.image} alt={ex.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-700 backdrop-blur">{ex.difficulty}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400"><Dumbbell size={14} /> {ex.category}</div>
                  <h4 className="mt-1.5 font-bold text-slate-900">{ex.name}</h4>
                  <p className="mt-1 text-sm text-slate-500">{ex.sets} sets × {ex.reps} reps · {ex.duration}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
