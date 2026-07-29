import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Footprints, Moon, Zap, Droplets, StickyNote, Check, Calendar } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider, Textarea } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { recoveryHistory } from '@/lib/mockData';
import { formatDate } from '@/lib/analytics';
import { cn } from '@/lib/cn';

export function RecoveryTrackerPage() {
  const [pain, setPain] = useState(3);
  const [mobility, setMobility] = useState(7);
  const [sleep, setSleep] = useState(7);
  const [energy, setEnergy] = useState(8);
  const [swelling, setSwelling] = useState(3);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const today = recoveryHistory[recoveryHistory.length - 1];

  return (
    <AppLayout>
      <PageHeader title="Recovery Tracker" subtitle="Log how your body feels today. Daily tracking reveals real trends." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white"><Calendar size={20} /></div>
              <div>
                <h3 className="font-bold text-slate-900">Today's entry</h3>
                <p className="text-sm text-slate-500">{formatDate(today.date)}, 2026</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Slider label="Pain level" value={pain} onChange={setPain} color="rose" leftLabel="No pain" rightLabel="Worst" />
              <Slider label="Mobility" value={mobility} onChange={setMobility} color="emerald" leftLabel="Limited" rightLabel="Full" />
              <Slider label="Sleep (hours)" value={sleep} min={0} max={12} onChange={setSleep} color="violet" leftLabel="0h" rightLabel="12h" />
              <Slider label="Energy" value={energy} onChange={setEnergy} color="amber" leftLabel="Exhausted" rightLabel="Energetic" />
              <Slider label="Swelling" value={swelling} onChange={setSwelling} color="blue" leftLabel="None" rightLabel="Severe" />
            </div>

            <div className="mt-6">
              <Textarea label="Notes" rows={4} placeholder="How did today go? Anything to remember for your next physio visit?" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button onClick={handleSave} disabled={saved}>{saved ? (<><Check size={18} /> Saved!</>) : 'Save entry'}</Button>
              <Button variant="outline" onClick={() => { setPain(5); setMobility(5); setSleep(7); setEnergy(5); setSwelling(5); setNotes(''); }}>Reset</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 font-bold text-slate-900">Today's snapshot</h3>
            <div className="space-y-3">
              {[
                { label: 'Pain', value: pain, icon: HeartPulse, color: 'text-rose-500 bg-rose-50' },
                { label: 'Mobility', value: mobility, icon: Footprints, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'Sleep', value: `${sleep}h`, icon: Moon, color: 'text-violet-600 bg-violet-50' },
                { label: 'Energy', value: energy, icon: Zap, color: 'text-amber-600 bg-amber-50' },
                { label: 'Swelling', value: swelling, icon: Droplets, color: 'text-blue-600 bg-blue-50' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl', s.color)}><s.icon size={16} /></div>
                  <span className="text-sm font-medium text-slate-600">{s.label}</span>
                  <span className="ml-auto font-bold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900"><StickyNote size={18} className="text-slate-400" /> Recent notes</h3>
            <div className="space-y-3">
              {recoveryHistory.slice(-4).reverse().map((e) => (
                <div key={e.id} className="rounded-2xl border border-slate-100 p-3">
                  <p className="text-xs font-semibold text-slate-400">{formatDate(e.date)}</p>
                  <p className="mt-1 text-sm text-slate-600">{e.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <h3 className="mb-4 font-bold text-slate-900">Recent history</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">Date</th><th className="pb-3 pr-4">Pain</th><th className="pb-3 pr-4">Mobility</th>
                <th className="pb-3 pr-4">Sleep</th><th className="pb-3 pr-4">Energy</th><th className="pb-3 pr-4">Swelling</th><th className="pb-3 pr-4">Mood</th>
              </tr>
            </thead>
            <tbody>
              {recoveryHistory.slice().reverse().map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-700">{formatDate(e.date)}</td>
                  <td className="py-3 pr-4"><span className={cn('rounded-lg px-2 py-0.5 text-xs font-bold', e.pain <= 3 ? 'bg-emerald-50 text-emerald-600' : e.pain <= 6 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600')}>{e.pain}/10</span></td>
                  <td className="py-3 pr-4 text-slate-600">{e.mobility}/10</td>
                  <td className="py-3 pr-4 text-slate-600">{e.sleep}h</td>
                  <td className="py-3 pr-4 text-slate-600">{e.energy}/10</td>
                  <td className="py-3 pr-4 text-slate-600">{e.swelling}/10</td>
                  <td className="py-3 pr-4 text-slate-600">{e.mood}/10</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
}
