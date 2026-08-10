import type { NotificationItem } from '@/types';
import type { NotificationRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToNotification(row: NotificationRow): NotificationItem {
  return {
    id: row.id,
    type: row.type as NotificationItem['type'],
    title: row.title,
    description: row.description,
    time: row.time,
    read: row.read,
    icon: row.icon,
  };
}

export const notificationService = {
  async getAll(): Promise<NotificationItem[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as NotificationRow[]).map(rowToNotification);
  },

  async markRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    if (error) throw error;
  },

  async markAllRead(): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);
    if (error) throw error;
  },

  async create(data: Omit<NotificationItem, 'id'>): Promise<NotificationItem> {
    const { data: row, error } = await supabase
      .from('notifications')
      .insert({
        type: data.type,
        title: data.title,
        description: data.description,
        time: data.time,
        read: data.read,
        icon: data.icon,
      })
      .select('*')
      .single();
    if (error) throw error;
    return rowToNotification(row);
  },
};
