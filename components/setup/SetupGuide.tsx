"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ExternalLink, Copy, Database, Key, Code } from "lucide-react"

const setupSteps = [
  {
    id: 1,
    title: "Create Supabase Account",
    description: "Sign up for a free Supabase account",
    icon: Database,
    link: "https://supabase.com",
    details: ["Go to supabase.com", "Click 'Start your project'", "Create account and verify email"],
  },
  {
    id: 2,
    title: "Create New Project",
    description: "Set up your VALORANT coaching database",
    icon: Database,
    details: [
      "Click 'New Project'",
      "Name: valorant-coaching-app",
      "Choose region and create strong password",
      "Wait 2-3 minutes for setup",
    ],
  },
  {
    id: 3,
    title: "Get API Keys",
    description: "Copy your project credentials",
    icon: Key,
    details: ["Go to Settings > API", "Copy Project URL", "Copy anon public key", "Copy service_role secret key"],
  },
  {
    id: 4,
    title: "Update Environment Variables",
    description: "Add your keys to .env.local",
    icon: Code,
    details: [
      "Open .env.local in your project",
      "Replace placeholder values",
      "Add your Supabase URL and keys",
      "Save the file",
    ],
  },
  {
    id: 5,
    title: "Run SQL Scripts",
    description: "Create database tables and security",
    icon: Database,
    details: [
      "Go to SQL Editor in Supabase",
      "Run the 3 SQL scripts provided",
      "Check Table Editor to verify tables",
      "Enable authentication settings",
    ],
  },
]

export function SetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const copyEnvTemplate = () => {
    const envTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Gemini AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000`

    navigator.clipboard.writeText(envTemplate)
    alert("Environment template copied to clipboard!")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">🚀 Setup Guide</h1>
        <p className="text-gray-400">Follow these steps to set up your VALORANT coaching app</p>
      </div>

      <div className="grid gap-6">
        {setupSteps.map((step) => {
          const isCompleted = completedSteps.includes(step.id)
          const Icon = step.icon

          return (
            <Card key={step.id} className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" onClick={() => toggleStep(step.id)} className="p-0 h-auto">
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400" />
                      )}
                    </Button>
                    <Icon className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-white">
                        Step {step.id}: {step.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">{step.description}</CardDescription>
                    </div>
                  </div>
                  {step.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(step.link, "_blank")}
                      className="border-gray-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Badge variant="outline" className="mr-3 text-xs">
                        {index + 1}
                      </Badge>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Environment Variables Template
          </CardTitle>
          <CardDescription className="text-gray-400">Copy this template to your .env.local file</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={copyEnvTemplate} className="w-full">
            <Copy className="h-4 w-4 mr-2" />
            Copy Environment Template
          </Button>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-gray-400 mb-4">
          Completed {completedSteps.length} of {setupSteps.length} steps
        </p>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSteps.length / setupSteps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
