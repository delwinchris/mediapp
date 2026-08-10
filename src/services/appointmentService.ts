import type { Appointment } from '@/types';
import type { AppointmentRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    title: row.title,
    provider: row.provider,
    location: row.location,
    date: row.date,
    time: row.time,
    type: row.type as Appointment['type'],
    status: row.status as Appointment['status'],
    notes: row.notes ?? undefined,
  };
}

export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('date', { ascending: true });
    if (error) throw error;
    return (data as AppointmentRow[]).map(rowToAppointment);
  },

  async getUpcoming(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'upcoming')
      .order('date', { ascending: true });
    if (error) throw error;
    return (data as AppointmentRow[]).map(rowToAppointment);
  },

  async create(data: Omit<Appointment, 'id'>): Promise<Appointment> {
    const { data: row, error } = await supabase
      .from('appointments')
      .insert({
        title: data.title,
        provider: data.provider,
        location: data.location,
        date: data.date,
        time: data.time,
        type: data.type,
        status: data.status,
        notes: data.notes ?? null,
      })
      .select('*')
      .single();
    if (error) throw error;
    return rowToAppointment(row);
  },
};
