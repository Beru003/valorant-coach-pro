"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Loader2, Clock, Target, Users, Zap, CheckCircle } from "lucide-react"

interface TrainingPlan {
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: "aim" | "strategy" | "utility" | "positioning" | "communication"
  tags: string[]
  estimatedTime: number
  specificDrills: string[]
  targetPlayers?: string[]
}

interface GeneratedPlan {
  recommendations: TrainingPlan[]
  analysis: string
  totalEstimatedTime: number
  focusAreas: string[]
}

export function TrainingPlanGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null)

  const generateTrainingPlan = async () => {
    setLoading(true)
    setError("")

    try {
      // Simulate team data - in real app, this would come from your database
      const teamData = {
        teamName: "Elite Squad",
        players: [
          {
            playerId: "1",
            playerName: "Alex Phoenix Chen",
            role: "Duelist",
            recentStats: {
              averageKD: 1.34,
              averageACS: 267,
              headshotPercentage: 24,
              winRate: 68,
              mostUsedAgents: ["Jett", "Reyna", "Phoenix"],
              preferredWeapons: ["Vandal", "Phantom", "Sheriff"],
            },
            weaknesses: ["Crosshair placement", "Entry timing", "Utility usage"],
            strengths: ["Aim mechanics", "Aggressive playstyle", "Clutch situations"],
          },
          {
            playerId: "2",
            playerName: "Sarah Viper Kim",
            role: "Controller",
            recentStats: {
              averageKD: 1.12,
              averageACS: 234,
              headshotPercentage: 19,
              winRate: 72,
              mostUsedAgents: ["Viper", "Omen", "Brimstone"],
              preferredWeapons: ["Vandal", "Spectre", "Classic"],
            },
            weaknesses: ["Smoke timing", "Map control", "Communication"],
            strengths: ["Game sense", "Utility usage", "Team coordination"],
          },
        ],
        teamStats: {
          averageWinRate: 68,
          mapPerformance: {
            Ascent: 75,
            Bind: 45,
            Haven: 85,
            Split: 60,
            Icebox: 55,
          },
          roleDistribution: {
            Duelist: 2,
            Controller: 1,
            Initiator: 1,
            Sentinel: 1,
          },
        },
      }

      const response = await fetch("/api/ai/generate-training-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamData }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate training plan")
      }

      const data = await response.json()

      // Calculate total time and focus areas
      const totalTime = data.recommendations.reduce((sum: number, rec: TrainingPlan) => sum + rec.estimatedTime, 0)
      const focusAreas = [...new Set(data.recommendations.map((rec: TrainingPlan) => rec.category))]

      setGeneratedPlan({
        ...data,
        totalEstimatedTime: totalTime,
        focusAreas,
      })
    } catch (err) {
      setError("Failed to generate training plan. Please try again.")
      console.error("Training plan generation error:", err)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600 hover:bg-red-700"
      case "medium":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "low":
        return "bg-blue-600 hover:bg-blue-700"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "aim":
        return <Target className="h-4 w-4" />
      case "strategy":
        return <Brain className="h-4 w-4" />
      case "utility":
        return <Zap className="h-4 w-4" />
      case "positioning":
        return <Users className="h-4 w-4" />
      case "communication":
        return <Users className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {!generatedPlan ? (
        <Button
          onClick={generateTrainingPlan}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating AI Training Plan...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Generate Detailed Training Plan
            </>
          )}
        </Button>
      ) : (
        <div className="space-y-6">
          {/* Plan Overview */}
          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                AI Training Plan Generated
              </CardTitle>
              <CardDescription className="text-gray-300">
                Personalized training recommendations for your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{generatedPlan.recommendations.length}</div>
                  <div className="text-sm text-gray-400">Recommendations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{generatedPlan.totalEstimatedTime}min</div>
                  <div className="text-sm text-gray-400">Total Training Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{generatedPlan.focusAreas.length}</div>
                  <div className="text-sm text-gray-400">Focus Areas</div>
                </div>
              </div>

              {generatedPlan.analysis && (
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">AI Analysis:</h4>
                  <p className="text-gray-300 text-sm">{generatedPlan.analysis}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Training Recommendations */}
          <div className="space-y-4">
            {generatedPlan.recommendations.map((recommendation, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      {getCategoryIcon(recommendation.category)}
                      <span className="ml-2">{recommendation.title}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getPriorityColor(recommendation.priority)}`}>
                        {recommendation.priority.toUpperCase()}
                      </Badge>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {recommendation.estimatedTime}min
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">{recommendation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {recommendation.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="bg-gray-800/50 border-gray-600 text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Specific Drills */}
                    {recommendation.specificDrills && recommendation.specificDrills.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-white mb-2">Specific Drills:</h5>
                        <ul className="space-y-1">
                          {recommendation.specificDrills.map((drill, drillIndex) => (
                            <li key={drillIndex} className="text-gray-300 text-sm flex items-start">
                              <span className="text-purple-400 mr-2">•</span>
                              {drill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Generate New Plan Button */}
          <Button
            onClick={() => setGeneratedPlan(null)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Generate New Training Plan
          </Button>
        </div>
      )}

      {error && (
        <Alert className="border-red-500/20 bg-red-500/10">
          <AlertDescription className="text-red-400">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
