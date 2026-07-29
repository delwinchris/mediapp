import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  to?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { box: 'h-8 w-8', icon: 16, text: 'text-lg' },
  md: { box: 'h-10 w-10', icon: 20, text: 'text-xl' },
  lg: { box: 'h-12 w-12', icon: 24, text: 'text-2xl' },
};

export function Logo({ className, to = '/', size = 'md' }: LogoProps) {
  const s = sizes[size];
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <div className={cn('flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/30', s.box)}>
        <Activity size={s.icon} strokeWidth={2.5} />
      </div>
      <span className={cn('font-bold tracking-tight text-slate-900', s.text)}>
        Medi<span className="text-blue-600">Recover</span>
      </span>
    </Link>
  );
}
