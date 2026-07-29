import { motion } from 'framer-motion';
import {
  HeartPulse, Footprints, Dumbbell, Moon, Brain, Smile, TrendingUp, CheckCircle,
  Download, FileText, Printer, Sparkles, Stethoscope, Trophy, Activity, Flag,
  type LucideIcon,
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { recoveryHistory, recoveryStory, achievements, reportSummary, aiReportSummary, doctorNotesPlaceholder } from '@/lib/mockData';
import { painSeries, mobilitySeries, sleepSeries, mentalSeries, recoveryScoreSeries, formatDate } from '@/lib/analytics';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Footprints, Dumbbell, Moon, Brain, Smile, TrendingUp, CheckCircle, Flag, Activity, Trophy,
};

const summaryStats = [
  { label: 'Pain Change', value: '-50%', icon: HeartPulse, color: 'text-rose-600 bg-rose-50', good: true },
  { label: 'Mobility Change', value: '+40%', icon: Footprints, color: 'text-emerald-600 bg-emerald-50', good: true },
  { label: 'Strength Change', value: '+25%', icon: Dumbbell, color: 'text-blue-600 bg-blue-50', good: true },
  { label: 'Sleep Average', value: '7.1h', icon: Moon, color: 'text-violet-600 bg-violet-50', good: true },
  { label: 'Anxiety Change', value: '-50%', icon: Brain, color: 'text-sky-600 bg-sky-50', good: true },
  { label: 'Confidence Change', value: '+100%', icon: Smile, color: 'text-emerald-600 bg-emerald-50', good: true },
  { label: 'Exercise Consistency', value: '94%', icon: CheckCircle, color: 'text-amber-600 bg-amber-50', good: true },
  { label: 'Day Streak', value: '30', icon: TrendingUp, color: 'text-blue-600 bg-blue-50', good: true },
];

export function ReportPage() {
  const earnedAchievements = achievements.filter((a) => a.earned);
  const strengthData = recoveryHistory.map((e) => ({ date: e.date.slice(5), value: e.strength }));

  return (
    <AppLayout>
      <PageHeader
        title="Recovery Report"
        subtitle="A comprehensive summary of your recovery journey. Print or export to share with your healthcare team."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="md"><Printer size={16} /> Print</Button>
            <Button size="md"><Download size={16} /> Export PDF</Button>
          </div>
        }
      />

      <div id="report-content" className="space-y-6">
        {/* Header & Scores */}
        <Card glass className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-100">
                <FileText size={18} />
                <span className="text-sm font-semibold">Monthly Recovery Report</span>
              </div>
              <h3 className="mt-2 text-2xl font-bold">Alex Johnson</h3>
              <p className="mt-1 text-sm text-blue-100">ACL Reconstruction · July 2026</p>
              <p className="mt-3 text-xs text-blue-200">Generated on July 29, 2026</p>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <RecoveryRing score={reportSummary.overallScore} size={120} stroke={10} />
                <p className="mt-2 text-xs font-semibold text-blue-100">Overall</p>
              </div>
              <div className="flex flex-col items-center">
                <RecoveryRing score={reportSummary.physicalScore} size={120} stroke={10} />
                <p className="mt-2 text-xs font-semibold text-blue-100">Physical</p>
              </div>
              <div className="flex flex-col items-center">
                <RecoveryRing score={reportSummary.mentalScore} size={120} stroke={10} />
                <p className="mt-2 text-xs font-semibold text-blue-100">Mental</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card hover>
                <div className="flex items-center gap-3">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', s.color)}>
                    <s.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Physical Recovery Summary */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Physical Recovery Summary</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Pain Trend (30 Days)</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={painSeries()} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                  <AreaChart data={mobilitySeries()} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                  <AreaChart data={strengthData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                  <BarChart data={sleepSeries()} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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

        {/* Mental Recovery Summary */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Mental Recovery Summary</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h4 className="mb-3 font-bold text-slate-900">Anxiety Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mentalSeries('anxiety')} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                  <AreaChart data={mentalSeries('confidence')} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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

        {/* Recovery Score Trend */}
        <Card>
          <h4 className="mb-4 font-bold text-slate-900">Recovery Score Trend</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryScoreSeries()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

        {/* Achievements */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Achievements</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {earnedAchievements.map((a, i) => {
              const Icon = iconMap[a.icon] ?? Trophy;
              return (
                <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Card hover className="bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{a.title}</h4>
                        <p className="text-xs text-slate-500">{a.description}</p>
                        <p className="mt-1 text-xs font-bold text-amber-600">+{a.xp} XP · {a.date}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recovery Timeline */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Recovery Timeline</h3>
          <Card>
            <div className="relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-emerald-400 to-slate-200" />
              <div className="space-y-6">
                {recoveryStory.map((m, i) => {
                  const Icon = iconMap[m.icon] ?? Flag;
                  return (
                    <motion.div key={m.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative flex gap-4">
                      <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-md', m.achieved ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white' : 'bg-slate-100 text-slate-400')}>
                        <Icon size={16} />
                      </div>
                      <div className={cn('flex-1 rounded-2xl border p-4', m.achieved ? 'border-slate-200 bg-white' : 'border-dashed border-slate-200 bg-slate-50')}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600">{m.phase}</span>
                            <h4 className={cn('font-bold', m.achieved ? 'text-slate-900' : 'text-slate-500')}>{m.title}</h4>
                          </div>
                          <span className="text-xs font-semibold text-slate-400">{formatDate(m.date)}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{m.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* AI Summary */}
        <Card glass className="bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></div>
            <h3 className="text-lg font-bold">AI Summary</h3>
          </div>
          <p className="mt-5 text-base leading-relaxed text-blue-50">"{aiReportSummary}"</p>
          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-white/10 p-3 text-xs text-blue-50 backdrop-blur">
            <Stethoscope size={14} className="mt-0.5 shrink-0" />
            <span>AI provides educational information only and is not a substitute for professional medical advice.</span>
          </div>
        </Card>

        {/* Doctor Notes */}
        <Card className="border-dashed border-2 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><Stethoscope size={24} /></div>
            <div>
              <h3 className="text-lg font-bold text-slate-700">Doctor's Notes</h3>
              <p className="text-sm text-slate-400">Reserved for clinical observations from your healthcare provider</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
            <p className="text-sm italic text-slate-400">{doctorNotesPlaceholder}</p>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
