import type { AIConversation } from '@/types';
import { mockAIConversations } from '@/lib/mockDatabase';
import { delay, generateId } from './index';

/**
 * AI Chat Service — placeholder for future Supabase + Gemini/OpenAI integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('ai_conversations').select('*').eq('user_id', userId).order('updated_at', { ascending: false })
 * - create → supabase.from('ai_conversations').insert({ ...data, user_id: userId })
 *
 * When Gemini/OpenAI is connected:
 * - sendMessage → call Edge Function that proxies to Gemini/OpenAI API
 *   The Edge Function should:
 *   1. Verify the user's JWT
 *   2. Fetch conversation history from Supabase
 *   3. Call the AI API with the conversation context
 *   4. Store both user message and AI response in Supabase
 *   5. Return the AI response
 *
 * RLS Policy: users can only CRUD their own AI conversations.
 */

export const aiChatService = {
  async getAll(): Promise<AIConversation[]> {
    await delay();
    return mockAIConversations;
  },

  async getById(id: string): Promise<AIConversation | null> {
    await delay();
    return mockAIConversations.find((c) => c.id === id) ?? null;
  },

  async create(title: string): Promise<AIConversation> {
    await delay();
    return {
      id: generateId('ai'),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  async sendMessage(conversationId: string, text: string): Promise<{ userMessage: string; coachResponse: string }> {
    await delay(800);
    return {
      userMessage: text,
      coachResponse: "Based on your recovery data, you're progressing well. Continue your current routine and discuss any concerns with your physiotherapist.",
    };
  },
};
