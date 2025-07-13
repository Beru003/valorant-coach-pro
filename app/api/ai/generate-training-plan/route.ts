import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { geminiAI } from "@/lib/ai/gemini"

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

    const { teamData } = await request.json()

    if (!teamData) {
      return NextResponse.json({ error: "Team data is required" }, { status: 400 })
    }

    // Generate comprehensive team training plan using Gemini AI
    const aiResponse = await geminiAI.generateComprehensiveTeamTrainingPlan(teamData)

    // Save the generated plan to database (optional)
    try {
      const recommendationsToSave = aiResponse.recommendations.map((rec) => ({
        team_id: teamData.teamId || "demo-team", // Use actual team ID in production
        player_id: null, // Team-wide recommendations
        recommendation_type: "team" as const,
        title: rec.title,
        description: rec.description,
        priority: rec.priority,
        category: rec.category,
        tags: rec.tags,
        estimated_time: rec.estimatedTime,
        ai_analysis: {
          analysis: aiResponse.analysis,
          specificDrills: rec.specificDrills,
          teamFocus: aiResponse.teamFocus || "",
          strategicInsights: aiResponse.strategicInsights || "",
        },
      }))

      await supabase.from("ai_training_recommendations").insert(recommendationsToSave)
    } catch (saveError) {
      console.error("Error saving recommendations:", saveError)
      // Continue even if saving fails
    }

    return NextResponse.json(aiResponse)
  } catch (error) {
    console.error("Error generating training plan:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
