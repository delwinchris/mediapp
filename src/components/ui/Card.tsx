import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

export function Card({ className, glass, hover, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm',
        glass && 'glass shadow-xl shadow-slate-900/5',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10',
        className
      )}
      {...props}
    />
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  accent?: 'blue' | 'emerald' | 'amber' | 'violet' | 'rose' | 'sky';
  trend?: { value: string; up: boolean };
}

const accents: Record<NonNullable<StatCardProps['accent']>, string> = {
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-400 to-amber-500',
  violet: 'from-violet-500 to-violet-600',
  rose: 'from-rose-400 to-rose-500',
  sky: 'from-sky-400 to-sky-500',
};

export function StatCard({ label, value, unit, icon, accent = 'blue', trend }: StatCardProps) {
  return (
    <Card hover className="relative overflow-hidden">
      <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-10', accents[accent])} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
            {unit && <span className="ml-1 text-lg font-medium text-slate-400">{unit}</span>}
          </p>
        </div>
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', accents[accent])}>
          {icon}
        </div>
      </div>
      {trend && (
        <p className={cn('mt-3 text-xs font-semibold', trend.up ? 'text-emerald-600' : 'text-rose-500')}>
          {trend.up ? '▲' : '▼'} {trend.value}
        </p>
      )}
    </Card>
  );
}
