import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse, Dumbbell, Brain, Smile, TrendingUp, CheckCircle,
  Download, FileText, Printer, Sparkles, Stethoscope, Activity,
  Calendar,
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { useAppStore } from '@/lib/store';
import { painSeries, mobilitySeries, sleepSeries, mentalSeries, recoveryScoreSeries } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { exerciseService } from '@/services';
import type { ExerciseSession } from '@/types';

function computeRecoveryScore(entries: { pain: number; mobility: number; sleep: number; energy: number; mood: number }[]): number {
  if (entries.length === 0) return 0;
  const total = entries.reduce((sum, entry) => {
    const painScore = (10 - entry.pain) * 10;
    const mobilityScore = entry.mobility * 5;
    const sleepScore = (entry.sleep / 8) * 25;
    const energyScore = entry.energy * 2.5;
    const moodScore = entry.mood * 2.5;
    return sum + (painScore + mobilityScore + sleepScore + energyScore + moodScore);
  }, 0);
  return Math.round(Math.min(100, Math.max(0, total / entries.length)));
}

function getDateRangeLabel(entries: { date: string }[] = []): string {
  if (entries.length === 0) return 'No dates recorded yet';
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0]?.date;
  const last = sorted[sorted.length - 1]?.date;
  if (!first || !last) return 'One date recorded';
  if (first === last) return new Date(`${first}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${new Date(`${first}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(`${last}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

export function ReportPage() {
  const { recoveryLogs: recoveryHistory, mentalLogs, goals } = useAppStore();
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseSession[]>([]);

  useEffect(() => {
    let active = true;
    exerciseService.getHistory()
      .then((sessions) => { if (active) setExerciseHistory(sessions); })
      .catch(() => { if (active) setExerciseHistory([]); });
    return () => { active = false; };
  }, []);

  const orderedRecoveryLogs = useMemo(() => [...recoveryHistory].sort((a, b) => a.date.localeCompare(b.date)), [recoveryHistory]);
  const latestRecovery = orderedRecoveryLogs[orderedRecoveryLogs.length - 1];
  const firstRecovery = orderedRecoveryLogs[0];
  const averageRecoveryScore = orderedRecoveryLogs.length > 0 ? computeRecoveryScore(orderedRecoveryLogs) : 0;
  const recoveryTrendValue = orderedRecoveryLogs.length >= 2 ? computeRecoveryScore([firstRecovery]) - computeRecoveryScore([latestRecovery]) : 0;
  const mentalCheckInCount = mentalLogs.length;
  const completedGoals = goals.filter((goal) => goal.status === 'completed').length;
  const completedExerciseSessions = exerciseHistory.filter((session) => session.completed).length;
  const scoreRing = latestRecovery ? computeRecoveryScore([latestRecovery]) : 0;
  const physicalScore = latestRecovery ? Math.max(0, Math.min(100, Math.round((latestRecovery.mobility * 10 + (10 - latestRecovery.pain) * 5 + latestRecovery.strength * 0.6) / 2))) : 0;
  const mentalScore = latestRecovery ? Math.max(0, Math.min(100, Math.round(((10 - (mentalLogs[0]?.anxiety ?? 5)) * 10 + (mentalLogs[0]?.confidence ?? 5) * 10 + (10 - (mentalLogs[0]?.stress ?? 5)) * 10) / 3))) : 0;
  const overallScore = orderedRecoveryLogs.length > 0 ? Math.round((physicalScore + mentalScore) / 2) : 0;

  const summaryStats = [
    { label: 'Recovery logs', value: String(orderedRecoveryLogs.length), icon: HeartPulse, color: 'text-rose-600 bg-rose-50' },
    { label: 'Latest score', value: `${scoreRing}%`, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
    { label: 'Average score', value: `${averageRecoveryScore}%`, icon: Activity, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Mental check-ins', value: String(mentalCheckInCount), icon: Brain, color: 'text-violet-600 bg-violet-50' },
    { label: 'Exercise sessions', value: String(completedExerciseSessions), icon: Dumbbell, color: 'text-amber-600 bg-amber-50' },
    { label: 'Completed goals', value: String(completedGoals), icon: CheckCircle, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Date range', value: getDateRangeLabel(orderedRecoveryLogs), icon: Calendar, color: 'text-slate-600 bg-slate-100' },
    { label: 'Trend', value: orderedRecoveryLogs.length >= 2 ? `${recoveryTrendValue > 0 ? '+' : ''}${recoveryTrendValue} pts` : '—', icon: Smile, color: 'text-sky-600 bg-sky-50' },
  ];

  if (orderedRecoveryLogs.length === 0 && mentalLogs.length === 0 && goals.length === 0 && exerciseHistory.length === 0) {
    return (
      <AppLayout>
        <PageHeader title="Recovery Report" subtitle="A comprehensive summary of your recovery journey." />
        <Card className="py-16 text-center">
          <FileText size={40} className="mx-auto text-slate-300" />
          <h3 className="mt-4 text-lg font-bold text-slate-900">No report data yet</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">Complete your first recovery check-in, mental check-in, or goal to generate an honest report based on your real activity.</p>
        </Card>
      </AppLayout>
    );
  }

  const reportNarrative = orderedRecoveryLogs.length === 0
    ? `You have recorded ${mentalLogs.length} mental check-in${mentalLogs.length === 1 ? '' : 's'}. Continue logging regularly to build a clearer recovery trend.`
    : orderedRecoveryLogs.length === 1
      ? `You have recorded 1 recovery check-in. Continue logging regularly to build a clearer recovery trend.`
      : `You have recorded ${orderedRecoveryLogs.length} recovery check-ins across ${getDateRangeLabel(orderedRecoveryLogs)}. Your latest score is ${scoreRing}%.`;

  return (
    <AppLayout>
      <PageHeader title="Recovery Report" subtitle="A summary of your authenticated recovery data." action={<div className="flex gap-2"><Button variant="outline" size="md"><Printer size={16} /> Print</Button><Button size="md"><Download size={16} /> Export PDF</Button></div>} />
      <div id="report-content" className="space-y-6">
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-100"><FileText size={18} /><span className="text-sm font-semibold">Recovery Report</span></div>
              <h3 className="mt-2 text-2xl font-bold">Your Recovery Snapshot</h3>
              <p className="mt-1 text-sm text-blue-100">{getDateRangeLabel(orderedRecoveryLogs)}</p>
              <p className="mt-3 text-xs text-blue-200">Generated from your current records.</p>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col items-center"><RecoveryRing score={overallScore} size={120} stroke={10} /><p className="mt-2 text-xs font-semibold text-blue-100">Overall</p></div>
              <div className="flex flex-col items-center"><RecoveryRing score={physicalScore} size={120} stroke={10} /><p className="mt-2 text-xs font-semibold text-blue-100">Physical</p></div>
              <div className="flex flex-col items-center"><RecoveryRing score={mentalScore} size={120} stroke={10} /><p className="mt-2 text-xs font-semibold text-blue-100">Mental</p></div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <Card hover>
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', stat.color)}><stat.icon size={18} /></div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Physical Recovery Summary</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Pain Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={painSeries(orderedRecoveryLogs)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs><linearGradient id="rPain" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} /><stop offset="100%" stopColor="#f43f5e" stopOpacity={0.03} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2.5} fill="url(#rPain)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Mobility Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mobilitySeries(orderedRecoveryLogs)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs><linearGradient id="rMob" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.03} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#rMob)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Strength Progress</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={orderedRecoveryLogs.map((entry) => ({ date: entry.date.slice(5), value: entry.strength }))} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs><linearGradient id="rStr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} /><stop offset="100%" stopColor="#2563eb" stopOpacity={0.03} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2.5} fill="url(#rStr)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Sleep Pattern</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepSeries(orderedRecoveryLogs)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 12]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Mental Recovery Summary</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Anxiety Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mentalSeries(mentalLogs, 'anxiety')} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs><linearGradient id="rAnx" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} /><stop offset="100%" stopColor="#f43f5e" stopOpacity={0.03} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2.5} fill="url(#rAnx)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Confidence Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mentalSeries(mentalLogs, 'confidence')} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs><linearGradient id="rConf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.03} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} fill="url(#rConf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        <Card>
          <h4 className="mb-4 font-bold text-slate-900">Recovery Score Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryScoreSeries(orderedRecoveryLogs)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="rScore" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.05} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fill="url(#rScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Progress Summary</h3>
          <Card className="bg-slate-50">
            <p className="text-base text-slate-700">{reportNarrative}</p>
            {orderedRecoveryLogs.length >= 2 && (
              <p className="mt-3 text-sm text-slate-500">Trend: {recoveryTrendValue > 0 ? 'recovery score increased' : recoveryTrendValue < 0 ? 'recovery score decreased' : 'recovery score stayed steady'} by {Math.abs(recoveryTrendValue)} points between the first and latest entries.</p>
            )}
          </Card>
        </div>

        <Card glass className="bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></div>
            <h3 className="text-lg font-bold">AI Summary</h3>
          </div>
          <p className="mt-5 text-base leading-relaxed text-blue-50">"{reportNarrative}"</p>
          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-white/10 p-3 text-xs text-blue-50 backdrop-blur"><Stethoscope size={14} className="mt-0.5 shrink-0" /><span>AI provides educational information only and is not a substitute for professional medical advice.</span></div>
        </Card>

        <Card className="border-dashed border-2 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><Stethoscope size={24} /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-700">Doctor's Notes</h3>
              <p className="text-sm text-slate-400">Clinical notes appear here once they are added by your healthcare provider.</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
            <p className="text-sm italic text-slate-400">No doctor notes are available for this report yet.</p>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
