-- Enable Row Level Security for team_members table
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to view their own team's members
DROP POLICY IF EXISTS "Allow authenticated users to view their team members" ON team_members;
CREATE POLICY "Allow authenticated users to view their team members"
ON team_members FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy to allow authenticated users to insert new team members for their team
DROP POLICY IF EXISTS "Allow authenticated users to insert team members" ON team_members;
CREATE POLICY "Allow authenticated users to insert team members"
ON team_members FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy to allow authenticated users to update their own team members
DROP POLICY IF EXISTS "Allow authenticated users to update their team members" ON team_members;
CREATE POLICY "Allow authenticated users to update their team members"
ON team_members FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy to allow authenticated users to delete their own team members
DROP POLICY IF EXISTS "Allow authenticated users to delete their team members" ON team_members;
CREATE POLICY "Allow authenticated users to delete their team members"
ON team_members FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Enable Row Level Security for player_statistics table
ALTER TABLE player_statistics ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to view their own player statistics
DROP POLICY IF EXISTS "Allow authenticated users to view their player statistics" ON player_statistics;
CREATE POLICY "Allow authenticated users to view their player statistics"
ON player_statistics FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));

-- Policy to allow authenticated users to insert player statistics for their team members
DROP POLICY IF EXISTS "Allow authenticated users to insert player statistics" ON player_statistics;
CREATE POLICY "Allow authenticated users to insert player statistics"
ON player_statistics FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));

-- Policy to allow authenticated users to update their own player statistics
DROP POLICY IF EXISTS "Allow authenticated users to update their player statistics" ON player_statistics;
CREATE POLICY "Allow authenticated users to update their player statistics"
ON player_statistics FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));

-- Policy to allow authenticated users to delete their own player statistics
DROP POLICY IF EXISTS "Allow authenticated users to delete their player statistics" ON player_statistics;
CREATE POLICY "Allow authenticated users to delete their player statistics"
ON player_statistics FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));

-- Enable Row Level Security for weapon_statistics table
ALTER TABLE weapon_statistics ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to view their own weapon statistics
DROP POLICY IF EXISTS "Allow authenticated users to view their weapon statistics" ON weapon_statistics;
CREATE POLICY "Allow authenticated users to view their weapon statistics"
ON weapon_statistics FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));

-- Policy to allow authenticated users to insert weapon statistics for their team members
DROP POLICY IF EXISTS "Allow authenticated users to insert weapon statistics" ON weapon_statistics;
CREATE POLICY "Allow authenticated users to insert weapon statistics"
ON weapon_statistics FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));

-- Policy to allow authenticated users to update their own weapon statistics
DROP POLICY IF EXISTS "Allow authenticated users to update their weapon statistics" ON weapon_statistics;
CREATE POLICY "Allow authenticated users to update their weapon statistics"
ON weapon_statistics FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));

-- Policy to allow authenticated users to delete their own weapon statistics
DROP POLICY IF EXISTS "Allow authenticated users to delete their own weapon statistics" ON weapon_statistics;
CREATE POLICY "Allow authenticated users to delete their own weapon statistics"
ON weapon_statistics FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM team_members WHERE id = player_id AND user_id = auth.uid()));
