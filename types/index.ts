export interface Player {
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
    agent_used?: string
  }[]
  weapon_statistics?: {
    weapon_name: string
    kills: number
    accuracy: number
  }[]
  created_at: string
  aiAnalysisData?: any // For AI recommendations
}

export interface PlayerStats {
  kd: number
  acs: number
  headshots: number
  clutches: number
  firstKills: number
}

export interface DatabasePlayer {
  id: string
  user_id: string
  valorant_username: string
  valorant_tag: string
  primary_role: string
  current_rank: string
  joined_at: string
  users: {
    full_name: string
    email: string
    avatar_url?: string
  } | null
  player_statistics: Array<{
    kills: number
    deaths: number
    acs: number
    headshot_percentage: number
    match_result: string
    agent_used?: string
  }>
  weapon_statistics?: Array<{
    weapon_name: string
    kills: number
    accuracy: number
  }>
}

export interface AgentUsage {
  agent: string
  usage: number
  role: AgentRole
  color: string
  winRate: number
}

export interface WeaponData {
  weapon: string
  kills: number
  preference: number
  accuracy: number
}

export interface PerformanceData {
  match: number
  date: string
  kd: number
  acs: number
  winRate: number
  map: string
}

export interface TrainingRecommendation {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: TrainingCategory
  tags: string[]
  estimatedTime: number
}

export type PlayerRole = "Duelist" | "Initiator" | "Controller" | "Sentinel"
export type AgentRole = "Duelist" | "Initiator" | "Controller" | "Sentinel"
export type TrainingCategory = "aim" | "strategy" | "utility" | "positioning" | "communication"
