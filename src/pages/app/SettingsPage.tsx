import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette, Bell, Shield, Eye, Globe, Download, Moon, Sun, Check, type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/lib/cn';

const sections = [
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'accessibility', label: 'Accessibility', icon: Eye },
  { id: 'language', label: 'Language', icon: Globe },
  { id: 'export', label: 'Export Data', icon: Download },
] as const;

const notificationSettings = [
  { label: 'Daily recovery reminder', desc: 'Get reminded to log your recovery each morning', on: true },
  { label: 'Exercise reminders', desc: 'Notifications for your prescribed exercises', on: true },
  { label: 'Weekly progress summary', desc: 'A recap of your recovery every Sunday', on: true },
  { label: 'AI coach insights', desc: 'When the coach notices a trend worth sharing', on: false },
  { label: 'Achievement unlocked', desc: 'Celebrate when you earn a new badge', on: true },
  { label: 'Streak milestones', desc: 'Celebrate when you hit streak goals', on: true },
];

const privacySettings = [
  { label: 'Share data with physiotherapist', desc: 'Allow your physio to view your recovery progress', on: true },
  { label: 'Anonymous analytics', desc: 'Help improve MediRecover by sharing anonymous usage data', on: true },
  { label: 'AI training opt-out', desc: 'Prevent your conversations from being used to train AI models', on: false },
];

const accessibilitySettings = [
  { label: 'Large text', desc: 'Increase font size for better readability', on: false },
  { label: 'High contrast mode', desc: 'Maximize contrast between text and background', on: false },
  { label: 'Reduce motion', desc: 'Minimize animations and transitions', on: false },
  { label: 'Screen reader hints', desc: 'Additional aria labels for assistive technology', on: true },
];

export function SettingsPage() {
  const [active, setActive] = useState<string>('theme');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState('en-US');

  return (
    <AppLayout>
      <PageHeader title="Settings" subtitle="Customize your MediRecover experience." />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card className="p-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all',
                  active === s.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                <s.icon size={18} /> {s.label}
              </button>
            ))}
          </Card>
        </div>

        <div className="lg:col-span-3">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {active === 'theme' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Theme</h3>
                <p className="mb-4 text-sm text-slate-500">Choose how MediRecover looks for you.</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {([
                    { key: 'light', label: 'Light', icon: Sun },
                    { key: 'dark', label: 'Dark', icon: Moon },
                    { key: 'system', label: 'System', icon: Palette },
                  ] as const).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTheme(t.key)}
                      className={cn(
                        'flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all',
                        theme === t.key ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                      )}
                    >
                      <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', theme === t.key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500')}>
                        <t.icon size={22} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{t.label}</span>
                      {theme === t.key && <Check size={16} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  Dark mode and system theme will be available in a future update. Your preference has been saved.
                </div>
              </Card>
            )}

            {active === 'notifications' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Notification Preferences</h3>
                <div className="space-y-4">
                  {notificationSettings.map((n) => (
                    <ToggleRow key={n.label} label={n.label} desc={n.desc} defaultOn={n.on} />
                  ))}
                </div>
              </Card>
            )}

            {active === 'privacy' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Privacy</h3>
                <div className="space-y-4">
                  {privacySettings.map((n) => (
                    <ToggleRow key={n.label} label={n.label} desc={n.desc} defaultOn={n.on} />
                  ))}
                </div>
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <h4 className="font-bold text-slate-900">Your data</h4>
                  <p className="mt-1 text-sm text-slate-500">You can export or permanently delete all your recovery data at any time.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button variant="outline" size="sm"><Download size={16} /> Export my data</Button>
                    <Button variant="danger" size="sm">Delete all data</Button>
                  </div>
                </div>
              </Card>
            )}

            {active === 'accessibility' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Accessibility</h3>
                <div className="space-y-4">
                  {accessibilitySettings.map((n) => (
                    <ToggleRow key={n.label} label={n.label} desc={n.desc} defaultOn={n.on} />
                  ))}
                </div>
              </Card>
            )}

            {active === 'language' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Language</h3>
                <Select label="Display language" value={language} onChange={(e) => setLanguage(e.target.value)} className="max-w-sm">
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es-ES">Español</option>
                  <option value="fr-FR">Français</option>
                  <option value="de-DE">Deutsch</option>
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="ja-JP">日本語</option>
                </Select>
                <p className="mt-4 text-sm text-slate-500">More languages coming soon. Your preference has been saved.</p>
              </Card>
            )}

            {active === 'export' && (
              <Card>
                <h3 className="mb-6 font-bold text-slate-900">Export Your Data</h3>
                <p className="text-sm text-slate-500">Download a complete copy of your recovery data, including all check-ins, journal entries, exercise logs, and achievements.</p>
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <Download size={32} className="mx-auto text-slate-400" />
                  <p className="mt-4 text-sm font-semibold text-slate-600">Your data export will be ready as a JSON file</p>
                  <p className="mt-1 text-xs text-slate-400">Includes 30 days of recovery entries, journal entries, exercise logs, and achievements</p>
                </div>
                <Button className="mt-6"><Download size={16} /> Generate export</Button>
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
