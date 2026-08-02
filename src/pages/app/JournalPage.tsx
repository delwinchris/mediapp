import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookHeart, Search, Smile, TrendingUp, Trophy, Mountain, Heart, Sparkles,
  Calendar,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { mockJournalEntries } from '@/lib/mockDatabase';
import { cn } from '@/lib/cn';

const moodColors: Record<string, string> = {
  'Hopeful and rested': 'from-emerald-400 to-teal-500',
  'Proud and strong': 'from-blue-400 to-blue-600',
  'Calm and optimistic': 'from-sky-400 to-cyan-500',
  'Determined and focused': 'from-violet-400 to-purple-500',
  'Grateful and peaceful': 'from-amber-400 to-orange-500',
  'Energized and motivated': 'from-rose-400 to-pink-500',
  'Reflective and patient': 'from-indigo-400 to-blue-500',
  'Confident and ready': 'from-emerald-500 to-green-600',
  'Tired but positive': 'from-slate-400 to-slate-500',
  'Encouraged by progress': 'from-teal-400 to-emerald-500',
};

const moodEmojis: Record<string, string> = {
  'Hopeful and rested': '😊', 'Proud and strong': '💪', 'Calm and optimistic': '😌',
  'Determined and focused': '🎯', 'Grateful and peaceful': '🙏', 'Energized and motivated': '⚡',
  'Reflective and patient': '🧘', 'Confident and ready': '🌟', 'Tired but positive': '🙂',
  'Encouraged by progress': '📈',
};

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function JournalPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'wins' | 'challenges' | 'gratitude'>('all');

  const filtered = useMemo(() => {
    let result = [...mockJournalEntries].reverse();
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (j) =>
          j.feeling.toLowerCase().includes(q) ||
          j.win.toLowerCase().includes(q) ||
          j.challenge.toLowerCase().includes(q) ||
          j.grateful.toLowerCase().includes(q)
      );
    }
    return result;
  }, [query]);

  const totalEntries = mockJournalEntries.length;
  const topMoods = useMemo(() => {
    const counts: Record<string, number> = {};
    mockJournalEntries.forEach((j) => { counts[j.feeling] = (counts[j.feeling] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  }, []);

  return (
    <AppLayout>
      <PageHeader title="Journal" subtitle="Reflect on your recovery journey" />

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><BookHeart size={18} /></div>
            <div><p className="text-2xl font-bold text-slate-900">{totalEntries}</p><p className="text-xs text-slate-500">Journal entries</p></div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Trophy size={18} /></div>
            <div><p className="text-2xl font-bold text-slate-900">{totalEntries}</p><p className="text-xs text-slate-500">Recovery wins logged</p></div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Sparkles size={18} /></div>
            <div><p className="text-2xl font-bold text-slate-900">{topMoods[0]?.[0].split(' ')[0] ?? '—'}</p><p className="text-xs text-slate-500">Most common mood</p></div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search journal entries, wins, challenges, gratitude..."
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Journal entries */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={BookHeart}
          title="No journal entries found"
          description={query ? `No entries match "${query}". Try a different search term.` : "Start journaling to reflect on your recovery journey. Your entries will appear here."}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((entry, i) => (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card hover>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl', moodColors[entry.feeling] ?? 'from-slate-400 to-slate-500')}>
                      {moodEmojis[entry.feeling] ?? '📝'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{entry.feeling}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-400"><Calendar size={12} /> {formatDate(entry.date)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-emerald-50/50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-emerald-600"><Trophy size={14} /> Recovery Win</div>
                    <p className="text-sm text-slate-700">{entry.win}</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50/50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-amber-600"><Mountain size={14} /> Challenge</div>
                    <p className="text-sm text-slate-700">{entry.challenge}</p>
                  </div>
                  <div className="rounded-2xl bg-violet-50/50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-violet-600"><Heart size={14} /> Gratitude</div>
                    <p className="text-sm text-slate-700">{entry.grateful}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
