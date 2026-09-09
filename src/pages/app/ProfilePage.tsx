import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Target, Bell, Shield, LogOut, Check, Camera, HeartPulse,
  Trophy, BarChart3, FileText, Calendar, TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import { useAppStore } from '@/lib/store';
import { Input, Select, Slider, Textarea } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { exerciseService, journalService } from '@/services';
import type { UserProfile } from '@/lib/types';
import { cn } from '@/lib/cn';

const tabs: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'recovery', label: 'Recovery Info', icon: HeartPulse },
  { id: 'medical', label: 'Medical', icon: FileText },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

const injuryOptions = [
  'ACL Reconstruction Surgery', 'Meniscus Repair', 'Rotator Cuff Repair', 'Hip Replacement',
  'Knee Replacement', 'Ankle Reconstruction', 'Spinal Surgery', 'Fracture Recovery', 'Other',
];

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut, updateProfile } = useAuth();
  const { recoveryLogs, goals, settings, updateSettings } = useAppStore();
  const [tab, setTab] = useState('personal');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(user?.profile ?? null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [journalCount, setJournalCount] = useState<number | null>(null);
  const [exerciseCount, setExerciseCount] = useState<number | null>(null);

  useEffect(() => { setProfile(user?.profile ?? null); }, [user?.profile]);

  useEffect(() => {
    let mounted = true;
    Promise.all([journalService.getAll(), exerciseService.getHistory()])
      .then(([journals, exerciseHistory]) => {
        if (mounted) {
          setJournalCount(journals.length);
          setExerciseCount(exerciseHistory.filter((session) => session.completed).length);
        }
      })
      .catch(() => { if (mounted) { setJournalCount(null); setExerciseCount(null); } });
    return () => { mounted = false; };
  }, []);

  const set = (key: keyof UserProfile, value: string | number) => setProfile((current) => current ? { ...current, [key]: value } : current);
  const handleSave = async () => {
    if (!profile) return;
    setSaveError(null);
    try {
      await updateProfile(profile);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch {
      setSaveError('Could not save your profile. Please try again.');
    }
  };

  const profileValue = profile ?? {
    id: '', name: '', email: user?.email ?? '', age: undefined, height: undefined, weight: undefined,
    injury: '', injuryDate: '', surgeryDate: undefined, painLevel: 0, mobilityLevel: 0,
    recoveryGoal: '', myWhy: undefined, avatarUrl: undefined,
  };
  const stats = [
    { label: 'Total Check-ins', value: String(recoveryLogs.length), icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { label: 'Day Streak', value: '—', icon: Calendar, color: 'text-amber-600 bg-amber-50' },
    { label: 'Exercises Completed', value: exerciseCount === null ? '—' : String(exerciseCount), icon: Check, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Journal Entries', value: journalCount === null ? '—' : String(journalCount), icon: FileText, color: 'text-violet-600 bg-violet-50' },
    { label: 'Total XP', value: '—', icon: Trophy, color: 'text-amber-600 bg-amber-50' },
    { label: 'Recovery Score', value: '—', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
  ];

  return (
    <AppLayout>
      <PageHeader title="Profile" subtitle="Manage your saved profile information and recovery goals." />

      {saveError && <p className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">{saveError}</p>}

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card className="text-center">
            <div className="relative mx-auto w-24">
              {profileValue.avatarUrl ? <img src={profileValue.avatarUrl} alt={profileValue.name} className="h-24 w-24 rounded-3xl object-cover" /> : <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100 text-slate-400"><User size={28} /></div>}
              <button disabled className="absolute -bottom-1 -right-1 flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full bg-slate-300 text-white shadow-lg" title="Avatar upload is unavailable"><Camera size={14} /></button>
            </div>
            <h3 className="mt-4 font-bold text-slate-900">{profileValue.name || '—'}</h3>
            <p className="text-sm text-slate-500">{profileValue.email || '—'}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active recovery
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Achievements and recovery level are unavailable until authoritative data is connected.</div>
          </Card>

          <Card className="mt-4 p-2">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={cn('flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all', tab === t.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50')}>
                <t.icon size={18} /> {t.label}
              </button>
            ))}
            <button onClick={() => { void signOut(); navigate('/'); }} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-rose-500 transition-all hover:bg-rose-50">
              <LogOut size={18} /> Log out
            </button>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {tab === 'personal' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Personal Information</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" value={profileValue.name} onChange={(e) => set('name', e.target.value)} />
                  <Input label="Email (read-only)" type="email" value={profileValue.email} readOnly />
                  <Input label="Age" type="number" value={profileValue.age ?? ''} onChange={(e) => set('age', Number(e.target.value))} />
                  <Input label="Height (cm)" type="number" value={profileValue.height ?? ''} onChange={(e) => set('height', Number(e.target.value))} />
                  <Input label="Weight (kg)" type="number" value={profileValue.weight ?? ''} onChange={(e) => set('weight', Number(e.target.value))} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={() => void handleSave()} disabled={saved || !profile}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save changes'}</Button>
                </div>
              </Card>
            )}

            {tab === 'recovery' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Recovery Information</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Select label="Injury / Surgery" value={profileValue.injury} onChange={(e) => set('injury', e.target.value)}>
                    {injuryOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                  </Select>
                  <Input label="Date of injury" type="date" value={profileValue.injuryDate} onChange={(e) => set('injuryDate', e.target.value)} />
                  <Input label="Date of surgery" type="date" value={profileValue.surgeryDate ?? ''} onChange={(e) => set('surgeryDate', e.target.value)} />
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <Slider label="Current pain level" value={profileValue.painLevel} onChange={(v) => set('painLevel', v)} color="rose" leftLabel="No pain" rightLabel="Worst" />
                  <Slider label="Current mobility" value={profileValue.mobilityLevel} onChange={(v) => set('mobilityLevel', v)} color="emerald" leftLabel="Limited" rightLabel="Full" />
                </div>
                <div className="mt-6">
                  <Textarea label="Recovery goal" rows={2} value={profileValue.recoveryGoal} onChange={(e) => set('recoveryGoal', e.target.value)} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={() => void handleSave()} disabled={saved || !profile}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save recovery info'}</Button>
                </div>
              </Card>
            )}

            {tab === 'medical' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Medical Information</h3>
                <p className="text-sm text-slate-500">Medical provider, medication, allergy, blood type, and emergency contact fields are not available in the current profile data model.</p>
              </Card>
            )}

            {tab === 'goals' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Recovery Goals</h3>
                {goals.length === 0 ? <p className="text-sm text-slate-500">No recovery goals added yet.</p> : <div className="space-y-4">{goals.map((goal) => (
                  <div key={goal.id} className="rounded-2xl border border-slate-100 p-4">
                    <div className="flex items-center gap-3"><Target size={18} className="text-blue-600" /><div className="flex-1"><p className="font-semibold text-slate-900">{goal.title}</p><p className="text-xs text-slate-500">{goal.description}</p></div><span className="text-lg font-bold text-slate-900">{goal.progress}%</span></div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500"><span className="capitalize">{goal.category}</span><span className="capitalize">{goal.priority} priority</span><span className="capitalize">{goal.status}</span>{goal.targetDate && <span>{goal.targetDate}</span>}</div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${goal.progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" /></div>
                  </div>
                ))}</div>}
              </Card>
            )}

            {tab === 'achievements' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Achievements</h3>
                <p className="text-sm text-slate-500">Achievements, XP, and recovery level are unavailable because no authoritative persisted data is connected.</p>
              </Card>
            )}

            {tab === 'stats' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Statistics</h3>
                <div className="mb-6 flex justify-center">
                  <p className="text-sm text-slate-500">Recovery score unavailable.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', s.color)}>
                          <s.icon size={18} />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-900">{s.value}</p>
                          <p className="text-xs text-slate-500">{s.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {tab === 'notifications' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Notification Preferences</h3>
                <div className="space-y-4">
                  <ToggleRow label="Daily recovery reminder" desc="Get reminded to log your recovery each morning" on={settings.notifications.painLoggingReminders} onChange={(on) => updateSettings({ notifications: { ...settings.notifications, painLoggingReminders: on } })} />
                  <ToggleRow label="Exercise reminders" desc="Notifications for exercise activity" on={settings.notifications.exerciseReminders} onChange={(on) => updateSettings({ notifications: { ...settings.notifications, exerciseReminders: on } })} />
                  <ToggleRow label="Weekly progress summary" desc="A recap of your recovery every Sunday" on={settings.notifications.weeklyReports} onChange={(on) => updateSettings({ notifications: { ...settings.notifications, weeklyReports: on } })} />
                  <ToggleRow label="AI coach insights" desc="When the coach notices a trend worth sharing" on={settings.notifications.aiInsights} onChange={(on) => updateSettings({ notifications: { ...settings.notifications, aiInsights: on } })} />
                  <div className="rounded-2xl border border-slate-100 p-4 text-sm text-slate-500">Streak milestone notifications are unavailable because no matching setting exists.</div>
                </div>
              </Card>
            )}

            {tab === 'security' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Security & Data</h3>
                <div className="space-y-5">
                  <Input label="Current password" type="password" placeholder="••••••••" />
                  <Input label="New password" type="password" placeholder="Enter new password" />
                  <Input label="Confirm new password" type="password" placeholder="Repeat new password" />
                  <Button disabled title="Password changes are unavailable">Update password unavailable</Button>
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <h4 className="font-bold text-slate-900">Your data</h4>
                    <p className="mt-1 text-sm text-slate-500">Export or delete your recovery data at any time.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" disabled>Export unavailable</Button>
                      <Button variant="danger" size="sm" disabled>Delete unavailable</Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

function ToggleRow({ label, desc, on, onChange }: { label: string; desc: string; on: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <button onClick={() => onChange(!on)} className={cn('relative h-7 w-12 rounded-full transition-colors', on ? 'bg-blue-600' : 'bg-slate-200')}>
        <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow', on ? 'left-6' : 'left-1')} />
      </button>
    </div>
  );
}
