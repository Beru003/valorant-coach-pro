"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Target,
  TrendingUp,
  Award,
  Brain,
  LogOut,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  UserCog,
  Activity,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { ProfileSettingsModal } from "@/components/profile/ProfileSettingsModal"
import { TrainingPlanGenerator } from "@/components/ai/TrainingPlanGenerator"
import TeamManagement from "@/components/team/TeamManagement"

export default function AnalyticsPage() {
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
              <Link href="/analytics/overview">
                <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-900/20 bg-transparent">
                  <Activity className="h-4 w-4 mr-2" />
                  Advanced Analytics
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <span className="text-gray-300">Welcome, Coach</span>
              <ProfileSettingsModal>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </ProfileSettingsModal>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <LogOut className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Team Analytics Dashboard</h2>
          <p className="text-gray-400">Monitor your team's performance and get AI-powered insights</p>
          <div className="mt-4">
            <Link href="/analytics/overview">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Detailed Analytics Dashboard
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Team Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">68%</div>
              <p className="text-xs text-gray-500">+5% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Players</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">5</div>
              <p className="text-xs text-gray-500">All players active</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg K/D Ratio</CardTitle>
              <Target className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">1.34</div>
              <p className="text-xs text-gray-500">+0.12 improvement</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
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

        {/* Quick Analytics Preview */}
        <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Advanced Analytics Available
            </CardTitle>
            <CardDescription className="text-gray-300">
              Get detailed insights with comprehensive charts and performance analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 rounded-lg bg-gray-800/50">
                <PieChart className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Agent & Weapon Analysis</h3>
                <p className="text-sm text-gray-400">Usage patterns and efficiency</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-800/50">
                <LineChart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Performance Trends</h3>
                <p className="text-sm text-gray-400">Historical data and patterns</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gray-800/50">
                <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Map Performance</h3>
                <p className="text-sm text-gray-400">Win rates by map and role</p>
              </div>
            </div>
            <Link href="/analytics/overview">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Activity className="h-4 w-4 mr-2" />
                Open Advanced Analytics Dashboard
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-800 grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="players" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Players
            </TabsTrigger>
            <TabsTrigger value="management" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <UserCog className="h-4 w-4 mr-2" />
              Team Management
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Brain className="h-4 w-4 mr-2" />
              AI Training
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Usage */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-blue-500" />
                    Agent Usage Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-400">Most frequently used agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { agent: "Jett", usage: 35, color: "bg-blue-500" },
                      { agent: "Sage", usage: 28, color: "bg-green-500" },
                      { agent: "Sova", usage: 22, color: "bg-yellow-500" },
                      { agent: "Omen", usage: 15, color: "bg-purple-500" },
                    ].map((item) => (
                      <div key={item.agent} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-white">{item.agent}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.usage}%` }} />
                          </div>
                          <span className="text-gray-400 text-sm">{item.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Trend */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-green-500" />
                    Performance Trend
                  </CardTitle>
                  <CardDescription className="text-gray-400">Last 5 matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { match: "Match 1", kd: 1.2, result: "Win", color: "text-green-500" },
                      { match: "Match 2", kd: 0.9, result: "Loss", color: "text-red-500" },
                      { match: "Match 3", kd: 1.8, result: "Win", color: "text-green-500" },
                      { match: "Match 4", kd: 1.4, result: "Win", color: "text-green-500" },
                      { match: "Match 5", kd: 1.1, result: "Loss", color: "text-red-500" },
                    ].map((item) => (
                      <div key={item.match} className="flex items-center justify-between p-2 rounded bg-gray-800/50">
                        <span className="text-white">{item.match}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-400">K/D: {item.kd}</span>
                          <Badge className={`${item.color} bg-transparent border`}>{item.result}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Team Roster</CardTitle>
                <CardDescription className="text-gray-400">Current team members and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Alex "Phoenix" Chen', role: "Duelist", rank: "Immortal 2", winRate: 68, kd: 1.34 },
                    { name: 'Sarah "Viper" Kim', role: "Controller", rank: "Immortal 1", winRate: 72, kd: 1.12 },
                    { name: 'Mike "Breach" Johnson', role: "Initiator", rank: "Diamond 3", winRate: 65, kd: 1.08 },
                    { name: 'Emma "Killjoy" Davis', role: "Sentinel", rank: "Immortal 1", winRate: 70, kd: 1.21 },
                    { name: 'Ryan "Skye" Wilson', role: "Initiator", rank: "Diamond 2", winRate: 63, kd: 0.98 },
                  ].map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{player.name.split(" ")[0][0]}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{player.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                              {player.role}
                            </Badge>
                            <span className="text-sm text-gray-400">{player.rank}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-500">{player.winRate}%</div>
                        <div className="text-sm text-gray-400">K/D: {player.kd}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <TeamManagement teamId="demo-team" />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-500" />
                  AI-Powered Training Recommendations
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Personalized training suggestions based on performance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">🎯 Aim Training Focus</h3>
                      <Badge className="bg-red-600 hover:bg-red-700 text-xs">HIGH PRIORITY</Badge>
                    </div>
                    <p className="text-gray-300 mb-3">
                      Team's headshot percentage is below average. Focus on crosshair placement and aim training.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Aim Lab
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Crosshair Placement
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Flick Training
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">🛡️ Role-Specific Training</h3>
                      <Badge className="bg-yellow-600 hover:bg-yellow-700 text-xs">MEDIUM</Badge>
                    </div>
                    <p className="text-gray-300 mb-3">
                      Duelists need entry fragging practice, Sentinels should work on site anchoring.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Entry Fragging
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Site Anchoring
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Utility Usage
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">🧠 Strategic Development</h3>
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">LOW</Badge>
                    </div>
                    <p className="text-gray-300 mb-3">
                      Team coordination and map control strategies show room for improvement.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Map Control
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Team Coordination
                      </Badge>
                      <Badge variant="outline" className="bg-gray-800/50 border-gray-600 text-gray-300">
                        Callouts
                      </Badge>
                    </div>
                  </div>

                  <TrainingPlanGenerator />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
