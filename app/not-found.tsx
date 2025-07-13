import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <Target className="h-16 w-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
        <div className="space-x-4">
          <Link href="/">
            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
