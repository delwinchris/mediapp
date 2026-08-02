import type { Appointment } from '@/types';
import { mockAppointments } from '@/lib/mockDatabase';
import { delay, generateId } from './index';

/**
 * Appointment Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('appointments').select('*').eq('user_id', userId).order('date', { ascending: true })
 * - create → supabase.from('appointments').insert({ ...data, user_id: userId })
 *
 * RLS Policy: users can only CRUD their own appointments.
 */

export const appointmentService = {
  async getAll(): Promise<Appointment[]> {
    await delay();
    return mockAppointments;
  },

  async getUpcoming(): Promise<Appointment[]> {
    await delay();
    return mockAppointments.filter((a) => a.status === 'upcoming');
  },

  async create(data: Omit<Appointment, 'id'>): Promise<Appointment> {
    await delay();
    return { ...data, id: generateId('appt') };
  },
};
