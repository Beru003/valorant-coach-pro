"use client"

import { useState, useEffect } from "react"
import type { Player } from "@/types" // Import the common Player type

interface TeamStats {
  totalPlayers: number
  averageKD: number
  averageACS: number
  averageHeadshotPercentage: number
  winRate: number
  roleDistribution: Record<string, number>
  agentUsage: Array<{
    agent: string
    usage: number
    role: string
    color: string
    winRate: number
  }>
  weaponData: Array<{
    weapon: string
    kills: number
    preference: number
    accuracy: number
  }>
  performanceData: Array<{
    match: number
    date: string
    kd: number
    acs: number
    winRate: number
    map: string
  }>
}

export function useTeamStats(teamId: string, playersProp?: Player[]) {
  // Renamed to playersProp to avoid conflict
  const [teamStats, setTeamStats] = useState<TeamStats>({
    totalPlayers: 0,
    averageKD: 0,
    averageACS: 0,
    averageHeadshotPercentage: 0,
    winRate: 0,
    roleDistribution: {},
    agentUsage: [],
    weaponData: [],
    performanceData: [],
  })

  const calculateStats = (playerList: Player[]) => {
    if (playerList.length === 0) {
      setTeamStats({
        totalPlayers: 0,
        averageKD: 0,
        averageACS: 0,
        averageHeadshotPercentage: 0,
        winRate: 0,
        roleDistribution: {},
        agentUsage: [],
        weaponData: [],
        performanceData: [],
      })
      return
    }

    // Calculate basic stats
    let totalKD = 0
    let totalACS = 0
    let totalHeadshot = 0
    let totalWins = 0
    let totalMatches = 0
    const roleDistribution: Record<string, number> = {}
    const agentUsageMap: Record<string, { count: number; wins: number; role: string }> = {}
    const weaponUsageMap: Record<string, { kills: number; accuracy: number; count: number }> = {}

    playerList.forEach((player) => {
      // Role distribution
      roleDistribution[player.primary_role] = (roleDistribution[player.primary_role] || 0) + 1

      const stats = player.player_statistics || []
      if (stats.length > 0) {
        // Player performance stats
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

        // Agent usage tracking
        stats.forEach((stat) => {
          if (stat.agent_used) {
            if (!agentUsageMap[stat.agent_used]) {
              agentUsageMap[stat.agent_used] = { count: 0, wins: 0, role: player.primary_role }
            }
            agentUsageMap[stat.agent_used].count++
            if (stat.match_result === "win") {
              agentUsageMap[stat.agent_used].wins++
            }
          }
        })
      } else {
        // Default values if no stats
        totalKD += 1.0
        totalACS += 200
        totalHeadshot += 20
        totalWins += 1
        totalMatches += 2
      }

      // Weapon statistics
      const weaponStats = player.weapon_statistics || []
      weaponStats.forEach((weapon) => {
        if (!weaponUsageMap[weapon.weapon_name]) {
          weaponUsageMap[weapon.weapon_name] = { kills: 0, accuracy: 0, count: 0 }
        }
        weaponUsageMap[weapon.weapon_name].kills += weapon.kills
        weaponUsageMap[weapon.weapon_name].accuracy += weapon.accuracy
        weaponUsageMap[weapon.weapon_name].count++
      })
    })

    // Convert agent usage to array format
    const agentUsage = Object.entries(agentUsageMap)
      .map(([agent, data]) => ({
        agent,
        usage: Math.round((data.count / Math.max(totalMatches, 1)) * 100),
        role: data.role,
        color: getRoleColor(data.role),
        winRate: data.count > 0 ? Math.round((data.wins / data.count) * 100) : 0,
      }))
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 8)

    // Convert weapon usage to array format
    const weaponData = Object.entries(weaponUsageMap)
      .map(([weapon, data]) => ({
        weapon,
        kills: data.kills,
        preference: Math.round((data.count / playerList.length) * 100),
        accuracy: data.count > 0 ? Math.round(data.accuracy / data.count) : 0,
      }))
      .sort((a, b) => b.kills - a.kills)
      .slice(0, 6)

    // Generate performance trend data (mock data based on current stats)
    const performanceData = Array.from({ length: 10 }, (_, i) => ({
      match: i + 1,
      date: new Date(Date.now() - (9 - i) * 86400000).toISOString().split("T")[0],
      kd: Number((totalKD / playerList.length + (Math.random() - 0.5) * 0.4).toFixed(2)),
      acs: Math.round(totalACS / playerList.length + (Math.random() - 0.5) * 40),
      winRate: Math.max(
        0,
        Math.min(100, Math.round((totalWins / Math.max(totalMatches, 1)) * 100 + (Math.random() - 0.5) * 20)),
      ),
      map: ["Bind", "Haven", "Split", "Ascent", "Icebox", "Breeze", "Fracture"][Math.floor(Math.random() * 7)],
    }))

    setTeamStats({
      totalPlayers: playerList.length,
      averageKD: Number((totalKD / playerList.length).toFixed(2)),
      averageACS: Math.round(totalACS / playerList.length),
      averageHeadshotPercentage: Math.round(totalHeadshot / playerList.length),
      winRate: totalMatches > 0 ? Math.round((totalWins / totalMatches) * 100) : 0,
      roleDistribution,
      agentUsage,
      weaponData,
      performanceData,
    })
  }

  const getRoleColor = (role: string): string => {
    switch (role.toLowerCase()) {
      case "duelist":
        return "#ef4444"
      case "controller":
        return "#8b5cf6"
      case "initiator":
        return "#f59e0b"
      case "sentinel":
        return "#3b82f6"
      default:
        return "#6b7280"
    }
  }

  useEffect(() => {
    if (playersProp && playersProp.length > 0) {
      // If players are provided as a prop, use them directly
      calculateStats(playersProp)
    } else {
      // Otherwise, try to load from localStorage
      const localPlayers = localStorage.getItem(`team_${teamId}_players`)
      if (localPlayers) {
        try {
          const parsedPlayers: Player[] = JSON.parse(localPlayers)
          calculateStats(parsedPlayers)
        } catch (error) {
          console.error("Error parsing local players in useTeamStats:", error)
          // Fallback to empty if local storage is corrupted
          calculateStats([])
        }
      } else {
        // If no players prop and no local storage, default to empty
        calculateStats([])
      }
    }
  }, [teamId, playersProp]) // Depend on playersProp

  return teamStats
}
