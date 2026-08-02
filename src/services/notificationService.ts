import type { NotificationItem } from '@/types';
import { notifications } from '@/lib/mockData';
import { delay, generateId } from './index';

/**
 * Notification Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false })
 * - markRead → supabase.from('notifications').update({ read: true }).eq('id', notificationId)
 * - markAllRead → supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false)
 *
 * RLS Policy: users can only read/update their own notifications.
 */

export const notificationService = {
  async getAll(): Promise<NotificationItem[]> {
    await delay();
    return notifications;
  },

  async markRead(id: string): Promise<void> {
    await delay(200);
  },

  async markAllRead(): Promise<void> {
    await delay(200);
  },

  async create(data: Omit<NotificationItem, 'id'>): Promise<NotificationItem> {
    await delay(200);
    return { ...data, id: generateId('n') };
  },
};
