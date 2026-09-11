import type { AIConversation } from '@/types';
import type { AIConversationRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToConversation(row: AIConversationRow): AIConversation {
  return {
    id: row.id,
    title: row.title,
    messages: row.messages ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const aiChatService = {
  async getAll(): Promise<AIConversation[]> {
    const { data, error } = await supabase
      .from('ai_conversations')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return (data as AIConversationRow[]).map(rowToConversation);
  },

  async getById(id: string): Promise<AIConversation | null> {
    const { data, error } = await supabase
      .from('ai_conversations')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToConversation(data) : null;
  },

  async create(title: string): Promise<AIConversation> {
    const { data: row, error } = await supabase
      .from('ai_conversations')
      .insert({ title, messages: [] })
      .select('*')
      .single();
    if (error) throw error;
    return rowToConversation(row);
  },

  async sendMessage(conversationId: string, text: string): Promise<{ userMessage: string; coachResponse: string }> {
    const conversation = await this.getById(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    const userMsg = {
      id: `msg_${Date.now()}`,
      role: 'user' as const,
      text,
      timestamp: new Date().toISOString(),
    };

    const endpoint = import.meta.env.VITE_AI_COACH_ENDPOINT as string | undefined;
    if (!endpoint) {
      throw new Error('AI coaching is not configured yet. Please set VITE_AI_COACH_ENDPOINT to enable live responses.');
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId, message: text, messages: conversation.messages }),
    });
    if (!response.ok) throw new Error('The AI coach could not respond. Please try again later.');
    const payload = await response.json() as { response?: string };
    const coachResponse = payload.response?.trim();
    if (!coachResponse) throw new Error('The AI coach returned an empty response.');

    const coachMsg = {
      id: `msg_${Date.now() + 1}`,
      role: 'coach' as const,
      text: coachResponse,
      timestamp: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('ai_conversations')
      .update({
        messages: [...conversation.messages, userMsg, coachMsg],
        updated_at: new Date().toISOString(),
      })
      .eq('id', conversationId);

    if (error) throw error;
    return { userMessage: text, coachResponse };
  },
};
