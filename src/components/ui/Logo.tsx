import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  to?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { box: 'h-8 w-8', svg: 18, text: 'text-lg' },
  md: { box: 'h-10 w-10', svg: 22, text: 'text-xl' },
  lg: { box: 'h-12 w-12', svg: 26, text: 'text-2xl' },
};

export function Logo({ className, to = '/', size = 'md' }: LogoProps) {
  const s = sizes[size];
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white shadow-lg shadow-blue-600/30',
          s.box
        )}
      >
        <svg width={s.svg} height={s.svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 18 L9 13 L13 16 L20 7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 7 L20 7 L20 12"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="4" cy="18" r="1.5" fill="white" />
          <circle cx="20" cy="7" r="1.5" fill="white" />
        </svg>
      </div>
      <span className={cn('font-bold tracking-tight text-slate-900', s.text)}>
        Medi<span className="text-blue-600">Recover</span>
      </span>
    </Link>
  );
}
