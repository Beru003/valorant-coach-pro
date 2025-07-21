"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { StatsOverview } from "@/components/dashboard/StatsOverview"
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts"
import { TeamRoster } from "@/components/dashboard/TeamRoster"
import { AITraining } from "@/components/dashboard/AITraining"
import { TeamManagement } from "@/components/team/TeamManagement"
import type { Player } from "@/types" // Import the common Player type

export default function DashboardPage() {
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]) // Use the common Player type
  const teamId = "default-team" // In a real app, this would come from auth/context

  const handlePlayersUpdate = (players: Player[]) => {
    // Use the common Player type
    setCurrentPlayers(players)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Monitor your team's performance, analyze gameplay data, and get AI-powered training recommendations.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-gray-700">
              Team Management
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-gray-700">
              AI Training
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <StatsOverview players={currentPlayers} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamRoster players={currentPlayers} />
              <AITraining />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsCharts teamId={teamId} players={currentPlayers} />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamManagement teamId={teamId} onPlayersUpdate={handlePlayersUpdate} />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <AITraining />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
