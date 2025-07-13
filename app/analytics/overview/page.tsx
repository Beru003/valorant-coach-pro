"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart,
} from "recharts"
import {
  Target,
  TrendingUp,
  Users,
  Award,
  Activity,
  Zap,
  Shield,
  Crosshair,
  BarChart3,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react"

//mock
const playerPerformanceData = [
  {
    player: "Alex Chen",
    role: "Duelist",
    winRate: 68,
    kd: 1.34,
    acs: 267,
    headshots: 24.5,
    clutches: 8,
    firstKills: 45,
    color: "#ef4444",
  },
  {
    player: "Sarah Kim",
    role: "Controller",
    winRate: 72,
    kd: 1.12,
    acs: 234,
    headshots: 19.2,
    clutches: 12,
    firstKills: 23,
    color: "#8b5cf6",
  },
  {
    player: "Mike Johnson",
    role: "Initiator",
    winRate: 65,
    kd: 1.08,
    acs: 198,
    headshots: 16.8,
    clutches: 6,
    firstKills: 34,
    color: "#f59e0b",
  },
  {
    player: "Emma Davis",
    role: "Sentinel",
    winRate: 70,
    kd: 1.21,
    acs: 221,
    headshots: 22.1,
    clutches: 15,
    firstKills: 18,
    color: "#10b981",
  },
  {
    player: "Ryan Wilson",
    role: "Initiator",
    winRate: 63,
    kd: 0.98,
    acs: 187,
    headshots: 14.3,
    clutches: 4,
    firstKills: 29,
    color: "#f97316",
  },
]

const agentUsageData = [
  { agent: "Jett", usage: 28, wins: 19, losses: 9, color: "#3b82f6" },
  { agent: "Sage", usage: 22, wins: 17, losses: 5, color: "#10b981" },
  { agent: "Sova", usage: 18, wins: 12, losses: 6, color: "#f59e0b" },
  { agent: "Omen", usage: 15, wins: 11, losses: 4, color: "#8b5cf6" },
  { agent: "Breach", usage: 12, wins: 8, losses: 4, color: "#ef4444" },
  { agent: "Killjoy", usage: 5, wins: 4, losses: 1, color: "#06b6d4" },
]

const weaponPerformanceData = [
  { weapon: "Vandal", kills: 245, accuracy: 23.5, preference: 42, headshots: 89 },
  { weapon: "Phantom", kills: 198, accuracy: 21.8, preference: 35, headshots: 67 },
  { weapon: "Operator", kills: 89, accuracy: 67.2, preference: 15, headshots: 78 },
  { weapon: "Sheriff", kills: 67, accuracy: 45.3, preference: 8, headshots: 34 },
  { weapon: "Spectre", kills: 45, accuracy: 28.1, preference: 12, headshots: 18 },
]

const performanceTrendData = [
  { match: "Match 1", date: "Jan 15", teamKD: 1.2, teamACS: 245, winRate: 65, headshots: 22.1 },
  { match: "Match 2", date: "Jan 16", teamKD: 0.9, teamACS: 198, winRate: 45, headshots: 18.5 },
  { match: "Match 3", date: "Jan 17", teamKD: 1.8, teamACS: 312, winRate: 85, headshots: 28.3 },
  { match: "Match 4", date: "Jan 18", teamKD: 1.4, teamACS: 267, winRate: 75, headshots: 25.7 },
  { match: "Match 5", date: "Jan 19", teamKD: 1.1, teamACS: 223, winRate: 55, headshots: 20.9 },
  { match: "Match 6", date: "Jan 20", teamKD: 1.6, teamACS: 289, winRate: 80, headshots: 26.4 },
  { match: "Match 7", date: "Jan 21", teamKD: 1.3, teamACS: 254, winRate: 70, headshots: 23.8 },
]

const mapPerformanceData = [
  { map: "Ascent", winRate: 75, avgKD: 1.3, avgACS: 245, matches: 12 },
  { map: "Bind", winRate: 45, avgKD: 0.9, avgACS: 198, matches: 8 },
  { map: "Haven", winRate: 85, avgKD: 1.6, avgACS: 278, matches: 10 },
  { map: "Split", winRate: 60, avgKD: 1.1, avgACS: 212, matches: 9 },
  { map: "Icebox", winRate: 55, avgKD: 1.0, avgACS: 201, matches: 7 },
  { map: "Breeze", winRate: 70, avgKD: 1.4, avgACS: 256, matches: 6 },
]

const roleDistributionData = [
  { role: "Duelist", count: 2, percentage: 40, color: "#ef4444" },
  { role: "Controller", count: 1, percentage: 20, color: "#8b5cf6" },
  { role: "Initiator", count: 1, percentage: 20, color: "#f59e0b" },
  { role: "Sentinel", count: 1, percentage: 20, color: "#10b981" },
]

const teamRadarData = [
  { metric: "Aim", value: 78, fullMark: 100 },
  { metric: "Strategy", value: 65, fullMark: 100 },
  { metric: "Communication", value: 82, fullMark: 100 },
  { metric: "Utility Usage", value: 71, fullMark: 100 },
  { metric: "Positioning", value: 69, fullMark: 100 },
  { metric: "Clutch Factor", value: 74, fullMark: 100 },
]

export default function AnalyticsOverviewPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Target className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Team Analytics Dashboard
                </h1>
                <p className="text-gray-400 text-sm">Comprehensive performance analysis and insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-300">Team Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">67.6%</div>
              <p className="text-xs text-blue-300/70">+5.2% from last week</p>
              <div className="mt-2 h-2 bg-blue-900/30 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: "67.6%" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-300">Avg K/D Ratio</CardTitle>
              <Target className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">1.15</div>
              <p className="text-xs text-green-300/70">+0.08 improvement</p>
              <div className="mt-2 h-2 bg-green-900/30 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: "57.5%" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-300">Team ACS</CardTitle>
              <Award className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">221</div>
              <p className="text-xs text-purple-300/70">Above average</p>
              <div className="mt-2 h-2 bg-purple-900/30 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: "73.7%" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-300">Headshot %</CardTitle>
              <Crosshair className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400">21.4%</div>
              <p className="text-xs text-orange-300/70">+2.1% this month</p>
              <div className="mt-2 h-2 bg-orange-900/30 rounded-full">
                <div className="h-2 bg-orange-500 rounded-full" style={{ width: "71.3%" }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-800 grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="performance" className="data-[state=active]:bg-gray-800">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-gray-800">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Agents & Weapons
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-gray-800">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="maps" className="data-[state=active]:bg-gray-800">
              <Activity className="h-4 w-4 mr-2" />
              Maps & Roles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Player Performance Comparison */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Player Win Rate Comparison
                  </CardTitle>
                  <CardDescription className="text-gray-400">Individual player performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      winRate: { label: "Win Rate %", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={playerPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="player" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="winRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* K/D vs ACS Scatter */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-500" />
                    K/D Ratio vs Combat Score
                  </CardTitle>
                  <CardDescription className="text-gray-400">Player efficiency analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      kd: { label: "K/D Ratio", color: "hsl(var(--chart-2))" },
                      acs: { label: "ACS", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={playerPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="player" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="kd" fill="#10b981" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="acs" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Headshot Accuracy */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Crosshair className="h-5 w-5 mr-2 text-orange-500" />
                    Headshot Percentage by Player
                  </CardTitle>
                  <CardDescription className="text-gray-400">Aim precision metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      headshots: { label: "Headshot %", color: "hsl(var(--chart-4))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={playerPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="player" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="headshots"
                          stroke="#f97316"
                          fill="url(#headshotGradient)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="headshotGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Team Radar Chart */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-purple-500" />
                    Team Skill Assessment
                  </CardTitle>
                  <CardDescription className="text-gray-400">Overall team capabilities radar</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Skill Level", color: "hsl(var(--chart-5))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={teamRadarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tick={{ fill: "#9ca3af", fontSize: 10 }}
                          tickCount={5}
                        />
                        <Radar
                          name="Team Skills"
                          dataKey="value"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Usage Pie Chart */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Agent Usage Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-400">Most frequently selected agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      usage: { label: "Usage %", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={agentUsageData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="usage"
                          label={({ agent, usage }) => `${agent}: ${usage}%`}
                        >
                          {agentUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Weapon Performance */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    Weapon Performance Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-400">Kill efficiency by weapon type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      kills: { label: "Kills", color: "hsl(var(--chart-2))" },
                      accuracy: { label: "Accuracy %", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weaponPerformanceData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9ca3af" />
                        <YAxis dataKey="weapon" type="category" stroke="#9ca3af" fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="kills" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Agent Win Rate */}
              <Card className="bg-gray-900/50 border-gray-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-green-500" />
                    Agent Win Rate Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-400">Success rate by agent selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agentUsageData.map((agent, index) => {
                      const winRate = Math.round((agent.wins / (agent.wins + agent.losses)) * 100)
                      return (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: agent.color }} />
                            <span className="text-white font-medium">{agent.agent}</span>
                            <Badge variant="outline" className="text-xs">
                              {agent.usage} matches
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm text-gray-400">
                                {agent.wins}W - {agent.losses}L
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-700 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${winRate}%`,
                                    backgroundColor: agent.color,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-semibold" style={{ color: agent.color }}>
                                {winRate}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Performance Trend Line Chart */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LineChartIcon className="h-5 w-5 mr-2 text-blue-500" />
                    Team Performance Trends
                  </CardTitle>
                  <CardDescription className="text-gray-400">Performance metrics over recent matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      teamKD: { label: "Team K/D", color: "hsl(var(--chart-1))" },
                      winRate: { label: "Win Rate %", color: "hsl(var(--chart-2))" },
                      headshots: { label: "Headshot %", color: "hsl(var(--chart-3))" },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="teamKD"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="winRate"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="headshots"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Match Results Timeline */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-purple-500" />
                    Recent Match Results
                  </CardTitle>
                  <CardDescription className="text-gray-400">Detailed match performance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performanceTrendData.slice(-5).map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${match.winRate > 50 ? "bg-green-500" : "bg-red-500"}`}
                          />
                          <div>
                            <div className="text-white font-medium">{match.match}</div>
                            <div className="text-gray-400 text-sm">{match.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm text-gray-400">K/D</div>
                            <div className="text-white font-semibold">{match.teamKD}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-400">ACS</div>
                            <div className="text-white font-semibold">{match.teamACS}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-400">HS%</div>
                            <div className="text-white font-semibold">{match.headshots}%</div>
                          </div>
                          <Badge
                            className={`${
                              match.winRate > 50 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                            }`}
                          >
                            {match.winRate > 50 ? "WIN" : "LOSS"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maps" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map Performance */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-green-500" />
                    Map Performance Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-400">Win rates across different maps</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      winRate: { label: "Win Rate %", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mapPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="map" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="winRate" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Role Distribution */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-500" />
                    Team Role Distribution
                  </CardTitle>
                  <CardDescription className="text-gray-400">Current team composition</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: { label: "Players", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roleDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ role, percentage }) => `${role}: ${percentage}%`}
                        >
                          {roleDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Map Statistics Table */}
              <Card className="bg-gray-900/50 border-gray-800 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                    Detailed Map Statistics
                  </CardTitle>
                  <CardDescription className="text-gray-400">Comprehensive map performance data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mapPerformanceData.map((map, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{map.map.slice(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{map.map}</div>
                            <div className="text-gray-400 text-sm">{map.matches} matches played</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Win Rate</div>
                            <div
                              className={`font-semibold ${
                                map.winRate > 60
                                  ? "text-green-500"
                                  : map.winRate > 40
                                    ? "text-yellow-500"
                                    : "text-red-500"
                              }`}
                            >
                              {map.winRate}%
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Avg K/D</div>
                            <div className="text-white font-semibold">{map.avgKD}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-400">Avg ACS</div>
                            <div className="text-white font-semibold">{map.avgACS}</div>
                          </div>
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                map.winRate > 60 ? "bg-green-500" : map.winRate > 40 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${map.winRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
