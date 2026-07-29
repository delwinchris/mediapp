import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartPulse, Smile, Moon, Footprints, Flame, ArrowRight, Check, Sparkles, Dumbbell,
  Droplets, Pill, TrendingUp, BookHeart, Trophy, LifeBuoy, Calendar, Quote,
  type LucideIcon,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import {
  recoveryPlan, recentActivity, dailyMotivation, aiCoachMessage,
  dailyGoals, upcomingExercises,
} from '@/lib/mockData';
import { computeRecoveryScore, recoveryScoreSeries, painSeries, mobilitySeries, getStreak } from '@/lib/analytics';
import { cn } from '@/lib/cn';

const planIcons: Record<string, LucideIcon> = { Dumbbell, Droplets, Pill, Footprints };
const activityIcons: Record<string, LucideIcon> = { Dumbbell, HeartPulse, BookHeart, Trophy };

export function DashboardPage() {
  const { user } = useAuth();
  const score = computeRecoveryScore();
  const series = recoveryScoreSeries();
  const streak = getStreak();
  const [goals, setGoals] = useState(dailyGoals);

  const firstName = user?.name?.split(' ')[0] ?? 'there';
  const recoveryDay = 74;
  const toggleGoal = (id: string) => setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  const completedGoals = goals.filter((g) => g.done).length;

  const painData = painSeries();
  const mobilityData = mobilitySeries();

  return (
    <AppLayout>
      {/* Welcome header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <p className="text-sm font-medium text-slate-500">Welcome back,</p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{firstName}</h2>
        <p className="mt-1 text-slate-500">
          You're on a <span className="font-semibold text-emerald-600">{streak}-day streak</span>. Keep showing up.
        </p>
      </motion.div>

      {/* Top section: Recovery Day, Score, Motivation */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card glass className="flex flex-col items-center justify-center py-8">
          <p className="text-sm font-semibold text-slate-500">Recovery Score</p>
          <div className="mt-4"><RecoveryRing score={score} size={170} label="out of 100" /></div>
          <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
            <TrendingUp size={14} /> +12 this week
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <Card className="flex flex-col justify-center bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Calendar size={22} /></div>
              <div>
                <p className="text-3xl font-bold">Day {recoveryDay}</p>
                <p className="text-sm text-blue-100">of your recovery</p>
              </div>
            </div>
          </Card>
          <Card className="flex flex-col justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"><Flame size={22} /></div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{streak}</p>
                <p className="text-sm text-slate-500">day streak</p>
              </div>
            </div>
          </Card>
          <Card className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg"><Quote size={18} /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-violet-500">Daily Motivation</p>
                <p className="mt-1 text-sm font-medium italic leading-relaxed text-slate-700">"{dailyMotivation}"</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pain Today" value="3" unit="/10" icon={<HeartPulse size={20} />} accent="rose" trend={{ value: '3 pts lower', up: true }} />
        <StatCard label="Mobility" value="70" unit="%" icon={<Footprints size={20} />} accent="emerald" trend={{ value: '10% higher', up: true }} />
        <StatCard label="Sleep" value="7" unit="hrs" icon={<Moon size={20} />} accent="violet" trend={{ value: '0.5h more', up: true }} />
        <StatCard label="Mood" value="9" unit="/10" icon={<Smile size={20} />} accent="amber" trend={{ value: '1 pt higher', up: true }} />
      </div>

      {/* Today's Recovery Plan */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Today's Recovery Plan</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recoveryPlan.map((item, i) => {
            const Icon = planIcons[item.icon] ?? Dumbbell;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card hover className="h-full">
                  <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', item.color)}>
                    <Icon size={20} />
                  </div>
                  <h4 className="mt-4 font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div className={cn('h-full rounded-full bg-gradient-to-r', item.color)} initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Preview Charts */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Progress Preview</h3>
          <Link to="/app/progress"><Button variant="ghost" size="sm">View all <ArrowRight size={16} /></Button></Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Pain Trend</h4>
            <p className="mb-4 text-xs text-slate-400">Lower is better</p>
            <div className="h-40">
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
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mobilityData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs><linearGradient id="mobG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#mobG)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h4 className="mb-1 font-bold text-slate-900">Recovery Score</h4>
            <p className="mb-4 text-xs text-slate-400">Overall progress</p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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

      {/* AI Coach Preview + Daily Goals */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={22} /></div>
            <h3 className="mt-4 text-lg font-bold">AI Recovery Coach</h3>
            <p className="mt-2 text-sm leading-relaxed text-blue-50">"{aiCoachMessage}"</p>
            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-white/10 p-3 text-xs text-blue-50 backdrop-blur">
              <LifeBuoy size={14} className="mt-0.5 shrink-0" />
              <span>AI provides educational information only and is not a substitute for professional medical advice.</span>
            </div>
            <Link to="/app/coach" className="mt-4 block">
              <Button className="bg-white text-blue-700 hover:bg-blue-50" size="sm" fullWidth>Chat with coach <ArrowRight size={16} /></Button>
            </Link>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Daily Goals</h3>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{completedGoals}/{goals.length} done</span>
          </div>
          <div className="space-y-2">
            {goals.map((g) => (
              <button key={g.id} onClick={() => toggleGoal(g.id)} className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 p-3 text-left transition-colors hover:bg-slate-50">
                <div className={cn('flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all', g.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300')}>
                  {g.done && <Check size={14} />}
                </div>
                <span className={cn('text-sm font-medium', g.done ? 'text-slate-400 line-through' : 'text-slate-700')}>{g.title}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recent Activity</h3>
        <Card>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-300 to-slate-100" />
            <div className="space-y-5">
              {recentActivity.map((a, i) => {
                const Icon = activityIcons[a.icon] ?? Check;
                return (
                  <motion.div key={a.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="relative flex gap-4">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-md">
                      <Icon size={16} />
                    </div>
                    <div className="flex flex-1 items-center justify-between rounded-2xl border border-slate-100 bg-white p-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{a.title}</p>
                        <p className="text-xs text-slate-400">{a.time}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Exercises */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Exercises</h3>
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
