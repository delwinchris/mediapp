/*
# Create profiles table for MediRecover user data

## Purpose
Stores per-user recovery profile information that supplements Supabase Auth.
Each row corresponds to one authenticated user (1:1 with auth.users).

## New Tables
- `profiles`
  - `id` (uuid, primary key) — matches auth.users.id
  - `email` (text, not null) — denormalized for convenience
  - `name` (text, not null) — display name
  - `age` (integer) — optional
  - `height` (integer) — optional, in cm
  - `weight` (integer) — optional, in kg
  - `injury` (text, not null) — injury type description
  - `injury_date` (date, not null) — when the injury occurred
  - `surgery_date` (date) — optional, if surgery was performed
  - `pain_level` (integer, not null, default 5) — 1-10 scale
  - `mobility_level` (integer, not null, default 50) — 0-100 percentage
  - `recovery_goal` (text, not null) — free-text goal
  - `my_why` (text) — optional, the user's personal motivation
  - `avatar_url` (text) — optional profile picture URL
  - `onboarding_completed` (boolean, not null, default false)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## Security
- Row Level Security enabled on `profiles`.
- 4 owner-scoped policies (SELECT, INSERT, UPDATE, DELETE) scoped to `authenticated`.
- Users can only access their own profile row (auth.uid() = id).
- No `TO anon` policies — this table requires authentication.

## Important Notes
1. The `id` column references `auth.users(id)` with ON DELETE CASCADE so profiles are cleaned up when a user is deleted.
2. `onboarding_completed` tracks whether the user has completed the onboarding flow.
3. `updated_at` is maintained by a trigger to track profile modifications.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  age integer,
  height integer,
  weight integer,
  injury text NOT NULL DEFAULT '',
  injury_date date NOT NULL DEFAULT CURRENT_DATE,
  surgery_date date,
  pain_level integer NOT NULL DEFAULT 5,
  mobility_level integer NOT NULL DEFAULT 50,
  recovery_goal text NOT NULL DEFAULT '',
  my_why text,
  avatar_url text,
  onboarding_completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: users can read their own profile
DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- INSERT: users can insert their own profile
DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- UPDATE: users can update their own profile
DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- DELETE: users can delete their own profile
DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
