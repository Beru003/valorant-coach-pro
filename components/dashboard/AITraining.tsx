import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"
import { TRAINING_RECOMMENDATIONS } from "@/lib/constants"
import type { TrainingRecommendation } from "@/types"

interface TrainingCardProps {
  recommendation: TrainingRecommendation
}

function TrainingCard({ recommendation }: TrainingCardProps) {
  const priorityColors = {
    high: "from-red-900/20 to-orange-900/20 border-red-500/20",
    medium: "from-yellow-900/20 to-orange-900/20 border-yellow-500/20",
    low: "from-blue-900/20 to-purple-900/20 border-blue-500/20",
  }

  const badgeColors = {
    high: "bg-red-600 hover:bg-red-700",
    medium: "bg-yellow-600 hover:bg-yellow-700",
    low: "bg-blue-600 hover:bg-blue-700",
  }

  const categoryEmojis = {
    aim: "🎯",
    strategy: "🧠",
    utility: "🛡️",
    positioning: "📍",
    communication: "📢",
  }

  return (
    <div className={`p-4 rounded-lg bg-gradient-to-r border ${priorityColors[recommendation.priority]}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white flex items-center">
          {categoryEmojis[recommendation.category]} {recommendation.title}
        </h3>
        <Badge className={`text-xs ${badgeColors[recommendation.priority]}`}>
          {recommendation.priority.toUpperCase()}
        </Badge>
      </div>
      <p className="text-gray-300 mb-3 text-sm">{recommendation.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {recommendation.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-gray-800/50 border-gray-600 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
        <span className="text-xs text-gray-400">{recommendation.estimatedTime}min</span>
      </div>
    </div>
  )
}

export function AITraining() {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-500" />
          AI-Powered Training Recommendations
        </CardTitle>
        <CardDescription className="text-gray-400">
          Personalized training suggestions based on player performance and role analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TRAINING_RECOMMENDATIONS.map((recommendation) => (
            <TrainingCard key={recommendation.id} recommendation={recommendation} />
          ))}

          <div className="pt-4 border-t border-gray-700">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              <Brain className="h-4 w-4 mr-2" />
              Generate Detailed Training Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
