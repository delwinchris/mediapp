import { motion } from 'framer-motion';
import {
  Calendar, Clock3, HeartPulse, ShieldAlert,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAppStore } from '@/lib/store';

function computeScore(entry: { pain: number; mobility: number; sleep: number; energy: number; mood: number }): number {
  const painScore = (10 - entry.pain) * 10;
  const mobilityScore = entry.mobility * 5;
  const sleepScore = (entry.sleep / 8) * 25;
  const energyScore = entry.energy * 2.5;
  const moodScore = entry.mood * 2.5;
  return Math.round(Math.min(100, Math.max(0, painScore + mobilityScore + sleepScore + energyScore + moodScore)));
}

function recoveryDuration(dateStr: string): string | null {
  const start = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(start.getTime())) return null;
  const days = Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000));
  return `${days} days (week ${Math.floor(days / 7)})`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export function RecoveryPlanPage() {
  const { recoveryProfile, recoveryLogs, mentalLogs, goals } = useAppStore();
  const latestEntry = recoveryLogs.reduce<typeof recoveryLogs[number] | null>((newest, entry) => {
    if (!newest || entry.date > newest.date) return entry;
    return newest;
  }, null);
  const latestMentalLog = mentalLogs.reduce<typeof mentalLogs[number] | null>((newest, entry) => {
    if (!newest || entry.date > newest.date) return entry;
    return newest;
  }, null);
  const recoveryDate = recoveryProfile?.surgeryDate || recoveryProfile?.injuryDate;
  const duration = recoveryDate ? recoveryDuration(recoveryDate) : null;
  const painLevel = latestEntry?.pain ?? recoveryProfile?.painLevel ?? null;
  const mobilityLevel = latestEntry ? latestEntry.mobility * 10 : (recoveryProfile?.mobilityLevel ?? null);
  const readiness = latestEntry ? computeScore(latestEntry) : null;

  return (
    <AppLayout>
      <PageHeader title="Recovery Plan" subtitle="Your saved recovery information and goals." />

      {/* Plan overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card glass className="bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
          <p className="text-sm text-blue-100">Injury</p>
          <p className="mt-1 font-bold">{recoveryProfile?.injury || '—'}</p>
          <div className="mt-4 rounded-2xl bg-white/10 p-3 backdrop-blur">
            <p className="text-xs text-blue-100">Recovery duration</p>
            <p className="text-sm font-bold">{duration || 'Unavailable'}</p>
            <p className="mt-1 text-xs text-blue-100">{recoveryDate ? `Since ${formatDate(recoveryDate)}` : 'No recovery date saved'}</p>
          </div>
        </Card>
        <Card className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500">Pain</p>
            <p className="mt-1 text-3xl font-bold text-rose-500">{painLevel ?? '—'}<span className="text-lg text-slate-400">/10</span></p>
          </div>
          <div className="h-12 w-px bg-slate-100" />
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500">Mobility</p>
            <p className="mt-1 text-3xl font-bold text-emerald-500">{mobilityLevel ?? '—'}<span className="text-lg text-slate-400">%</span></p>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center">
          {readiness === null ? <p className="text-center text-sm text-slate-500">Readiness unavailable until a recovery log is recorded.</p> : <RecoveryRing score={readiness} size={110} label="readiness (non-clinical)" />}
        </Card>
      </div>

      <Card className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div><p className="text-xs font-semibold text-slate-500">Recovery goal</p><p className="mt-1 font-bold text-slate-900">{recoveryProfile?.recoveryGoal || 'Unavailable'}</p></div>
          <div><p className="text-xs font-semibold text-slate-500">Personal motivation</p><p className="mt-1 font-bold text-slate-900">{recoveryProfile?.myWhy || 'Unavailable'}</p></div>
          <div><p className="text-xs font-semibold text-slate-500">Latest recovery log</p><p className="mt-1 font-bold text-slate-900">{latestEntry ? formatDate(latestEntry.date) : 'Unavailable'}</p></div>
          <div><p className="text-xs font-semibold text-slate-500">Surgery date</p><p className="mt-1 font-bold text-slate-900">{recoveryProfile?.surgeryDate ? formatDate(recoveryProfile.surgeryDate) : 'Unavailable'}</p></div>
        </div>
      </Card>

      {/* User goals */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Your Recovery Goals</h3>
        {goals.length === 0 ? <Card><p className="text-sm text-slate-500">No recovery goals added yet.</p></Card> : <div className="grid gap-4 sm:grid-cols-2">
          {goals.map((goal, i) => (
            <motion.div key={goal.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">{goal.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{goal.description}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold capitalize text-blue-600">{goal.status}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 capitalize">{goal.category}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 capitalize">{goal.priority} priority</span>
                  <span className="flex items-center gap-1"><Calendar size={13} /> {goal.targetDate ? formatDate(goal.targetDate) : 'No target date'}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500"><span>Progress</span><span>{goal.progress}%</span></div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${goal.progress}%` }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" /></div>
              </Card>
            </motion.div>
          ))}
        </div>}
      </div>

      {/* Milestones */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Upcoming Milestones</h3>
        <Card><div className="flex items-center gap-3 text-sm text-slate-500"><ShieldAlert size={20} className="text-amber-500" /> Recovery milestones will appear here once a personalized recovery plan is available.</div></Card>
      </div>

      {/* Recovery Timeline */}
      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Recovery Timeline</h3>
        <Card><div className="flex items-center gap-3 text-sm text-slate-500"><Clock3 size={20} className="text-blue-500" /> Recovery phases will appear here once a personalized recovery plan is available.</div></Card>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900">Latest Recovery Log</h3>
        {latestEntry ? <Card><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div><p className="text-xs font-semibold text-slate-500">Strength</p><p className="mt-1 font-bold text-slate-900">{latestEntry.strength}</p></div>
          <div><p className="text-xs font-semibold text-slate-500">Sleep</p><p className="mt-1 font-bold text-slate-900">{latestEntry.sleep} hours</p></div>
          <div><p className="text-xs font-semibold text-slate-500">Energy / mood</p><p className="mt-1 font-bold text-slate-900">{latestEntry.energy} / {latestEntry.mood}</p></div>
          <div><p className="text-xs font-semibold text-slate-500">Swelling / medication</p><p className="mt-1 font-bold text-slate-900">{latestEntry.swelling} / {latestEntry.medication ? 'Yes' : 'No'}</p></div>
        </div>{latestEntry.notes && <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">{latestEntry.notes}</p>}</Card> : <Card><p className="text-sm text-slate-500">No recovery log recorded yet.</p></Card>}
      </div>

      {latestMentalLog && <div className="mt-8"><h3 className="mb-4 text-lg font-bold text-slate-900">Latest Mental Check-in</h3><Card><div className="grid gap-4 sm:grid-cols-3">
        <div><p className="text-xs font-semibold text-slate-500">Anxiety</p><p className="mt-1 font-bold text-slate-900">{latestMentalLog.anxiety}/10</p></div>
        <div><p className="text-xs font-semibold text-slate-500">Confidence</p><p className="mt-1 font-bold text-slate-900">{latestMentalLog.confidence}/10</p></div>
        <div><p className="text-xs font-semibold text-slate-500">Motivation</p><p className="mt-1 font-bold text-slate-900">{latestMentalLog.motivation}/10</p></div>
      </div></Card></div>}

      <div className="mt-8"><Card><div className="flex items-start gap-3"><HeartPulse size={18} className="mt-0.5 text-rose-500" /><div><p className="font-semibold text-slate-900">Exercise assignments</p><p className="mt-1 text-sm text-slate-500">Exercise assignments are unavailable because the current data model does not store assigned exercises.</p></div></div></Card></div>
    </AppLayout>
  );
}
