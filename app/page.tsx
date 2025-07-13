"use client"

import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Target className="h-16 w-16 text-red-500 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              VALORANT Coach Pro
            </h1>
          </div>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            AI-powered coaching platform for VALORANT teams. Analyze performance, track progress, and get personalized
            training recommendations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
            <Link href="/analytics">
              <Button className="border-gray-700 text-white hover:bg-gray-800 text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">🎯 Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Track player statistics, agent usage, weapon preferences, and match performance with detailed analytics.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">🤖 AI Training Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Get personalized training suggestions powered by AI analysis of your team's performance data.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">👥 Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Manage your team roster, track individual player progress, and coordinate training sessions.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
