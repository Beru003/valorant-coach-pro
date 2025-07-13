import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Target, Award } from "lucide-react"
import { useTeamStats } from "@/hooks/useTeamStats"

export function StatsOverview() {
  const stats = useTeamStats()

  const statCards = [
    {
      title: "Team Win Rate",
      value: `${stats.averageWinRate}%`,
      change: `+${stats.performanceTrend}% from last week`,
      icon: TrendingUp,
      color: "text-green-500",
      positive: stats.performanceTrend > 0,
    },
    {
      title: "Active Players",
      value: stats.activePlayers.toString(),
      change: "All players active",
      icon: Users,
      color: "text-blue-500",
      positive: true,
    },
    {
      title: "Avg K/D Ratio",
      value: stats.averageKD.toString(),
      change: "+0.12 improvement",
      icon: Target,
      color: "text-orange-500",
      positive: true,
    },
    {
      title: "Training Sessions",
      value: "24",
      change: "This month",
      icon: Award,
      color: "text-purple-500",
      positive: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <p className={`text-xs ${stat.positive ? "text-gray-500" : "text-red-400"}`}>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
