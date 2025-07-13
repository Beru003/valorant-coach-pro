# 🚀 Complete Supabase Setup Guide

## Step 1: Create a Supabase Account

1. **Go to Supabase**: Visit [https://supabase.com](https://supabase.com)
2. **Sign Up**: Click "Start your project" and create an account
3. **Verify Email**: Check your email and verify your account

## Step 2: Create a New Project

1. **Click "New Project"** on your dashboard
2. **Fill in Project Details**:
   - **Name**: `valorant-coaching-app`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Select "Free tier" for development

3. **Click "Create new project"**
4. **Wait 2-3 minutes** for project setup to complete

## Step 3: Get Your API Keys

1. **Go to Settings** (gear icon in left sidebar)
2. **Click "API"** in the settings menu
3. **Copy these values**:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role secret key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 4: Set Up Your Environment Variables

Create a `.env.local` file in your project root:

\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Gemini AI Configuration  
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
\`\`\`

## Step 5: Create Database Tables

1. **Go to SQL Editor** (in left sidebar)
2. **Click "New query"**
3. **Copy and paste** the SQL code below
4. **Click "Run"** to execute

### First SQL Script - Create Tables:
\`\`\`sql
-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

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
\`\`\`

## Step 6: Set Up Security Policies

1. **Create a new query** in SQL Editor
2. **Copy and paste** this security code:

\`\`\`sql
-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weapon_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_training_recommendations ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Teams policies
CREATE POLICY "Coaches can view their teams" ON public.teams
    FOR SELECT USING (auth.uid() = coach_id);

CREATE POLICY "Coaches can create teams" ON public.teams
    FOR INSERT WITH CHECK (auth.uid() = coach_id);

CREATE POLICY "Coaches can update their teams" ON public.teams
    FOR UPDATE USING (auth.uid() = coach_id);

-- Team members policies
CREATE POLICY "Team members can view their team data" ON public.team_members
    FOR SELECT USING (
        auth.uid() = user_id OR 
        auth.uid() IN (SELECT coach_id FROM public.teams WHERE id = team_id)
    );

CREATE POLICY "Coaches can manage team members" ON public.team_members
    FOR ALL USING (
        auth.uid() IN (SELECT coach_id FROM public.teams WHERE id = team_id)
    );

-- Player statistics policies
CREATE POLICY "Players and coaches can view statistics" ON public.player_statistics
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.team_members WHERE id = player_id
            UNION
            SELECT coach_id FROM public.teams t 
            JOIN public.team_members tm ON t.id = tm.team_id 
            WHERE tm.id = player_id
        )
    );

-- AI recommendations policies
CREATE POLICY "Team members can view recommendations" ON public.ai_training_recommendations
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.team_members WHERE team_id = ai_training_recommendations.team_id
            UNION
            SELECT coach_id FROM public.teams WHERE id = ai_training_recommendations.team_id
        )
    );

CREATE POLICY "Coaches can manage recommendations" ON public.ai_training_recommendations
    FOR ALL USING (
        auth.uid() IN (SELECT coach_id FROM public.teams WHERE id = team_id)
    );
\`\`\`

## Step 7: Create Helper Functions

1. **Create another new query**
2. **Copy and paste** this functions code:

\`\`\`sql
-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, username, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'player')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS handle_updated_at ON public.users;
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at ON public.teams;
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.teams
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at ON public.weapon_statistics;
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.weapon_statistics
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
\`\`\`

## Step 8: Enable Authentication

1. **Go to Authentication** (in left sidebar)
2. **Click "Settings"**
3. **Make sure these are enabled**:
   - ✅ Enable email confirmations
   - ✅ Enable signup
4. **Click "Save"**

## Step 9: Test Your Setup

1. **Go to Table Editor** (in left sidebar)
2. **You should see all your tables**:
   - users
   - teams  
   - team_members
   - player_statistics
   - weapon_statistics
   - ai_training_recommendations

## ✅ You're Done!

Your Supabase database is now ready! You can now:
1. Run `npm run dev` in your project
2. Go to `http://localhost:3000/auth/register`
3. Create a coach account
4. Start using the app!

## 🆘 Troubleshooting

**Problem**: Tables not showing up
**Solution**: Make sure you ran all 3 SQL scripts

**Problem**: Authentication not working  
**Solution**: Check your environment variables are correct

**Problem**: Permission errors
**Solution**: Make sure Row Level Security policies were created

**Need Help?** Check the Supabase documentation at [docs.supabase.com](https://docs.supabase.com)
\`\`\`

Now let me create a simple setup script to make this even easier:
