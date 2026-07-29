import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  HeartPulse,
  Brain,
  Sparkles,
  Dumbbell,
  LineChart,
  User,
  X,
  Wind,
  BarChart3,
  Trophy,
  Calendar,
  FileText,
  Settings,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/tracker', label: 'Recovery Tracker', icon: HeartPulse },
  { to: '/app/mental', label: 'Mental Recovery', icon: Brain },
  { to: '/app/mind', label: 'Mind Recovery', icon: Wind },
  { to: '/app/exercises', label: 'Exercise Library', icon: Dumbbell },
  { to: '/app/progress', label: 'Progress', icon: LineChart },
  { to: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/app/coach', label: 'AI Coach', icon: Sparkles },
  { to: '/app/calendar', label: 'Calendar', icon: Calendar },
  { to: '/app/achievements', label: 'Achievements', icon: Trophy },
  { to: '/app/report', label: 'Recovery Report', icon: FileText },
  { to: '/app/profile', label: 'Profile', icon: User },
  { to: '/app/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-slate-200/70 bg-white/80 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Logo size="md" to="/app/dashboard" />
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 lg:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Menu</p>
        <div className="max-h-[calc(100vh-280px)] space-y-1 overflow-y-auto pb-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={cn(
                  'group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all duration-200',
                  active
                    ? 'bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                    active
                      ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  )}
                >
                  <item.icon size={18} />
                </span>
                {item.label}
              </NavLink>
            );
          })}
        </div>
        </nav>

        <div className="m-3 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 p-5 text-white">
          <p className="text-sm font-bold">7-day streak</p>
          <p className="mt-1 text-xs text-blue-100">Keep logging daily to maintain your recovery streak.</p>
        </div>
      </aside>
    </>
  );
}
