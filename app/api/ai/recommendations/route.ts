import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { geminiAI, type PlayerAnalysisData } from "@/lib/ai/gemini"
import type { DatabasePlayer } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { playerId, teamId, playerData } = await request.json()

    // If playerData is provided directly (from add player form), use it
    if (playerData) {
      const aiResponse = await geminiAI.generatePlayerTrainingRecommendations(playerData)

      // Save recommendations to database
      const recommendationsToSave = aiResponse.recommendations.map((rec) => ({
        team_id: teamId,
        player_id: playerId,
        recommendation_type: "individual" as const,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
        category: rec.category,
        tags: rec.tags || [],
        estimated_time: rec.estimatedTime || 30,
        ai_analysis: {
          analysis: aiResponse.analysis,
          specificDrills: rec.specificDrills || [],
        },
      }))

      const { data: savedRecommendations, error: saveError } = await supabase
        .from("ai_training_recommendations")
        .insert(recommendationsToSave)
        .select()

      if (saveError) {
        console.error("Error saving recommendations:", saveError)
        return NextResponse.json({ error: "Failed to save recommendations" }, { status: 500 })
      }

      return NextResponse.json({
        recommendations: savedRecommendations,
        analysis: aiResponse.analysis,
      })
    }

    // Otherwise, fetch player data from database
    const { data: playerDbData, error: playerError } = await supabase
      .from("team_members")
      .select(`
        *,
        users(full_name, username),
        player_statistics(*),
        weapon_statistics(*)
      `)
      .eq("id", playerId)
      .single()

    if (playerError || !playerDbData) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    const typedPlayerData = playerDbData as DatabasePlayer

    // Calculate player statistics
    const stats = typedPlayerData.player_statistics || []
    const recentStats = {
      averageKD:
        stats.length > 0
          ? stats.reduce((sum, stat) => sum + stat.kills / Math.max(stat.deaths, 1), 0) / stats.length
          : 0,
      averageACS: stats.length > 0 ? stats.reduce((sum, stat) => sum + stat.acs, 0) / stats.length : 0,
      headshotPercentage:
        stats.length > 0 ? stats.reduce((sum, stat) => sum + stat.headshot_percentage, 0) / stats.length : 0,
      winRate: stats.length > 0 ? (stats.filter((stat) => stat.match_result === "win").length / stats.length) * 100 : 0,
      mostUsedAgents: stats
        .map((stat) => stat.agent_used)
        .filter((agent): agent is string => Boolean(agent))
        .slice(0, 3),
      preferredWeapons: (typedPlayerData.weapon_statistics || [])
        .map((ws) => ws.weapon_name)
        .filter((weapon): weapon is string => Boolean(weapon)),
    }

    const analysisData: PlayerAnalysisData = {
      playerId: typedPlayerData.id,
      playerName: typedPlayerData.users?.full_name || typedPlayerData.valorant_username,
      role: typedPlayerData.primary_role,
      recentStats,
      weaknesses: [], // You can implement weakness detection logic
      strengths: [], // You can implement strength detection logic
    }

    // Generate AI recommendations
    const aiResponse = await geminiAI.generatePlayerTrainingRecommendations(analysisData)

    // Save recommendations to database
    const recommendationsToSave = aiResponse.recommendations.map((rec) => ({
      team_id: teamId,
      player_id: playerId,
      recommendation_type: "individual" as const,
      title: rec.title,
      description: rec.description,
      priority: rec.priority,
      category: rec.category,
      tags: rec.tags || [],
      estimated_time: rec.estimatedTime || 30,
      ai_analysis: {
        analysis: aiResponse.analysis,
        specificDrills: rec.specificDrills || [],
      },
    }))

    const { data: savedRecommendations, error: saveError } = await supabase
      .from("ai_training_recommendations")
      .insert(recommendationsToSave)
      .select()

    if (saveError) {
      console.error("Error saving recommendations:", saveError)
      return NextResponse.json({ error: "Failed to save recommendations" }, { status: 500 })
    }

    return NextResponse.json({
      recommendations: savedRecommendations,
      analysis: aiResponse.analysis,
    })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
