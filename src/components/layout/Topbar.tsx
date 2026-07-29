import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { mockUser } from '@/lib/mockData';

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
}

export function Topbar({ onMenuClick, title }: TopbarProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200/70 bg-white/70 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white/60 px-3 py-2 text-slate-400 sm:flex">
          <Search size={16} />
          <input
            placeholder="Search exercises..."
            className="w-40 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <button className="relative rounded-2xl p-2.5 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <button onClick={() => navigate('/app/profile')} className="flex items-center gap-2 rounded-2xl p-1 pr-3 transition-colors hover:bg-slate-100">
          <img src={mockUser.avatarUrl} alt={mockUser.name} className="h-9 w-9 rounded-xl object-cover" />
          <span className="hidden text-sm font-semibold text-slate-700 sm:block">{mockUser.name.split(' ')[0]}</span>
        </button>
      </div>
    </header>
  );
}
