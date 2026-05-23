-- Supabase Schema for Maneuver 2026
-- Run this in Supabase SQL Editor

-- Teams table (scouting data)
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_number INT NOT NULL UNIQUE,
  nickname TEXT NOT NULL,
  event_key TEXT NOT NULL DEFAULT '2026gacmp',
  match_count INT DEFAULT 0,
  total_points INT DEFAULT 0,
  auto_points INT DEFAULT 0,
  teleop_points INT DEFAULT 0,
  endgame_points INT DEFAULT 0,
  fuel_mopr DOUBLE PRECISION DEFAULT 0,
  auto_fuel INT DEFAULT 0,
  teleop_fuel INT DEFAULT 0,
  total_fuel INT DEFAULT 0,
  climb_rate INT DEFAULT 0,
  climb_l1 INT DEFAULT 0,
  climb_l2 INT DEFAULT 0,
  climb_l3 INT DEFAULT 0,
  auto_climb_rate INT DEFAULT 0,
  defense INT DEFAULT 0,
  accuracy INT DEFAULT 0,
  fouls DOUBLE PRECISION DEFAULT 0,
  breakdown INT DEFAULT 0,
  roles TEXT[] DEFAULT '{}',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pick lists table
CREATE TABLE IF NOT EXISTS public.pick_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  event_key TEXT DEFAULT '2026gacmp',
  teams INT[] DEFAULT '{}',
  created_by TEXT DEFAULT 'anonymous',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat history table
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'rules',
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) policies
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pick_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

-- Allow all read access for public scouting data
CREATE POLICY "Allow all read teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Allow all read pick_lists" ON public.pick_lists FOR SELECT USING (true);

-- Allow insert/update for pick lists (public for now - add auth later)
CREATE POLICY "Allow all insert pick_lists" ON public.pick_lists FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update pick_lists" ON public.pick_lists FOR UPDATE USING (true);

-- Chat history is private
CREATE POLICY "Allow all chat_history" ON public.chat_history FOR ALL USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_teams_event ON public.teams(event_key);
CREATE INDEX IF NOT EXISTS idx_teams_climb ON public.teams(climb_rate DESC);
CREATE INDEX IF NOT EXISTS idx_teams_fuel ON public.teams(fuel_mopr DESC);
CREATE INDEX IF NOT EXISTS idx_chat_session ON public.chat_history(session_id);
