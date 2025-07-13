"use client"

import { useMemo } from "react"
import { TEAM_ROSTER, PERFORMANCE_DATA } from "@/lib/constants"

export function useTeamStats() {
  const teamStats = useMemo(() => {
    const totalPlayers = TEAM_ROSTER.length
    const averageWinRate = Math.round(TEAM_ROSTER.reduce((sum, player) => sum + player.winRate, 0) / totalPlayers)
    const averageKD = Number((TEAM_ROSTER.reduce((sum, player) => sum + player.stats.kd, 0) / totalPlayers).toFixed(2))
    const averageACS = Math.round(TEAM_ROSTER.reduce((sum, player) => sum + player.stats.acs, 0) / totalPlayers)

    const recentPerformance = PERFORMANCE_DATA.slice(-5)
    const performanceTrend = recentPerformance[recentPerformance.length - 1].winRate - recentPerformance[0].winRate

    return {
      totalPlayers,
      averageWinRate,
      averageKD,
      averageACS,
      performanceTrend,
      activePlayers: totalPlayers, // All players are currently active
    }
  }, [])

  return teamStats
}
