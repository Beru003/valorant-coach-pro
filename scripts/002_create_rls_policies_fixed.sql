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

CREATE POLICY "Allow user creation during signup" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

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

CREATE POLICY "Coaches can manage statistics" ON public.player_statistics
    FOR ALL USING (
        auth.uid() IN (
            SELECT coach_id FROM public.teams t 
            JOIN public.team_members tm ON t.id = tm.team_id 
            WHERE tm.id = player_id
        )
    );

-- Weapon statistics policies
CREATE POLICY "Players and coaches can view weapon stats" ON public.weapon_statistics
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.team_members WHERE id = player_id
            UNION
            SELECT coach_id FROM public.teams t 
            JOIN public.team_members tm ON t.id = tm.team_id 
            WHERE tm.id = player_id
        )
    );

CREATE POLICY "Coaches can manage weapon stats" ON public.weapon_statistics
    FOR ALL USING (
        auth.uid() IN (
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
