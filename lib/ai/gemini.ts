import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables")
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)

export interface PlayerAnalysisData {
  playerId: string
  playerName: string
  role: string
  recentStats: {
    averageKD: number
    averageACS: number
    headshotPercentage: number
    winRate: number
    mostUsedAgents: string[]
    preferredWeapons: string[]
  }
  weaknesses: string[]
  strengths: string[]
}

export interface TeamAnalysisData {
  teamId?: string
  teamName: string
  players: PlayerAnalysisData[]
  teamStats: {
    averageWinRate: number
    mapPerformance: Record<string, number>
    roleDistribution: Record<string, number>
  }
}

export interface AIRecommendation {
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: "aim" | "strategy" | "utility" | "positioning" | "communication"
  tags: string[]
  estimatedTime: number
  specificDrills: string[]
}

export interface AIResponse {
  recommendations: AIRecommendation[]
  analysis: string
}

export class GeminiAIService {
  private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  async generatePlayerTrainingRecommendations(playerData: PlayerAnalysisData): Promise<AIResponse> {
    const prompt = `
    As a professional VALORANT coach AI, analyze this player's performance data and provide personalized training recommendations:

    Player: ${playerData.playerName}
    Role: ${playerData.role}
    
    Recent Performance:
    - K/D Ratio: ${playerData.recentStats.averageKD}
    - Average Combat Score: ${playerData.recentStats.averageACS}
    - Headshot %: ${playerData.recentStats.headshotPercentage}%
    - Win Rate: ${playerData.recentStats.winRate}%
    - Most Used Agents: ${playerData.recentStats.mostUsedAgents.join(", ")}
    - Preferred Weapons: ${playerData.recentStats.preferredWeapons.join(", ")}
    
    Identified Strengths: ${playerData.strengths.join(", ")}
    Identified Weaknesses: ${playerData.weaknesses.join(", ")}

    Please provide:
    1. 3-5 specific training recommendations with priorities
    2. Detailed analysis of the player's performance
    3. Role-specific improvement areas
    4. Specific drills and exercises

    Format your response as JSON with the following structure:
    {
      "recommendations": [
        {
          "title": "Training Title",
          "description": "Detailed description",
          "priority": "high|medium|low",
          "category": "aim|strategy|utility|positioning|communication",
          "tags": ["tag1", "tag2"],
          "estimatedTime": 45,
          "specificDrills": ["drill1", "drill2"]
        }
      ],
      "analysis": "Comprehensive analysis text"
    }
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as AIResponse
      }

      throw new Error("Invalid JSON response from AI")
    } catch (error) {
      console.error("Error generating AI recommendations:", error)
      throw new Error("Failed to generate training recommendations")
    }
  }

  async generateComprehensiveTeamTrainingPlan(teamData: TeamAnalysisData): Promise<{
    recommendations: Array<AIRecommendation & { targetPlayers?: string[] }>
    analysis: string
    teamFocus: string
    strategicInsights: string
  }> {
    const prompt = `
    As a professional VALORANT team analyst and coach, create a comprehensive training plan for this team:

    Team: ${teamData.teamName}
    Overall Win Rate: ${teamData.teamStats.averageWinRate}%
    
    Players Analysis:
    ${teamData.players
      .map(
        (p) => `
    - ${p.playerName} (${p.role}): 
      * K/D: ${p.recentStats.averageKD}, ACS: ${p.recentStats.averageACS}, Win Rate: ${p.recentStats.winRate}%
      * Agents: ${p.recentStats.mostUsedAgents.join(", ")}
      * Strengths: ${p.strengths.join(", ")}
      * Weaknesses: ${p.weaknesses.join(", ")}
    `,
      )
      .join("")}
    
    Map Performance:
    ${Object.entries(teamData.teamStats.mapPerformance)
      .map(([map, winRate]) => `- ${map}: ${winRate}% win rate`)
      .join("\n")}

    Role Distribution: ${Object.entries(teamData.teamStats.roleDistribution)
      .map(([role, count]) => `${role}: ${count}`)
      .join(", ")}

    Create a detailed training plan that includes:
    1. 5-8 specific training recommendations prioritized by impact
    2. Individual player focus areas
    3. Team coordination improvements
    4. Map-specific strategies
    5. Role synergy optimization
    6. Specific drills and practice routines

    Focus on actionable, measurable improvements that address the team's weaknesses while building on their strengths.

    Format as JSON:
    {
      "recommendations": [
        {
          "title": "Training Title",
          "description": "Detailed description of what needs to be improved and why",
          "priority": "high|medium|low",
          "category": "aim|strategy|utility|positioning|communication",
          "tags": ["specific", "actionable", "tags"],
          "estimatedTime": 60,
          "specificDrills": ["Detailed drill 1", "Detailed drill 2", "Detailed drill 3"],
          "targetPlayers": ["Player names if specific to certain players"]
        }
      ],
      "analysis": "Comprehensive team analysis covering strengths, weaknesses, and improvement opportunities",
      "teamFocus": "Primary focus areas for the team based on current performance",
      "strategicInsights": "Strategic recommendations for team composition and playstyle"
    }
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      throw new Error("Invalid JSON response from AI")
    } catch (error) {
      console.error("Error generating team training plan:", error)
      throw new Error("Failed to generate team training plan")
    }
  }

  async generateTeamAnalysis(teamData: TeamAnalysisData): Promise<{
    teamRecommendations: Array<{
      title: string
      description: string
      priority: "high" | "medium" | "low"
      category: "strategy" | "communication" | "coordination"
      affectedPlayers: string[]
      estimatedTime: number
    }>
    strategicInsights: string
    roleBalance: string
  }> {
    const prompt = `
    As a professional VALORANT team analyst, analyze this team's composition and performance:

    Team: ${teamData.teamName}
    Overall Win Rate: ${teamData.teamStats.averageWinRate}%
    
    Players:
    ${teamData.players
      .map(
        (p) => `
    - ${p.playerName} (${p.role}): K/D ${p.recentStats.averageKD}, ACS ${p.recentStats.averageACS}, Win Rate ${p.recentStats.winRate}%
    `,
      )
      .join("")}
    
    Map Performance:
    ${Object.entries(teamData.teamStats.mapPerformance)
      .map(([map, winRate]) => `- ${map}: ${winRate}%`)
      .join("\n")}

    Provide team-level analysis and recommendations focusing on:
    1. Team coordination improvements
    2. Strategic adjustments
    3. Role synergy optimization
    4. Communication enhancement

    Format as JSON:
    {
      "teamRecommendations": [...],
      "strategicInsights": "Team analysis",
      "roleBalance": "Role distribution analysis"
    }
    `

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      throw new Error("Invalid JSON response from AI")
    } catch (error) {
      console.error("Error generating team analysis:", error)
      throw new Error("Failed to generate team analysis")
    }
  }
}

export const geminiAI = new GeminiAIService()
