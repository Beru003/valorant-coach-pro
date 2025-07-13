export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          full_name: string | null
          avatar_url: string | null
          role: "coach" | "player" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "coach" | "player" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "coach" | "player" | "admin"
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          description: string | null
          coach_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          coach_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          coach_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          valorant_username: string
          valorant_tag: string
          primary_role: "Duelist" | "Initiator" | "Controller" | "Sentinel"
          rank: string
          joined_at: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          valorant_username: string
          valorant_tag: string
          primary_role: "Duelist" | "Initiator" | "Controller" | "Sentinel"
          rank: string
          joined_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
          valorant_username?: string
          valorant_tag?: string
          primary_role?: "Duelist" | "Initiator" | "Controller" | "Sentinel"
          rank?: string
          joined_at?: string
        }
      }
      player_statistics: {
        Row: {
          id: string
          player_id: string
          match_date: string
          map_name: string
          agent_used: string
          kills: number
          deaths: number
          assists: number
          acs: number
          headshot_percentage: number
          first_kills: number
          first_deaths: number
          clutches_won: number
          clutches_attempted: number
          match_result: "win" | "loss" | "draw"
          created_at: string
        }
        Insert: {
          id?: string
          player_id: string
          match_date: string
          map_name: string
          agent_used: string
          kills: number
          deaths: number
          assists: number
          acs: number
          headshot_percentage: number
          first_kills: number
          first_deaths: number
          clutches_won: number
          clutches_attempted: number
          match_result: "win" | "loss" | "draw"
          created_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          match_date?: string
          map_name?: string
          agent_used?: string
          kills?: number
          deaths?: number
          assists?: number
          acs?: number
          headshot_percentage?: number
          first_kills?: number
          first_deaths?: number
          clutches_won?: number
          clutches_attempted?: number
          match_result?: "win" | "loss" | "draw"
          created_at?: string
        }
      }
      weapon_statistics: {
        Row: {
          id: string
          player_id: string
          weapon_name: string
          kills: number
          shots_fired: number
          shots_hit: number
          headshots: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          player_id: string
          weapon_name: string
          kills: number
          shots_fired: number
          shots_hit: number
          headshots: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          player_id?: string
          weapon_name?: string
          kills?: number
          shots_fired?: number
          shots_hit?: number
          headshots?: number
          created_at?: string
          updated_at?: string
        }
      }
      ai_training_recommendations: {
        Row: {
          id: string
          team_id: string
          player_id: string | null
          recommendation_type: "individual" | "team"
          title: string
          description: string
          priority: "high" | "medium" | "low"
          category: "aim" | "strategy" | "utility" | "positioning" | "communication"
          tags: string[]
          estimated_time: number
          ai_analysis: Json
          created_at: string
          is_completed: boolean
        }
        Insert: {
          id?: string
          team_id: string
          player_id?: string | null
          recommendation_type: "individual" | "team"
          title: string
          description: string
          priority: "high" | "medium" | "low"
          category: "aim" | "strategy" | "utility" | "positioning" | "communication"
          tags: string[]
          estimated_time: number
          ai_analysis: Json
          created_at?: string
          is_completed?: boolean
        }
        Update: {
          id?: string
          team_id?: string
          player_id?: string | null
          recommendation_type?: "individual" | "team"
          title?: string
          description?: string
          priority?: "high" | "medium" | "low"
          category?: "aim" | "strategy" | "utility" | "positioning" | "communication"
          tags?: string[]
          estimated_time?: number
          ai_analysis?: Json
          created_at?: string
          is_completed?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
