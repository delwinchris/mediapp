import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Search, Dumbbell, HeartPulse, BookHeart, Trophy, Sparkles, X } from 'lucide-react';
import { mockUser, searchResults } from '@/lib/mockData';
import type { SearchResult } from '@/lib/types';
import { cn } from '@/lib/cn';

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
}

const typeIcons: Record<string, typeof Dumbbell> = {
  exercise: Dumbbell, log: HeartPulse, journal: BookHeart, milestone: Trophy, ai: Sparkles,
};

const typeColors: Record<string, string> = {
  exercise: 'bg-blue-50 text-blue-600',
  log: 'bg-rose-50 text-rose-500',
  journal: 'bg-violet-50 text-violet-600',
  milestone: 'bg-amber-50 text-amber-600',
  ai: 'bg-emerald-50 text-emerald-600',
};

const typeLabels: Record<string, string> = {
  exercise: 'Exercise', log: 'Recovery Log', journal: 'Journal', milestone: 'Milestone', ai: 'AI Chat',
};

export function Topbar({ onMenuClick, title }: TopbarProps) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [bellOpen, setBellOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered: SearchResult[] = query.trim()
    ? searchResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase()))
    : searchResults.slice(0, 6);

  const goTo = (route: string) => {
    navigate(route);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/60 px-3 py-2.5 text-slate-400 transition-colors hover:bg-slate-50"
            aria-label="Search"
          >
            <Search size={16} />
            <span className="hidden text-sm sm:inline">Search...</span>
          </button>
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-96"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 p-3">
                  <Search size={16} className="text-slate-400" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search exercises, logs, journal, milestones..."
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                  {query && (
                    <button onClick={() => setQuery('')} aria-label="Clear search"><X size={14} className="text-slate-400" /></button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-slate-400">No results found for "{query}"</div>
                  ) : (
                    filtered.map((r) => {
                      const Icon = typeIcons[r.type] ?? Search;
                      return (
                        <button
                          key={r.id}
                          onClick={() => goTo(r.route)}
                          className="flex w-full items-center gap-3 border-b border-slate-50 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                        >
                          <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', typeColors[r.type])}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-700">{r.title}</p>
                            <p className="truncate text-xs text-slate-400">{r.description}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-slate-50 px-2 py-0.5 text-xs font-bold text-slate-500">{typeLabels[r.type]}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications bell */}
        <div ref={bellRef} className="relative">
          <button
            onClick={() => setBellOpen((v) => !v)}
            className="relative rounded-2xl p-2.5 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          <AnimatePresence>
            {bellOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 top-12 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
              >
                <div className="border-b border-slate-100 p-3">
                  <p className="text-sm font-bold text-slate-900">Notifications</p>
                  <p className="text-xs text-slate-400">3 unread</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {searchResults.slice(0, 4).map((r) => (
                    <div key={r.id} className="border-b border-slate-50 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-700">{r.title}</p>
                      <p className="text-xs text-slate-400">{r.description}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { navigate('/app/notifications'); setBellOpen(false); }}
                  className="w-full bg-slate-50 p-3 text-center text-sm font-semibold text-blue-600 hover:bg-slate-100"
                >
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button onClick={() => navigate('/app/profile')} className="flex items-center gap-2 rounded-2xl p-1 pr-3 transition-colors hover:bg-slate-100">
          <img src={mockUser.avatarUrl} alt={mockUser.name} className="h-9 w-9 rounded-xl object-cover" />
          <span className="hidden text-sm font-semibold text-slate-700 sm:block">{mockUser.name.split(' ')[0]}</span>
        </button>
      </div>
    </header>
  );
}
