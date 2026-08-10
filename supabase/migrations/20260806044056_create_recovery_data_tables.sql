/*
# Create all recovery data tables for MediRecover

## Purpose
Creates the full multi-tenant schema for recovery tracking: recovery logs,
mental logs, journal entries, goals, exercises, exercise history, notifications,
achievements, appointments, and AI conversations. All tables are user-scoped
with RLS policies so each authenticated user only sees their own data.

## New Tables

1. **recovery_logs** — daily physical recovery entries (pain, mobility, strength, sleep, etc.)
2. **mental_logs** — daily mental health entries (anxiety, confidence, motivation, etc.)
3. **journal_entries** — reflective journal entries (feeling, win, challenge, gratitude)
4. **goals** — recovery goals with progress tracking
5. **exercises** — shared exercise library (all authenticated users can read)
6. **exercise_history** — per-user exercise session logs
7. **notifications** — per-user in-app notifications
8. **achievements** — per-user achievement tracking
9. **appointments** — medical/physio appointments
10. **ai_conversations** — AI coach conversation history with embedded messages

## Security
- RLS enabled on every table.
- Owner-scoped CRUD (4 policies each: SELECT/INSERT/UPDATE/DELETE) on user-owned tables, scoped to `authenticated` with `auth.uid() = user_id`.
- `exercises` table is shared: SELECT to `authenticated`, write only to owner.
- All user-owned tables have `user_id uuid NOT NULL DEFAULT auth.uid()`.
- `ai_conversations.messages` stored as jsonb array (no separate messages table needed).

## Important Notes
1. All user-owned tables reference `auth.users(id)` with ON DELETE CASCADE for cleanup.
2. `user_id` defaults to `auth.uid()` so frontend inserts omitting `user_id` still succeed.
3. `exercises` is a shared library — any authenticated user can read all rows.
4. `ai_conversations.messages` is a jsonb column holding an array of message objects.
*/

-- ============ recovery_logs ============
CREATE TABLE IF NOT EXISTS recovery_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  pain integer NOT NULL DEFAULT 5,
  mobility integer NOT NULL DEFAULT 5,
  strength integer NOT NULL DEFAULT 20,
  sleep integer NOT NULL DEFAULT 7,
  energy integer NOT NULL DEFAULT 5,
  swelling integer NOT NULL DEFAULT 3,
  mood integer NOT NULL DEFAULT 5,
  medication boolean NOT NULL DEFAULT false,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE recovery_logs ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX IF NOT EXISTS recovery_logs_user_date_idx ON recovery_logs(user_id, date);

DROP POLICY IF EXISTS "select_own_recovery_logs" ON recovery_logs;
CREATE POLICY "select_own_recovery_logs" ON recovery_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_recovery_logs" ON recovery_logs;
CREATE POLICY "insert_own_recovery_logs" ON recovery_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_recovery_logs" ON recovery_logs;
CREATE POLICY "update_own_recovery_logs" ON recovery_logs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_recovery_logs" ON recovery_logs;
CREATE POLICY "delete_own_recovery_logs" ON recovery_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ mental_logs ============
CREATE TABLE IF NOT EXISTS mental_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  anxiety integer NOT NULL DEFAULT 5,
  confidence integer NOT NULL DEFAULT 5,
  fear_of_reinjury integer NOT NULL DEFAULT 5,
  motivation integer NOT NULL DEFAULT 5,
  stress integer NOT NULL DEFAULT 5,
  journal text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE mental_logs ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX IF NOT EXISTS mental_logs_user_date_idx ON mental_logs(user_id, date);

DROP POLICY IF EXISTS "select_own_mental_logs" ON mental_logs;
CREATE POLICY "select_own_mental_logs" ON mental_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_mental_logs" ON mental_logs;
CREATE POLICY "insert_own_mental_logs" ON mental_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_mental_logs" ON mental_logs;
CREATE POLICY "update_own_mental_logs" ON mental_logs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_mental_logs" ON mental_logs;
CREATE POLICY "delete_own_mental_logs" ON mental_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ journal_entries ============
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  feeling text NOT NULL DEFAULT '',
  win text NOT NULL DEFAULT '',
  challenge text NOT NULL DEFAULT '',
  grateful text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS journal_entries_user_date_idx ON journal_entries(user_id, date);

DROP POLICY IF EXISTS "select_own_journal_entries" ON journal_entries;
CREATE POLICY "select_own_journal_entries" ON journal_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_journal_entries" ON journal_entries;
CREATE POLICY "insert_own_journal_entries" ON journal_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_journal_entries" ON journal_entries;
CREATE POLICY "update_own_journal_entries" ON journal_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_journal_entries" ON journal_entries;
CREATE POLICY "delete_own_journal_entries" ON journal_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ goals ============
CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'physical',
  priority text NOT NULL DEFAULT 'medium',
  progress integer NOT NULL DEFAULT 0,
  target_date date,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS goals_user_idx ON goals(user_id);

DROP POLICY IF EXISTS "select_own_goals" ON goals;
CREATE POLICY "select_own_goals" ON goals FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_goals" ON goals;
CREATE POLICY "insert_own_goals" ON goals FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_goals" ON goals;
CREATE POLICY "update_own_goals" ON goals FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_goals" ON goals;
CREATE POLICY "delete_own_goals" ON goals FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ exercises (shared library) ============
CREATE TABLE IF NOT EXISTS exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'Beginner',
  sets integer NOT NULL DEFAULT 3,
  reps integer NOT NULL DEFAULT 10,
  duration text,
  instructions text NOT NULL DEFAULT '',
  target_area text NOT NULL DEFAULT '',
  image text,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read the shared exercise library
DROP POLICY IF EXISTS "select_exercises_authenticated" ON exercises;
CREATE POLICY "select_exercises_authenticated" ON exercises FOR SELECT TO authenticated USING (true);

-- ============ exercise_history ============
CREATE TABLE IF NOT EXISTS exercise_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id uuid REFERENCES exercises(id) ON DELETE SET NULL,
  exercise_name text NOT NULL DEFAULT '',
  date date NOT NULL,
  sets_completed integer NOT NULL DEFAULT 0,
  reps_completed integer NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'Beginner',
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE exercise_history ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS exercise_history_user_date_idx ON exercise_history(user_id, date);

DROP POLICY IF EXISTS "select_own_exercise_history" ON exercise_history;
CREATE POLICY "select_own_exercise_history" ON exercise_history FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_exercise_history" ON exercise_history;
CREATE POLICY "insert_own_exercise_history" ON exercise_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_exercise_history" ON exercise_history;
CREATE POLICY "update_own_exercise_history" ON exercise_history FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_exercise_history" ON exercise_history;
CREATE POLICY "delete_own_exercise_history" ON exercise_history FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ notifications ============
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'exercise',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  time text NOT NULL DEFAULT '',
  read boolean NOT NULL DEFAULT false,
  icon text NOT NULL DEFAULT 'Bell',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id, created_at);

DROP POLICY IF EXISTS "select_own_notifications" ON notifications;
CREATE POLICY "select_own_notifications" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_notifications" ON notifications;
CREATE POLICY "insert_own_notifications" ON notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
CREATE POLICY "update_own_notifications" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_notifications" ON notifications;
CREATE POLICY "delete_own_notifications" ON notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ achievements ============
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Trophy',
  earned boolean NOT NULL DEFAULT false,
  date date,
  xp integer NOT NULL DEFAULT 0,
  tier text NOT NULL DEFAULT 'bronze',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS achievements_user_idx ON achievements(user_id);

DROP POLICY IF EXISTS "select_own_achievements" ON achievements;
CREATE POLICY "select_own_achievements" ON achievements FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_achievements" ON achievements;
CREATE POLICY "insert_own_achievements" ON achievements FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_achievements" ON achievements;
CREATE POLICY "update_own_achievements" ON achievements FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_achievements" ON achievements;
CREATE POLICY "delete_own_achievements" ON achievements FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ appointments ============
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  provider text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  date date NOT NULL,
  time text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'physiotherapy',
  status text NOT NULL DEFAULT 'upcoming',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS appointments_user_date_idx ON appointments(user_id, date);

DROP POLICY IF EXISTS "select_own_appointments" ON appointments;
CREATE POLICY "select_own_appointments" ON appointments FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_appointments" ON appointments;
CREATE POLICY "insert_own_appointments" ON appointments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_appointments" ON appointments;
CREATE POLICY "update_own_appointments" ON appointments FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_appointments" ON appointments;
CREATE POLICY "delete_own_appointments" ON appointments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============ ai_conversations ============
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Conversation',
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS ai_conversations_user_idx ON ai_conversations(user_id, updated_at);

DROP POLICY IF EXISTS "select_own_ai_conversations" ON ai_conversations;
CREATE POLICY "select_own_ai_conversations" ON ai_conversations FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_ai_conversations" ON ai_conversations;
CREATE POLICY "insert_own_ai_conversations" ON ai_conversations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_ai_conversations" ON ai_conversations;
CREATE POLICY "update_own_ai_conversations" ON ai_conversations FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_ai_conversations" ON ai_conversations;
CREATE POLICY "delete_own_ai_conversations" ON ai_conversations FOR DELETE TO authenticated USING (auth.uid() = user_id);
