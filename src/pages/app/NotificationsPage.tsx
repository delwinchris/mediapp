import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell, HeartPulse, Droplets, FileText, Stethoscope, Flame, Trophy, Sparkles,
  Check, CheckCheck, Bell, Trash2,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { notifications as initialNotifications } from '@/lib/mockData';
import type { NotificationItem } from '@/lib/types';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  Dumbbell, HeartPulse, Droplets, FileText, Stethoscope, Flame, Trophy, Sparkles,
};

const typeColors: Record<string, string> = {
  exercise: 'from-blue-500 to-blue-600',
  pain: 'from-rose-400 to-rose-500',
  hydration: 'from-sky-400 to-sky-500',
  report: 'from-violet-500 to-violet-600',
  appointment: 'from-emerald-500 to-emerald-600',
  streak: 'from-amber-400 to-amber-500',
  achievement: 'from-yellow-400 to-orange-500',
  ai: 'from-blue-600 to-emerald-500',
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const markRead = (id: string) => setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  const clearAll = () => setNotifications([]);

  return (
    <AppLayout>
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
              <CheckCheck size={16} /> Mark all read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
              <Trash2 size={16} /> Clear
            </Button>
          </div>
        }
      />

      <div className="mb-6 flex gap-2">
        {(['all', 'unread'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-all',
              filter === f ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' : 'bg-white text-slate-600 hover:bg-slate-100'
            )}
          >
            {f}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-rose-500 px-1.5 py-0.5 text-xs text-white">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You're all caught up. New notifications about your exercises, appointments, and recovery milestones will appear here."
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((n, i) => {
              const Icon = iconMap[n.icon] ?? Bell;
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card
                    hover
                    className={cn('cursor-pointer transition-all', !n.read && 'border-blue-200 bg-blue-50/30')}
                    onClick={() => markRead(n.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', typeColors[n.type])}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={cn('text-sm', n.read ? 'font-semibold text-slate-700' : 'font-bold text-slate-900')}>{n.title}</p>
                            <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{n.description}</p>
                          </div>
                          {!n.read && <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-slate-400">{n.time}</span>
                          {!n.read && (
                            <button
                              onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                            >
                              <Check size={12} /> Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </AppLayout>
  );
}
