"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface Player {
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
}

interface TeamRosterProps {
  players: Player[]
}

export function TeamRoster({ players }: TeamRosterProps) {
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

  const getPlayerStats = (player: Player) => {
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

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Team Roster
        </CardTitle>
        <CardDescription className="text-gray-400">Current team members and their performance</CardDescription>
      </CardHeader>
      <CardContent>
        {players.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No Players Added</h3>
            <p className="text-gray-500">Add players in the Team Management tab to see them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {players.map((player) => {
              const stats = getPlayerStats(player)
              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{player.full_name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{player.full_name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getRoleColor(player.primary_role)} text-white`}>
                          {player.primary_role}
                        </Badge>
                        <span className="text-sm text-gray-400">{player.current_rank}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-500">{stats.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
