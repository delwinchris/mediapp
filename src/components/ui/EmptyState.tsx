import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-16 text-center"
    >
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-50">
          <Icon size={36} className="text-blue-400" />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
          <span className="text-lg">+</span>
        </div>
      </div>
      <h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm" className="mt-6">{actionLabel}</Button>
      )}
    </motion.div>
  );
}
