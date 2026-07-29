import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Target, Bell, Shield, LogOut, Check, Camera, HeartPulse, Activity,
  Trophy, BarChart3, FileText, Calendar, Flame, TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Slider, Textarea } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { mockUser, achievements, recoveryLevel } from '@/lib/mockData';
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

const achievementIcons: Record<string, LucideIcon> = {
  Flame, HeartPulse, Calendar, Shield, Trophy, Activity, Brain: HeartPulse,
};

const tierStyles: Record<string, string> = {
  bronze: 'from-amber-600 to-amber-700',
  silver: 'from-slate-400 to-slate-500',
  gold: 'from-yellow-400 to-amber-500',
  platinum: 'from-cyan-400 to-blue-500',
};

export function ProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('personal');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: mockUser.name, email: mockUser.email, age: mockUser.age,
    height: mockUser.height, weight: mockUser.weight, injury: mockUser.injury,
    injuryDate: mockUser.injuryDate, painLevel: mockUser.painLevel,
    mobilityLevel: mockUser.mobilityLevel, recoveryGoal: mockUser.recoveryGoal,
    surgeon: 'Dr. James Miller', physiotherapist: 'Dr. Sarah Chen',
    medications: 'Ibuprofen 400mg (daily)', allergies: 'None', bloodType: 'O+',
    emergencyContact: 'Emma Johnson (sister) · +1 555 0102',
  });

  const set = (k: string, v: string | number) => setProfile((p) => ({ ...p, [k]: v }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const earnedAchievements = achievements.filter((a) => a.earned);
  const xpPercent = Math.round((recoveryLevel.currentXp / recoveryLevel.nextLevelXp) * 100);

  const stats = [
    { label: 'Total Check-ins', value: '42', icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { label: 'Day Streak', value: '30', icon: Flame, color: 'text-amber-600 bg-amber-50' },
    { label: 'Exercises Completed', value: '186', icon: Check, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Journal Entries', value: '28', icon: FileText, color: 'text-violet-600 bg-violet-50' },
    { label: 'Total XP', value: recoveryLevel.totalXp.toLocaleString(), icon: Trophy, color: 'text-amber-600 bg-amber-50' },
    { label: 'Recovery Score', value: '78', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
  ];

  return (
    <AppLayout>
      <PageHeader title="Profile" subtitle="Manage your personal information, recovery goals, and achievements." />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card className="text-center">
            <div className="relative mx-auto w-24">
              <img src={mockUser.avatarUrl} alt={profile.name} className="h-24 w-24 rounded-3xl object-cover" />
              <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"><Camera size={14} /></button>
            </div>
            <h3 className="mt-4 font-bold text-slate-900">{profile.name}</h3>
            <p className="text-sm text-slate-500">{profile.email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active recovery
            </div>
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
              <p className="text-xs font-semibold text-slate-500">Level {recoveryLevel.level}</p>
              <p className="text-sm font-bold text-slate-900">{recoveryLevel.title}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${xpPercent}%` }} />
              </div>
              <p className="mt-1 text-xs text-slate-400">{recoveryLevel.currentXp} / {recoveryLevel.nextLevelXp} XP</p>
            </div>
          </Card>

          <Card className="mt-4 p-2">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={cn('flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all', tab === t.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50')}>
                <t.icon size={18} /> {t.label}
              </button>
            ))}
            <button onClick={() => navigate('/')} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-rose-500 transition-all hover:bg-rose-50">
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
                  <Input label="Full name" value={profile.name} onChange={(e) => set('name', e.target.value)} />
                  <Input label="Email" type="email" value={profile.email} onChange={(e) => set('email', e.target.value)} />
                  <Input label="Age" type="number" value={profile.age} onChange={(e) => set('age', Number(e.target.value))} />
                  <Input label="Height (cm)" type="number" value={profile.height} onChange={(e) => set('height', Number(e.target.value))} />
                  <Input label="Weight (kg)" type="number" value={profile.weight} onChange={(e) => set('weight', Number(e.target.value))} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save changes'}</Button>
                </div>
              </Card>
            )}

            {tab === 'recovery' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Recovery Information</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Select label="Injury / Surgery" value={profile.injury} onChange={(e) => set('injury', e.target.value)}>
                    {injuryOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                  </Select>
                  <Input label="Date of injury / surgery" type="date" value={profile.injuryDate} onChange={(e) => set('injuryDate', e.target.value)} />
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <Slider label="Current pain level" value={profile.painLevel} onChange={(v) => set('painLevel', v)} color="rose" leftLabel="No pain" rightLabel="Worst" />
                  <Slider label="Current mobility" value={profile.mobilityLevel} onChange={(v) => set('mobilityLevel', v)} color="emerald" leftLabel="Limited" rightLabel="Full" />
                </div>
                <div className="mt-6">
                  <Textarea label="Recovery goal" rows={2} value={profile.recoveryGoal} onChange={(e) => set('recoveryGoal', e.target.value)} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save recovery info'}</Button>
                </div>
              </Card>
            )}

            {tab === 'medical' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Medical Information</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Surgeon" value={profile.surgeon} onChange={(e) => set('surgeon', e.target.value)} />
                  <Input label="Physiotherapist" value={profile.physiotherapist} onChange={(e) => set('physiotherapist', e.target.value)} />
                  <Input label="Current medications" value={profile.medications} onChange={(e) => set('medications', e.target.value)} />
                  <Input label="Allergies" value={profile.allergies} onChange={(e) => set('allergies', e.target.value)} />
                  <Input label="Blood type" value={profile.bloodType} onChange={(e) => set('bloodType', e.target.value)} />
                  <Input label="Emergency contact" value={profile.emergencyContact} onChange={(e) => set('emergencyContact', e.target.value)} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save medical info'}</Button>
                </div>
              </Card>
            )}

            {tab === 'goals' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Recovery Goals</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Pain-free daily living', target: 'Pain ≤ 2/10 sustained for 2 weeks', progress: 70, icon: HeartPulse, color: 'from-rose-400 to-rose-500' },
                    { label: 'Full range of motion', target: '100% knee flexion vs. uninjured leg', progress: 85, icon: Activity, color: 'from-emerald-400 to-emerald-500' },
                    { label: 'Return to running', target: 'Run 5km without pain', progress: 45, icon: TrendingUp, color: 'from-blue-400 to-blue-500' },
                    { label: 'Return to sport', target: 'Pass return-to-sport assessment', progress: 30, icon: Trophy, color: 'from-amber-400 to-amber-500' },
                  ].map((g) => (
                    <div key={g.label} className="rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white', g.color)}>
                          <g.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{g.label}</p>
                          <p className="text-xs text-slate-500">{g.target}</p>
                        </div>
                        <span className="text-lg font-bold text-slate-900">{g.progress}%</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${g.progress}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Textarea label="Add a new goal" rows={2} placeholder="What do you want to achieve next?" />
                  <Button className="mt-3" size="sm"><Target size={16} /> Add goal</Button>
                </div>
              </Card>
            )}

            {tab === 'achievements' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Achievements</h3>
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Recovery Level {recoveryLevel.level}</p>
                      <p className="text-lg font-bold text-slate-900">{recoveryLevel.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{recoveryLevel.totalXp.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">Total XP</p>
                    </div>
                  </div>
                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${xpPercent}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{recoveryLevel.nextLevelXp - recoveryLevel.currentXp} XP to next level</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {earnedAchievements.map((a) => {
                    const Icon = achievementIcons[a.icon] ?? Trophy;
                    return (
                      <div key={a.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                        <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', tierStyles[a.tier])}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{a.title}</p>
                          <p className="text-xs text-slate-500">{a.description}</p>
                          <p className="mt-1 text-xs font-bold text-amber-600">+{a.xp} XP · {a.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {tab === 'stats' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Statistics</h3>
                <div className="mb-6 flex justify-center">
                  <RecoveryRing score={78} size={140} label="recovery score" />
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
                  {[
                    { label: 'Daily recovery reminder', desc: 'Get reminded to log your recovery each morning', on: true },
                    { label: 'Exercise reminders', desc: 'Notifications for your prescribed exercises', on: true },
                    { label: 'Weekly progress summary', desc: 'A recap of your recovery every Sunday', on: true },
                    { label: 'AI coach insights', desc: 'When the coach notices a trend worth sharing', on: false },
                    { label: 'Streak milestones', desc: 'Celebrate when you hit streak goals', on: true },
                  ].map((n) => (
                    <ToggleRow key={n.label} label={n.label} desc={n.desc} defaultOn={n.on} />
                  ))}
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
                  <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Updated!</>) : 'Update password'}</Button>
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <h4 className="font-bold text-slate-900">Your data</h4>
                    <p className="mt-1 text-sm text-slate-500">Export or delete your recovery data at any time.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button variant="outline" size="sm">Export my data</Button>
                      <Button variant="danger" size="sm">Delete account</Button>
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

function ToggleRow({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)} className={cn('relative h-7 w-12 rounded-full transition-colors', on ? 'bg-blue-600' : 'bg-slate-200')}>
        <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow', on ? 'left-6' : 'left-1')} />
      </button>
    </div>
  );
}
