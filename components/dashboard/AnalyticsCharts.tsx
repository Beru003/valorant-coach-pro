import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { useTeamStats } from "@/hooks/useTeamStats"
import type { Player } from "@/types" // Import the common Player type

interface AnalyticsChartsProps {
  teamId: string
  players?: Player[] // Use the common Player type
}

export function AnalyticsCharts({ teamId, players }: AnalyticsChartsProps) {
  const teamStats = useTeamStats(teamId, players)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Agent Usage Chart */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Agent Usage Distribution</CardTitle>
          <CardDescription className="text-gray-400">
            Most frequently used agents by the team ({teamStats.totalPlayers} players)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              usage: {
                label: "Usage %",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamStats.agentUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="agent" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <ChartTooltip
                  content={<ChartTooltipContent formatter={(value: number, name: string) => [`${value}%`, "Usage"]} />}
                />
                <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weapon Preferences */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Weapon Preferences</CardTitle>
          <CardDescription className="text-gray-400">Most used weapons and kill counts</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              kills: {
                label: "Kills",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamStats.weaponData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="weapon" type="category" stroke="#9ca3af" />
                <ChartTooltip
                  content={<ChartTooltipContent formatter={(value: number, name: string) => [value, "Kills"]} />}
                />
                <Bar dataKey="kills" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Trend */}
      <Card className="bg-gray-900/50 border-gray-800 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-white">Performance Trend</CardTitle>
          <CardDescription className="text-gray-400">K/D ratio and win rate over recent matches</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              kd: {
                label: "K/D Ratio",
                color: "hsl(var(--chart-1))",
              },
              winRate: {
                label: "Win Rate %",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={teamStats.performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="match" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <ChartTooltip content={<ChartTooltipContent />} />{" "}
                {/* No formatter needed here as it's handled by default */}
                <Line
                  type="monotone"
                  dataKey="kd"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6" }}
                  name="K/D Ratio"
                />
                <Line
                  type="monotone"
                  dataKey="winRate"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981" }}
                  name="Win Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Team Statistics Summary */}
      {teamStats.totalPlayers > 0 && (
        <Card className="bg-gray-900/50 border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Team Overview</CardTitle>
            <CardDescription className="text-gray-400">
              Current team composition and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{teamStats.totalPlayers}</div>
                <div className="text-sm text-gray-400">Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{teamStats.averageKD}</div>
                <div className="text-sm text-gray-400">Avg K/D</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{teamStats.averageACS}</div>
                <div className="text-sm text-gray-400">Avg ACS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{teamStats.winRate}%</div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <h4 className="text-white font-semibold mb-2">Role Distribution</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(teamStats.roleDistribution).map(([role, count]) => (
                  <div key={role} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    <span className="text-gray-300">{role}: </span>
                    <span className="text-white font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
