-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('coach', 'player', 'admin')) DEFAULT 'player',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    coach_id UUID REFERENCES public.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    valorant_username TEXT NOT NULL,
    valorant_tag TEXT NOT NULL,
    primary_role TEXT CHECK (primary_role IN ('Duelist', 'Initiator', 'Controller', 'Sentinel')) NOT NULL,
    rank TEXT NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

-- Create player_statistics table
CREATE TABLE IF NOT EXISTS public.player_statistics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id UUID REFERENCES public.team_members(id) ON DELETE CASCADE,
    match_date DATE NOT NULL,
    map_name TEXT NOT NULL,
    agent_used TEXT NOT NULL,
    kills INTEGER NOT NULL DEFAULT 0,
    deaths INTEGER NOT NULL DEFAULT 0,
    assists INTEGER NOT NULL DEFAULT 0,
    acs INTEGER NOT NULL DEFAULT 0,
    headshot_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,
    first_kills INTEGER NOT NULL DEFAULT 0,
    first_deaths INTEGER NOT NULL DEFAULT 0,
    clutches_won INTEGER NOT NULL DEFAULT 0,
    clutches_attempted INTEGER NOT NULL DEFAULT 0,
    match_result TEXT CHECK (match_result IN ('win', 'loss', 'draw')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weapon_statistics table
CREATE TABLE IF NOT EXISTS public.weapon_statistics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id UUID REFERENCES public.team_members(id) ON DELETE CASCADE,
    weapon_name TEXT NOT NULL,
    kills INTEGER NOT NULL DEFAULT 0,
    shots_fired INTEGER NOT NULL DEFAULT 0,
    shots_hit INTEGER NOT NULL DEFAULT 0,
    headshots INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(player_id, weapon_name)
);

-- Create ai_training_recommendations table
CREATE TABLE IF NOT EXISTS public.ai_training_recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    player_id UUID REFERENCES public.team_members(id) ON DELETE CASCADE,
    recommendation_type TEXT CHECK (recommendation_type IN ('individual', 'team')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT CHECK (priority IN ('high', 'medium', 'low')) NOT NULL,
    category TEXT CHECK (category IN ('aim', 'strategy', 'utility', 'positioning', 'communication')) NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    estimated_time INTEGER NOT NULL DEFAULT 30,
    ai_analysis JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_completed BOOLEAN DEFAULT FALSE
);
