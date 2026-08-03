import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartPulse, Smile, Moon, Footprints, Flame, ArrowRight, Check, Sparkles, Dumbbell,
  Droplets, Pill, TrendingUp, BookHeart, Trophy, LifeBuoy, Calendar, Quote, Brain,
  Sunrise, Sun, Sunset, Moon as MoonIcon, Play, ClipboardList, Activity, Stethoscope,
  Target, Mountain, Mail, type LucideIcon,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import {
  recoveryPlan, recentActivity, dailyMotivation, aiCoachMessage,
  dailyGoals, upcomingExercises, recoveryInsights, weeklySummary, recoveryStory,
} from '@/lib/mockData';
import { computeRecoveryScore, recoveryScoreSeries, painSeries, mobilitySeries, getStreak, formatDate } from '@/lib/analytics';
import { getAiEncouragement, getDailyEncouragement, todaysMissions, myWhyOptions, recoveryDNA } from '@/lib/emotionalData';
import { cn } from '@/lib/cn';

const planIcons: Record<string, LucideIcon> = { Dumbbell, Droplets, Pill, Footprints };
const activityIcons: Record<string, LucideIcon> = { Dumbbell, HeartPulse, BookHeart, Trophy };
const insightIcons: Record<string, LucideIcon> = { HeartPulse, Smile, Moon, Dumbbell, TrendingUp, Brain };
const insightAccents: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-400 to-amber-500',
  violet: 'from-violet-500 to-violet-600',
  rose: 'from-rose-400 to-rose-500',
  sky: 'from-sky-400 to-sky-500',
};

export function DashboardPage() {
  const { user } = useAuth();
  const score = computeRecoveryScore();
  const series = recoveryScoreSeries();
  const streak = getStreak();
  const [goals, setGoals] = useState(dailyGoals);

  const firstName = user?.name?.split(' ')[0] ?? 'there';
  const recoveryDay = 74;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const greetingIcon = hour < 12 ? Sunrise : hour < 18 ? Sun : Sunset;
  const GreetingIcon = greetingIcon;
  const toggleGoal = (id: string) => setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, done: !g.done } : g)));
  const completedGoals = goals.filter((g) => g.done).length;

  const painData = painSeries();
  const mobilityData = mobilitySeries();

  const userMyWhy = user?.profile?.myWhy ?? 'Badminton';
  const myWhyOption = myWhyOptions.find((o) => o.value === userMyWhy) ?? myWhyOptions[6];
  const aiEncouragement = getAiEncouragement(recoveryDay);
  const dailyEncouragement = getDailyEncouragement(recoveryDay);
  const todaysMission = todaysMissions[recoveryDay % todaysMissions.length];
  const recoveryReadiness = Math.round(score * 0.4 + 91 * 0.3 + 76 * 0.3);
  const dnaAvg = Math.round(recoveryDNA.reduce((s, c) => s + c.score, 0) / recoveryDNA.length);

  const quickActions = [
    { label: 'Log Recovery', icon: HeartPulse, route: '/app/tracker', color: 'from-rose-400 to-rose-500' },
    { label: 'Exercises', icon: Dumbbell, route: '/app/exercises', color: 'from-blue-500 to-blue-600' },
    { label: 'AI Coach', icon: Sparkles, route: '/app/coach', color: 'from-emerald-500 to-emerald-600' },
    { label: 'Calendar', icon: Calendar, route: '/app/calendar', color: 'from-violet-500 to-violet-600' },
  ];

  const upcomingMilestones = recoveryStory.filter((m) => !m.achieved).slice(0, 3);

  return (
    <AppLayout>
      {/* Welcome header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2">
          <GreetingIcon size={20} className="text-amber-500" />
          <p className="text-sm font-medium text-slate-500">{greeting},</p>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{firstName}</h2>
        <p className="mt-1 text-slate-500">
          You're on a <span className="font-semibold text-emerald-600">{streak}-day streak</span>. Keep showing up.
        </p>
      </motion.div>

      {/* My Comeback Section */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {/* Recovery Day + Score + Readiness */}
        <Card glass className="flex flex-col items-center justify-center py-6">
          <p className="text-sm font-semibold text-slate-500">Recovery Score</p>
          <div className="mt-3"><RecoveryRing score={score} size={150} label="out of 100" /></div>
          <div className="mt-3 flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
            <TrendingUp size={14} /> +12 this week
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {/* Recovery Day */}
          <Card className="flex flex-col justify-center bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Calendar size={22} /></div>
              <div>
                <p className="text-3xl font-bold">Day {recoveryDay}</p>
                <p className="text-sm text-blue-100">of your comeback</p>
              </div>
            </div>
          </Card>

          {/* Recovery Readiness */}
          <Card className="flex flex-col justify-center bg-gradient-to-br from-violet-500 to-purple-500 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Activity size={22} /></div>
              <div>
                <p className="text-3xl font-bold">{recoveryReadiness}%</p>
                <p className="text-sm text-violet-100">recovery readiness</p>
              </div>
            </div>
          </Card>

          {/* Today's Mission */}
          <Card className="sm:col-span-2">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-lg"><Target size={18} /></div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-500">Today's Mission</p>
                <p className="mt-1 font-bold text-slate-900">{todaysMission.title}</p>
                <p className="text-sm text-slate-500">{todaysMission.detail}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Encouragement + My Why */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        {/* AI Encouragement */}
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-100">AI Encouragement</p>
              <p className="mt-2 text-base font-medium leading-relaxed">{aiEncouragement}</p>
              <p className="mt-3 text-xs text-violet-200">Recovery differs for every individual. Consult your physiotherapist for personalized guidance.</p>
            </div>
          </div>
        </Card>

        {/* My Why + Daily Encouragement */}
        <div className="grid gap-4">
          <Card glass className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <span className="text-4xl">{myWhyOption.emoji}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-50">My Why</p>
                <p className="text-xl font-bold">Return to {userMyWhy}</p>
                <p className="text-sm text-amber-50">This is what every exercise is for.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg"><HeartPulse size={18} /></div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-500">Daily Encouragement</p>
                <p className="mt-1 text-sm font-medium italic leading-relaxed text-slate-700">"{dailyEncouragement}"</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Comeback Journey Links */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Comeback Timeline', icon: Calendar, route: '/app/timeline', color: 'from-blue-500 to-blue-600' },
          { label: 'Recovery DNA', icon: Activity, route: '/app/dna', color: 'from-violet-500 to-purple-500' },
          { label: 'Recovery Mountain', icon: Mountain, route: '/app/mountain', color: 'from-emerald-500 to-teal-600' },
          { label: 'Future Self Letter', icon: Mail, route: '/app/letter', color: 'from-amber-400 to-orange-500' },
        ].map((a, i) => (
          <motion.div key={a.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link to={a.route}>
              <Card hover className="flex items-center gap-3 py-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', a.color)}>
                  <a.icon size={18} />
                </div>
                <span className="text-sm font-bold text-slate-700">{a.label}</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recovery Streak Banner */}
      <Card glass className="relative mb-6 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg"><Flame size={24} /></div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{streak}-day streak</p>
            <p className="text-sm text-slate-500">You completed your rehabilitation exercises for {streak} consecutive days. That kind of consistency is exactly what drives long-term recovery.</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((a, i) => (
          <motion.div key={a.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link to={a.route}>
              <Card hover className="flex items-center gap-3 py-4">
                <div className={cn('flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', a.color)}>
                  <a.icon size={18} />
                </div>
                <span className="text-sm font-bold text-slate-700">{a.label}</span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Continue Recovery */}
      <Card glass className="relative mb-6 overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Play size={22} /></div>
            <div>
              <h3 className="font-bold">Continue your recovery</h3>
              <p className="text-sm text-blue-100">You have 3 exercises remaining today. Keep your streak going!</p>
            </div>
          </div>
          <Link to="/app/exercises">
            <Button className="bg-white text-blue-700 hover:bg-blue-50" size="sm">Continue <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </Card>

      {/* Top section: Recovery Score (now in My Comeback above) — show DNA preview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card glass className="flex flex-col items-center justify-center py-8">
          <p className="text-sm font-semibold text-slate-500">Recovery DNA</p>
          <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-xl">
            <div className="text-center">
              <p className="text-4xl font-bold">{dnaAvg}</p>
              <p className="text-xs text-violet-100">out of 100</p>
            </div>
          </div>
          <Link to="/app/dna" className="mt-4"><Button variant="ghost" size="sm">View DNA <ArrowRight size={14} /></Button></Link>
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

      {/* Recovery Insights */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recovery Insights</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recoveryInsights.map((ins, i) => {
            const Icon = insightIcons[ins.icon] ?? TrendingUp;
            const good = ins.trend === 'up';
            return (
              <motion.div key={ins.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card hover className="h-full">
                  <div className="flex items-start justify-between">
                    <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', insightAccents[ins.accent])}>
                      <Icon size={20} />
                    </div>
                    <span className={cn('flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold', good ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500')}>
                      {good ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />} {ins.trendValue}
                    </span>
                  </div>
                  <h4 className="mt-4 font-bold text-slate-900">{ins.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{ins.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
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

      {/* AI Insight Card */}
      <div className="mt-8">
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-100">AI Recovery Insight</p>
              <p className="mt-2 text-base font-medium leading-relaxed">{aiCoachMessage}</p>
              <Link to="/app/insights" className="mt-4 inline-block">
                <Button className="bg-white/20 text-white hover:bg-white/30" size="sm">View all insights <ArrowRight size={14} /></Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Checklist */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900"><ClipboardList size={20} className="text-blue-500" /> Today's Checklist</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">{completedGoals}/{goals.length} done</span>
        </div>
        <Card>
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

      {/* Weekly Progress Summary */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Weekly Progress Summary</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card hover className="bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white"><TrendingUp size={18} /></div>
              <div><p className="text-2xl font-bold text-slate-900">+{weeklySummary.scoreChange}</p><p className="text-xs text-slate-500">Recovery score</p></div>
            </div>
          </Card>
          <Card hover className="bg-gradient-to-br from-rose-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white"><HeartPulse size={18} /></div>
              <div><p className="text-2xl font-bold text-slate-900">{weeklySummary.painChange}</p><p className="text-xs text-slate-500">Pain change</p></div>
            </div>
          </Card>
          <Card hover className="bg-gradient-to-br from-blue-50 to-sky-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white"><Dumbbell size={18} /></div>
              <div><p className="text-2xl font-bold text-slate-900">{weeklySummary.exerciseCompletion}%</p><p className="text-xs text-slate-500">Exercise completion</p></div>
            </div>
          </Card>
          <Card hover className="bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white"><Flame size={18} /></div>
              <div><p className="text-2xl font-bold text-slate-900">{weeklySummary.streak}</p><p className="text-xs text-slate-500">Day streak</p></div>
            </div>
          </Card>
        </div>
        <Card className="mt-4">
          <h4 className="mb-3 font-bold text-slate-900">This week's highlights</h4>
          <ul className="space-y-2">
            {weeklySummary.highlights.map((h, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2 text-sm text-slate-600">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {h}
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Upcoming Milestones */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Milestones</h3>
          <Link to="/app/plan"><Button variant="ghost" size="sm">View plan <ArrowRight size={16} /></Button></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {upcomingMilestones.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-lg"><Trophy size={18} /></div>
                <span className="mt-3 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600">{m.phase}</span>
                <h4 className="mt-2 font-bold text-slate-900">{m.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.description}</p>
                <p className="mt-2 text-xs font-semibold text-slate-400">{formatDate(m.date)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Coach Preview */}
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
            <h3 className="font-bold text-slate-900">Recent Activity</h3>
            <span className="text-xs text-slate-400">Last 5 actions</span>
          </div>
          <div className="space-y-2">
            {recentActivity.slice(0, 4).map((a) => {
              const Icon = activityIcons[a.icon] ?? Check;
              return (
                <div key={a.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon size={14} /></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-slate-700">{a.title}</p><p className="text-xs text-slate-400">{a.time}</p></div>
                </div>
              );
            })}
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
