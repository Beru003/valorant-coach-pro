"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, TrendingUp, Award } from "lucide-react"
import { useTeamStats } from "@/hooks/useTeamStats"
import type { Player } from "@/types" // Import the common Player type

interface StatsOverviewProps {
  players: Player[] // Accept players as a prop
}

export function StatsOverview({ players }: StatsOverviewProps) {
  const teamStats = useTeamStats("default-team", players) // Pass players to the hook

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Team Win Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">{teamStats.winRate}%</div>
          <p className="text-xs text-gray-500">Based on recent matches</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Active Players</CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">{teamStats.totalPlayers}</div>
          <p className="text-xs text-gray-500">Current roster size</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Avg K/D Ratio</CardTitle>
          <Target className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-500">{teamStats.averageKD}</div>
          <p className="text-xs text-gray-500">Team average</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Avg ACS</CardTitle>
          <Award className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-500">{teamStats.averageACS}</div>
          <p className="text-xs text-gray-500">Team average combat score</p>
        </CardContent>
      </Card>
    </div>
  )
}
