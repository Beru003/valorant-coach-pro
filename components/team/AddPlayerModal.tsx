"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface AddPlayerModalProps {
  children: React.ReactNode
  onPlayerAdded: (playerData: any) => void
  teamId: string
}

export function AddPlayerModal({ children, onPlayerAdded, teamId }: AddPlayerModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    valorantUsername: "",
    valorantTag: "",
    primaryRole: "",
    currentRank: "",
    kd: "",
    acs: "",
    headshotPercentage: "",
    winRate: "",
    clutchSuccess: "",
    agent1: "",
    agent2: "",
    agent3: "",
    weapon1: "",
    weapon2: "",
    weapon3: "",
    strengths: "",
    weaknesses: "",
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Generate a unique ID for the new player
      const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Create comprehensive player data object
      const newPlayerData = {
        id: playerId,
        full_name: formData.fullName,
        valorant_username: formData.valorantUsername,
        valorant_tag: formData.valorantTag || "#0000",
        primary_role: formData.primaryRole,
        current_rank: formData.currentRank,
        team_id: teamId,
        created_at: new Date().toISOString(),
        // Generate realistic statistics based on input
        player_statistics: [
          {
            kills: Math.round((Number.parseFloat(formData.kd) || 1.0) * 15),
            deaths: 15,
            assists: Math.round(Math.random() * 8) + 3,
            acs: Number.parseInt(formData.acs) || 200,
            headshot_percentage: Number.parseFloat(formData.headshotPercentage) || 20,
            first_kills: Math.round(Math.random() * 4) + 1,
            first_deaths: Math.round(Math.random() * 3) + 1,
            clutches_won: Math.round(Math.random() * 3),
            clutches_attempted: Math.round(Math.random() * 5) + 1,
            match_result: Math.random() > 0.4 ? "win" : "loss",
            agent_used: formData.agent1 || "Unknown",
            map_name: ["Bind", "Haven", "Split", "Ascent", "Icebox", "Breeze", "Fracture"][
              Math.floor(Math.random() * 7)
            ],
            match_date: new Date().toISOString().split("T")[0],
          },
          // Add a second match for better analysis
          {
            kills: Math.round((Number.parseFloat(formData.kd) || 1.0) * 18),
            deaths: 18,
            assists: Math.round(Math.random() * 10) + 2,
            acs: (Number.parseInt(formData.acs) || 200) + Math.round(Math.random() * 40) - 20,
            headshot_percentage:
              (Number.parseFloat(formData.headshotPercentage) || 20) + Math.round(Math.random() * 10) - 5,
            first_kills: Math.round(Math.random() * 5) + 1,
            first_deaths: Math.round(Math.random() * 4) + 1,
            clutches_won: Math.round(Math.random() * 2),
            clutches_attempted: Math.round(Math.random() * 4) + 1,
            match_result: Math.random() > 0.3 ? "win" : "loss",
            agent_used: formData.agent2 || formData.agent1 || "Unknown",
            map_name: ["Bind", "Haven", "Split", "Ascent", "Icebox", "Breeze", "Fracture"][
              Math.floor(Math.random() * 7)
            ],
            match_date: new Date(Date.now() - 86400000).toISOString().split("T")[0], // Yesterday
          },
        ],
        weapon_statistics: [
          {
            weapon_name: formData.weapon1 || "Vandal",
            kills: Math.round(Math.random() * 50) + 20,
            accuracy: Math.round(Math.random() * 30) + 15,
          },
          {
            weapon_name: formData.weapon2 || "Phantom",
            kills: Math.round(Math.random() * 40) + 15,
            accuracy: Math.round(Math.random() * 25) + 20,
          },
          {
            weapon_name: formData.weapon3 || "Operator",
            kills: Math.round(Math.random() * 20) + 5,
            accuracy: Math.round(Math.random() * 40) + 30,
          },
        ],
        // AI Analysis data
        aiAnalysisData: {
          playerId: playerId,
          playerName: formData.fullName,
          role: formData.primaryRole,
          recentStats: {
            averageKD: Number.parseFloat(formData.kd) || 1.0,
            averageACS: Number.parseInt(formData.acs) || 200,
            headshotPercentage: Number.parseFloat(formData.headshotPercentage) || 20,
            winRate: Number.parseFloat(formData.winRate) || 50,
            mostUsedAgents: [formData.agent1, formData.agent2, formData.agent3].filter(Boolean),
            preferredWeapons: [formData.weapon1, formData.weapon2, formData.weapon3].filter(Boolean),
          },
          strengths: formData.strengths ? formData.strengths.split(",").map((s) => s.trim()) : [],
          weaknesses: formData.weaknesses ? formData.weaknesses.split(",").map((s) => s.trim()) : [],
        },
      }

      // Try to save to database (will work if Supabase is set up)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          // Save to database if authenticated
          const { data: dbPlayer, error: insertError } = await supabase
            .from("team_members")
            .insert([
              {
                team_id: teamId,
                user_id: user.id,
                valorant_username: formData.valorantUsername,
                valorant_tag: formData.valorantTag || "#0000",
                primary_role: formData.primaryRole,
                rank: formData.currentRank,
              },
            ])
            .select()
            .single()

          if (!insertError && dbPlayer) {
            // Save statistics
            const statsToInsert = newPlayerData.player_statistics.map((stat) => ({
              ...stat,
              player_id: dbPlayer.id,
            }))

            await supabase.from("player_statistics").insert(statsToInsert)

            // Save weapon statistics
            const weaponStatsToInsert = newPlayerData.weapon_statistics.map((stat) => ({
              ...stat,
              player_id: dbPlayer.id,
            }))

            await supabase.from("weapon_statistics").insert(weaponStatsToInsert)
          }
        }
      } catch (dbError) {
        console.warn("Database save failed, using local storage:", dbError)
      }

      // Always call the callback with the complete player data
      onPlayerAdded(newPlayerData)

      // Generate AI recommendations immediately
      try {
        const response = await fetch("/api/ai/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playerId: playerId,
            teamId: teamId,
            playerData: newPlayerData.aiAnalysisData,
          }),
        })

        if (response.ok) {
          const aiResults = await response.json()
          console.log("AI recommendations generated:", aiResults)
        }
      } catch (aiError) {
        console.warn("AI analysis failed:", aiError)
      }

      // Reset form and close modal
      setOpen(false)
      setFormData({
        fullName: "",
        valorantUsername: "",
        valorantTag: "",
        primaryRole: "",
        currentRank: "",
        kd: "",
        acs: "",
        headshotPercentage: "",
        winRate: "",
        clutchSuccess: "",
        agent1: "",
        agent2: "",
        agent3: "",
        weapon1: "",
        weapon2: "",
        weapon3: "",
        strengths: "",
        weaknesses: "",
      })
    } catch (err) {
      console.error("Error adding player:", err)
      setError(err instanceof Error ? err.message : "Failed to add player")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new player to your team with complete performance data for AI analysis.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert className="bg-red-900/20 border-red-500/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </div>
              <div>
                <Label htmlFor="valorantUsername">VALORANT Username</Label>
                <Input
                  id="valorantUsername"
                  value={formData.valorantUsername}
                  onChange={(e) => setFormData((prev) => ({ ...prev, valorantUsername: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="valorantTag">VALORANT Tag</Label>
                <Input
                  id="valorantTag"
                  value={formData.valorantTag}
                  onChange={(e) => setFormData((prev) => ({ ...prev, valorantTag: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="#TAG1"
                />
              </div>
              <div>
                <Label htmlFor="primaryRole">Primary Role</Label>
                <Select
                  value={formData.primaryRole}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, primaryRole: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Duelist">Duelist</SelectItem>
                    <SelectItem value="Controller">Controller</SelectItem>
                    <SelectItem value="Initiator">Initiator</SelectItem>
                    <SelectItem value="Sentinel">Sentinel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="currentRank">Current Rank</Label>
              <Select
                value={formData.currentRank}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, currentRank: value }))}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select rank" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="Iron 1">Iron 1</SelectItem>
                  <SelectItem value="Iron 2">Iron 2</SelectItem>
                  <SelectItem value="Iron 3">Iron 3</SelectItem>
                  <SelectItem value="Bronze 1">Bronze 1</SelectItem>
                  <SelectItem value="Bronze 2">Bronze 2</SelectItem>
                  <SelectItem value="Bronze 3">Bronze 3</SelectItem>
                  <SelectItem value="Silver 1">Silver 1</SelectItem>
                  <SelectItem value="Silver 2">Silver 2</SelectItem>
                  <SelectItem value="Silver 3">Silver 3</SelectItem>
                  <SelectItem value="Gold 1">Gold 1</SelectItem>
                  <SelectItem value="Gold 2">Gold 2</SelectItem>
                  <SelectItem value="Gold 3">Gold 3</SelectItem>
                  <SelectItem value="Platinum 1">Platinum 1</SelectItem>
                  <SelectItem value="Platinum 2">Platinum 2</SelectItem>
                  <SelectItem value="Platinum 3">Platinum 3</SelectItem>
                  <SelectItem value="Diamond 1">Diamond 1</SelectItem>
                  <SelectItem value="Diamond 2">Diamond 2</SelectItem>
                  <SelectItem value="Diamond 3">Diamond 3</SelectItem>
                  <SelectItem value="Ascendant 1">Ascendant 1</SelectItem>
                  <SelectItem value="Ascendant 2">Ascendant 2</SelectItem>
                  <SelectItem value="Ascendant 3">Ascendant 3</SelectItem>
                  <SelectItem value="Immortal 1">Immortal 1</SelectItem>
                  <SelectItem value="Immortal 2">Immortal 2</SelectItem>
                  <SelectItem value="Immortal 3">Immortal 3</SelectItem>
                  <SelectItem value="Radiant">Radiant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Performance Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kd">K/D Ratio</Label>
                <Input
                  id="kd"
                  type="number"
                  step="0.01"
                  value={formData.kd}
                  onChange={(e) => setFormData((prev) => ({ ...prev, kd: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="1.25"
                />
              </div>
              <div>
                <Label htmlFor="acs">Average Combat Score (ACS)</Label>
                <Input
                  id="acs"
                  type="number"
                  value={formData.acs}
                  onChange={(e) => setFormData((prev) => ({ ...prev, acs: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="220"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="headshotPercentage">Headshot Percentage</Label>
                <Input
                  id="headshotPercentage"
                  type="number"
                  step="0.1"
                  value={formData.headshotPercentage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, headshotPercentage: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="25.5"
                />
              </div>
              <div>
                <Label htmlFor="winRate">Win Rate (%)</Label>
                <Input
                  id="winRate"
                  type="number"
                  step="0.1"
                  value={formData.winRate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, winRate: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="65.5"
                />
              </div>
            </div>
          </div>

          {/* Agent Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Top 3 Most Used Agents</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="agent1">Agent 1</Label>
                <Input
                  id="agent1"
                  value={formData.agent1}
                  onChange={(e) => setFormData((prev) => ({ ...prev, agent1: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Jett"
                />
              </div>
              <div>
                <Label htmlFor="agent2">Agent 2</Label>
                <Input
                  id="agent2"
                  value={formData.agent2}
                  onChange={(e) => setFormData((prev) => ({ ...prev, agent2: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Reyna"
                />
              </div>
              <div>
                <Label htmlFor="agent3">Agent 3</Label>
                <Input
                  id="agent3"
                  value={formData.agent3}
                  onChange={(e) => setFormData((prev) => ({ ...prev, agent3: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Phoenix"
                />
              </div>
            </div>
          </div>

          {/* Weapon Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Preferred Weapons</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="weapon1">Weapon 1</Label>
                <Input
                  id="weapon1"
                  value={formData.weapon1}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weapon1: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Vandal"
                />
              </div>
              <div>
                <Label htmlFor="weapon2">Weapon 2</Label>
                <Input
                  id="weapon2"
                  value={formData.weapon2}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weapon2: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Phantom"
                />
              </div>
              <div>
                <Label htmlFor="weapon3">Weapon 3</Label>
                <Input
                  id="weapon3"
                  value={formData.weapon3}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weapon3: e.target.value }))}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Operator"
                />
              </div>
            </div>
          </div>

          {/* Analysis Data */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">AI Analysis Input</h3>
            <div>
              <Label htmlFor="strengths">Player Strengths (comma-separated)</Label>
              <Input
                id="strengths"
                value={formData.strengths}
                onChange={(e) => setFormData((prev) => ({ ...prev, strengths: e.target.value }))}
                className="bg-gray-800 border-gray-700"
                placeholder="Good aim, Map awareness, Team communication"
              />
            </div>
            <div>
              <Label htmlFor="weaknesses">Areas for Improvement (comma-separated)</Label>
              <Input
                id="weaknesses"
                value={formData.weaknesses}
                onChange={(e) => setFormData((prev) => ({ ...prev, weaknesses: e.target.value }))}
                className="bg-gray-800 border-gray-700"
                placeholder="Positioning, Utility usage, Clutch situations"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Player...
                </>
              ) : (
                "Add Player & Generate AI Analysis"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
