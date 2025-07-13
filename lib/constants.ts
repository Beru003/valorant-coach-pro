import type { AgentUsage, WeaponData, PerformanceData, Player, TrainingRecommendation } from "@/types"

export const AGENT_USAGE_DATA: AgentUsage[] = [
  { agent: "Jett", usage: 35, role: "Duelist", color: "#3b82f6", winRate: 68 },
  { agent: "Sage", usage: 28, role: "Sentinel", color: "#10b981", winRate: 72 },
  { agent: "Sova", usage: 22, role: "Initiator", color: "#f59e0b", winRate: 65 },
  { agent: "Omen", usage: 15, role: "Controller", color: "#8b5cf6", winRate: 70 },
]

export const WEAPON_DATA: WeaponData[] = [
  { weapon: "Vandal", kills: 245, preference: 42, accuracy: 23.5 },
  { weapon: "Phantom", kills: 198, preference: 35, accuracy: 21.8 },
  { weapon: "Operator", kills: 89, preference: 15, accuracy: 67.2 },
  { weapon: "Sheriff", kills: 67, preference: 8, accuracy: 45.3 },
]

export const PERFORMANCE_DATA: PerformanceData[] = [
  { match: 1, date: "2024-01-15", kd: 1.2, acs: 245, winRate: 65, map: "Ascent" },
  { match: 2, date: "2024-01-14", kd: 0.9, acs: 198, winRate: 45, map: "Bind" },
  { match: 3, date: "2024-01-13", kd: 1.8, acs: 312, winRate: 85, map: "Haven" },
  { match: 4, date: "2024-01-12", kd: 1.4, acs: 267, winRate: 75, map: "Split" },
  { match: 5, date: "2024-01-11", kd: 1.1, acs: 223, winRate: 55, map: "Icebox" },
]

export const TEAM_ROSTER: Player[] = [
  {
    id: "1",
    name: "Alex Chen",
    gamertag: "Phoenix",
    role: "Duelist",
    rank: "Immortal 2",
    winRate: 68,
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { kd: 1.34, acs: 267, headshots: 24, clutches: 8, firstKills: 45 },
  },
  {
    id: "2",
    name: "Sarah Kim",
    gamertag: "Viper",
    role: "Controller",
    rank: "Immortal 1",
    winRate: 72,
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { kd: 1.12, acs: 234, headshots: 19, clutches: 12, firstKills: 23 },
  },
  {
    id: "3",
    name: "Mike Johnson",
    gamertag: "Breach",
    role: "Initiator",
    rank: "Diamond 3",
    winRate: 65,
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { kd: 1.08, acs: 198, headshots: 16, clutches: 6, firstKills: 34 },
  },
  {
    id: "4",
    name: "Emma Davis",
    gamertag: "Killjoy",
    role: "Sentinel",
    rank: "Immortal 1",
    winRate: 70,
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { kd: 1.21, acs: 221, headshots: 22, clutches: 15, firstKills: 18 },
  },
  {
    id: "5",
    name: "Ryan Wilson",
    gamertag: "Skye",
    role: "Initiator",
    rank: "Diamond 2",
    winRate: 63,
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { kd: 0.98, acs: 187, headshots: 14, clutches: 4, firstKills: 29 },
  },
]

export const TRAINING_RECOMMENDATIONS: TrainingRecommendation[] = [
  {
    id: "1",
    title: "Aim Training Focus",
    description: "Based on recent performance data, the team should focus on crosshair placement and flick accuracy.",
    priority: "high",
    category: "aim",
    tags: ["Aim Lab", "Crosshair Placement", "Flick Training"],
    estimatedTime: 45,
  },
  {
    id: "2",
    title: "Role-Specific Training",
    description: "Duelists need entry fragging practice, while Sentinels should work on site anchoring.",
    priority: "medium",
    category: "positioning",
    tags: ["Entry Fragging", "Site Anchoring", "Utility Usage"],
    estimatedTime: 60,
  },
  {
    id: "3",
    title: "Strategic Development",
    description: "Team coordination and map control strategies need improvement based on recent match analysis.",
    priority: "high",
    category: "strategy",
    tags: ["Map Control", "Team Coordination", "Callouts"],
    estimatedTime: 90,
  },
]

export const ROLE_COLORS = {
  Duelist: "#ef4444",
  Initiator: "#f59e0b",
  Controller: "#8b5cf6",
  Sentinel: "#10b981",
} as const
