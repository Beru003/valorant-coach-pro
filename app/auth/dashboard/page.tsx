import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Target, TrendingUp, Award, Brain, LogOut, Settings } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  VALORANT Coach Pro
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, Coach</span>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Team Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">68%</div>
              <p className="text-xs text-gray-500">+5% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Players</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">5</div>
              <p className="text-xs text-gray-500">All players active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg K/D Ratio</CardTitle>
              <Target className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">1.34</div>
              <p className="text-xs text-gray-500">+0.12 improvement</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Training Sessions</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">24</div>
              <p className="text-xs text-gray-500">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Team Roster */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Team Roster</CardTitle>
            <CardDescription className="text-gray-400">Current team members and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Alex "Phoenix" Chen', role: "Duelist", rank: "Immortal 2", winRate: 68 },
                { name: 'Sarah "Viper" Kim', role: "Controller", rank: "Immortal 1", winRate: 72 },
                { name: 'Mike "Breach" Johnson', role: "Initiator", rank: "Diamond 3", winRate: 65 },
                { name: 'Emma "Killjoy" Davis', role: "Sentinel", rank: "Immortal 1", winRate: 70 },
                { name: 'Ryan "Skye" Wilson', role: "Initiator", rank: "Diamond 2", winRate: 63 },
              ].map((player, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{player.name.split(" ")[0][0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{player.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                          {player.role}
                        </Badge>
                        <span className="text-sm text-gray-400">{player.rank}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-500">{player.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Training Recommendations */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-500" />
              AI-Powered Training Recommendations
            </CardTitle>
            <CardDescription className="text-gray-400">
              Personalized training suggestions based on player performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                <h3 className="font-semibold text-white mb-2">🎯 Aim Training Focus</h3>
                <p className="text-gray-300 mb-3">
                  Based on recent performance data, the team should focus on crosshair placement and flick accuracy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-600 hover:bg-purple-700">Aim Lab</Badge>
                  <Badge className="bg-purple-600 hover:bg-purple-700">Crosshair Placement</Badge>
                  <Badge className="bg-purple-600 hover:bg-purple-700">Flick Training</Badge>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/20">
                <h3 className="font-semibold text-white mb-2">🛡️ Role-Specific Training</h3>
                <p className="text-gray-300 mb-3">
                  Duelists need entry fragging practice, while Sentinels should work on site anchoring.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-600 hover:bg-green-700">Entry Fragging</Badge>
                  <Badge className="bg-green-600 hover:bg-green-700">Site Anchoring</Badge>
                  <Badge className="bg-green-600 hover:bg-green-700">Utility Usage</Badge>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20">
                <h3 className="font-semibold text-white mb-2">🧠 Strategic Development</h3>
                <p className="text-gray-300 mb-3">
                  Team coordination and map control strategies need improvement based on recent match analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-600 hover:bg-orange-700">Map Control</Badge>
                  <Badge className="bg-orange-600 hover:bg-orange-700">Team Coordination</Badge>
                  <Badge className="bg-orange-600 hover:bg-orange-700">Callouts</Badge>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Generate Detailed Training Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
