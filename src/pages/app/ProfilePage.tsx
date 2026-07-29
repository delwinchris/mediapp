import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Target, Bell, Shield, LogOut, Check, Camera } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Slider } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { mockUser } from '@/lib/mockData';
import { cn } from '@/lib/cn';

const tabs = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'goal', label: 'Recovery Goal', icon: Target },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

const injuryOptions = [
  'ACL Reconstruction Surgery', 'Meniscus Repair', 'Rotator Cuff Repair', 'Hip Replacement',
  'Knee Replacement', 'Ankle Reconstruction', 'Spinal Surgery', 'Fracture Recovery', 'Other',
];

export function ProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('personal');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: mockUser.name, email: mockUser.email, age: mockUser.age,
    height: mockUser.height, weight: mockUser.weight, injury: mockUser.injury,
    injuryDate: mockUser.injuryDate, painLevel: mockUser.painLevel,
    mobilityLevel: mockUser.mobilityLevel, recoveryGoal: mockUser.recoveryGoal,
  });

  const set = (k: string, v: string | number) => setProfile((p) => ({ ...p, [k]: v }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <AppLayout>
      <PageHeader title="Profile" subtitle="Manage your personal information and recovery goals." />

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
                <h3 className="mb-6 font-bold text-slate-900">Personal information</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" value={profile.name} onChange={(e) => set('name', e.target.value)} />
                  <Input label="Email" type="email" value={profile.email} onChange={(e) => set('email', e.target.value)} />
                  <Input label="Age" type="number" value={profile.age} onChange={(e) => set('age', Number(e.target.value))} />
                  <Input label="Height (cm)" type="number" value={profile.height} onChange={(e) => set('height', Number(e.target.value))} />
                  <Input label="Weight (kg)" type="number" value={profile.weight} onChange={(e) => set('weight', Number(e.target.value))} />
                  <Select label="Injury / Surgery" value={profile.injury} onChange={(e) => set('injury', e.target.value)}>
                    {injuryOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                  </Select>
                  <Input label="Date of injury / surgery" type="date" value={profile.injuryDate} onChange={(e) => set('injuryDate', e.target.value)} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save changes'}</Button>
                </div>
              </Card>
            )}

            {tab === 'goal' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Recovery goal & current state</h3>
                <Input label="Your recovery goal" value={profile.recoveryGoal} onChange={(e) => set('recoveryGoal', e.target.value)} />
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <Slider label="Current pain level" value={profile.painLevel} onChange={(v) => set('painLevel', v)} color="rose" leftLabel="No pain" rightLabel="Worst" />
                  <Slider label="Current mobility" value={profile.mobilityLevel} onChange={(v) => set('mobilityLevel', v)} color="emerald" leftLabel="Limited" rightLabel="Full" />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Saved!</>) : 'Update goal'}</Button>
                </div>
              </Card>
            )}

            {tab === 'notifications' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Notification preferences</h3>
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
                <h3 className="mb-6 font-bold text-slate-900">Security & data</h3>
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
