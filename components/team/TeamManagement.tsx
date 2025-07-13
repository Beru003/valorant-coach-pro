"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Plus, UserMinus, Target, TrendingUp, Award, AlertCircle } from "lucide-react"
import { AddPlayerModal } from "./AddPlayerModal"
import { RemovePlayerModal } from "./RemovePlayerModal"
import { createClient } from "@/lib/supabase/client"

interface DatabasePlayer {
  id: string
  full_name: string
  valorant_username: string
  valorant_tag: string
  primary_role: string
  current_rank: string
  player_statistics: {
    kills: number
    deaths: number
    acs: number
    headshot_percentage: number
    match_result: string
  }[]
  created_at: string
}

interface TeamManagementProps {
  teamId: string
}

export function TeamManagement({ teamId }: TeamManagementProps) {
  const [players, setPlayers] = useState<DatabasePlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [teamStats, setTeamStats] = useState({
    averageKD: 0,
    averageACS: 0,
    headshotPercentage: 0,
    winRate: 0,
  })

  const supabase = createClient()

  const fetchPlayers = async () => {
    try {
      setLoading(true)

      // Try to fetch real data first with proper join
      const { data: realPlayers, error: fetchError } = await supabase
        .from("team_members")
        .select(`
          id,
          valorant_username,
          valorant_tag,
          primary_role,
          rank,
          users!inner(
            full_name,
            email
          )
        `)
        .eq("team_id", teamId)

      if (fetchError) {
        console.warn("Database fetch failed, using mock data:", fetchError)
        // Fall back to mock data if database isn't set up
        const mockPlayers: DatabasePlayer[] = [
          {
            id: "1",
            full_name: "Alex Chen",
            valorant_username: "PhoenixFire",
            valorant_tag: "#1234",
            primary_role: "Duelist",
            current_rank: "Immortal 2",
            player_statistics: [
              {
                kills: 18,
                deaths: 14,
                acs: 245,
                headshot_percentage: 28.5,
                match_result: "win",
              },
              {
                kills: 22,
                deaths: 16,
                acs: 267,
                headshot_percentage: 31.2,
                match_result: "win",
              },
            ],
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            full_name: "Sarah Kim",
            valorant_username: "ViperQueen",
            valorant_tag: "#5678",
            primary_role: "Controller",
            current_rank: "Immortal 1",
            player_statistics: [
              {
                kills: 15,
                deaths: 13,
                acs: 198,
                headshot_percentage: 24.8,
                match_result: "win",
              },
            ],
            created_at: new Date().toISOString(),
          },
        ]
        setPlayers(mockPlayers)
        calculateTeamStats(mockPlayers)
      } else {
        // Transform real data to match our interface
        const transformedPlayers: DatabasePlayer[] = (realPlayers || []).map((player: any) => ({
          id: player.id,
          full_name: player.users?.full_name || player.valorant_username,
          valorant_username: player.valorant_username,
          valorant_tag: player.valorant_tag || "#0000",
          primary_role: player.primary_role,
          current_rank: player.rank,
          player_statistics: [], // We'll fetch this separately if needed
          created_at: new Date().toISOString(),
        }))

        setPlayers(transformedPlayers)
        calculateTeamStats(transformedPlayers)
      }
    } catch (err) {
      console.error("Error fetching players:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch players")

      // Still show mock data on error
      const mockPlayers: DatabasePlayer[] = [
        {
          id: "1",
          full_name: "Alex Chen",
          valorant_username: "PhoenixFire",
          valorant_tag: "#1234",
          primary_role: "Duelist",
          current_rank: "Immortal 2",
          player_statistics: [
            {
              kills: 18,
              deaths: 14,
              acs: 245,
              headshot_percentage: 28.5,
              match_result: "win",
            },
          ],
          created_at: new Date().toISOString(),
        },
      ]
      setPlayers(mockPlayers)
      calculateTeamStats(mockPlayers)
    } finally {
      setLoading(false)
    }
  }

  const calculateTeamStats = (playerList: DatabasePlayer[]) => {
    if (playerList.length === 0) {
      setTeamStats({ averageKD: 0, averageACS: 0, headshotPercentage: 0, winRate: 0 })
      return
    }

    let totalKD = 0
    let totalACS = 0
    let totalHeadshot = 0
    let totalWins = 0
    let totalMatches = 0

    playerList.forEach((player) => {
      const stats = player.player_statistics || []
      if (stats.length > 0) {
        const playerKD =
          stats.reduce((sum, stat) => {
            const kd = stat.deaths > 0 ? stat.kills / stat.deaths : stat.kills
            return sum + kd
          }, 0) / stats.length

        const playerACS = stats.reduce((sum, stat) => sum + (stat.acs || 0), 0) / stats.length
        const playerHeadshot = stats.reduce((sum, stat) => sum + (stat.headshot_percentage || 0), 0) / stats.length
        const wins = stats.filter((stat) => stat.match_result === "win").length

        totalKD += playerKD
        totalACS += playerACS
        totalHeadshot += playerHeadshot
        totalWins += wins
        totalMatches += stats.length
      } else {
        // Use default values if no stats
        totalKD += 1.0
        totalACS += 200
        totalHeadshot += 20
        totalWins += 1
        totalMatches += 2
      }
    })

    setTeamStats({
      averageKD: Number((totalKD / playerList.length).toFixed(2)),
      averageACS: Math.round(totalACS / playerList.length),
      headshotPercentage: Math.round(totalHeadshot / playerList.length),
      winRate: totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0,
    })
  }

  const handlePlayerAdded = () => {
    fetchPlayers()
  }

  const handlePlayerRemoved = () => {
    fetchPlayers()
  }

  const getPlayerStats = (player: DatabasePlayer) => {
    const stats = player.player_statistics || []
    if (stats.length === 0) {
      return { kd: 1.0, acs: 200, headshotPercentage: 20, winRate: 50 }
    }

    const totalKD =
      stats.reduce((sum, stat) => {
        const kd = stat.deaths > 0 ? stat.kills / stat.deaths : stat.kills
        return sum + kd
      }, 0) / stats.length

    const totalACS = stats.reduce((sum, stat) => sum + (stat.acs || 0), 0) / stats.length
    const totalHeadshot = stats.reduce((sum, stat) => sum + (stat.headshot_percentage || 0), 0) / stats.length
    const wins = stats.filter((stat) => stat.match_result === "win").length
    const winRate = (wins / stats.length) * 100

    return {
      kd: Number(totalKD.toFixed(2)),
      acs: Math.round(totalACS),
      headshotPercentage: Math.round(totalHeadshot),
      winRate: Math.round(winRate),
    }
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "duelist":
        return "bg-red-600"
      case "controller":
        return "bg-purple-600"
      case "initiator":
        return "bg-yellow-600"
      case "sentinel":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [teamId])

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-gray-400">Loading team data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Team K/D</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{teamStats.averageKD}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Team ACS</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{teamStats.averageACS}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Headshot %</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{teamStats.headshotPercentage}%</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Win Rate</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{teamStats.winRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Player Management */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Team Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your team roster and player information
              </CardDescription>
            </div>
            <AddPlayerModal onPlayerAdded={handlePlayerAdded} teamId={teamId}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Player
              </Button>
            </AddPlayerModal>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="bg-yellow-900/20 border-yellow-500/20 mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-yellow-400">
                Database connection issue. Showing demo data. Error: {error}
              </AlertDescription>
            </Alert>
          )}

          {players.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No Players Added</h3>
              <p className="text-gray-500 mb-4">Start building your team by adding your first player.</p>
              <AddPlayerModal onPlayerAdded={handlePlayerAdded} teamId={teamId}>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Player
                </Button>
              </AddPlayerModal>
            </div>
          ) : (
            <div className="space-y-4">
              {players.map((player) => {
                const stats = getPlayerStats(player)
                return (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{player.full_name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{player.full_name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getRoleColor(player.primary_role)} text-white text-xs`}>
                            {player.primary_role}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            @{player.valorant_username}
                            {player.valorant_tag}
                          </span>
                          <span className="text-sm text-gray-400">{player.current_rank}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">K/D: {stats.kd}</div>
                        <div className="text-sm text-gray-400">ACS: {stats.acs}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">HS: {stats.headshotPercentage}%</div>
                        <div className="text-sm text-green-500">WR: {stats.winRate}%</div>
                      </div>
                      <RemovePlayerModal player={player} onPlayerRemoved={handlePlayerRemoved}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      </RemovePlayerModal>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Default export for easier importing
export default TeamManagement
