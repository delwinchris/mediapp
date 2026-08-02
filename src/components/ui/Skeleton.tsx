import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function SkeletonCard({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cn('animate-pulse rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm', className)}>{children}</div>;
}

export function SkeletonLine({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cn('animate-pulse rounded-lg bg-slate-200', className)}>{children}</div>;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonLine className="h-8 w-48" />
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonCard className="flex items-center justify-center lg:row-span-2">
          <SkeletonLine className="h-40 w-40 rounded-full" />
        </SkeletonCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <SkeletonCard><SkeletonLine className="h-16 w-full" /></SkeletonCard>
          <SkeletonCard><SkeletonLine className="h-16 w-full" /></SkeletonCard>
          <SkeletonCard className="sm:col-span-2"><SkeletonLine className="h-16 w-full" /></SkeletonCard>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i}><SkeletonLine className="h-20 w-full" /></SkeletonCard>
        ))}
      </div>
    </div>
  );
}

export function RecoverySkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonLine className="h-8 w-48" />
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonCard><SkeletonLine className="h-64 w-full" /></SkeletonCard>
        <SkeletonCard><SkeletonLine className="h-64 w-full" /></SkeletonCard>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonLine className="mb-4 h-6 w-32" />
      <SkeletonLine className="h-56 w-full rounded-2xl" />
    </SkeletonCard>
  );
}

export function ExerciseSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} className="p-0">
          <SkeletonLine className="h-32 w-full rounded-none rounded-t-3xl" />
          <div className="p-4"><SkeletonLine className="mb-2 h-4 w-3/4" /><SkeletonLine className="h-3 w-1/2" /></div>
        </SkeletonCard>
      ))}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={cn('flex gap-3', i % 2 === 0 ? '' : 'flex-row-reverse')}>
          <SkeletonLine className="h-9 w-9 rounded-xl" />
          <SkeletonLine className="h-16 w-2/3 rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <SkeletonCard className="text-center">
        <SkeletonLine className="mx-auto h-24 w-24 rounded-3xl" />
        <SkeletonLine className="mx-auto mt-4 h-5 w-24" />
        <SkeletonLine className="mx-auto mt-2 h-4 w-32" />
      </SkeletonCard>
      <div className="space-y-4 lg:col-span-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i}><SkeletonLine className="h-12 w-full" /></SkeletonCard>
        ))}
      </div>
    </div>
  );
}
