"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Databaseteam_members {
  id: string
  full_name: string
  valorant_username: string
  primary_role: string
  current_rank: string
}

interface RemovePlayerModalProps {
  children: React.ReactNode
  player: Databaseteam_members
  onPlayerRemoved: () => void
}

export function RemovePlayerModal({ children, player, onPlayerRemoved }: RemovePlayerModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleRemove = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase.from("team_members").delete().eq("id", player.id)

      if (deleteError) throw deleteError

      setOpen(false)
      onPlayerRemoved()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove player")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-400">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Remove Player
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently remove the player and all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
            <h3 className="font-semibold text-white mb-2">You are about to remove:</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-gray-400">Name:</span> {player.full_name}
              </p>
              <p>
                <span className="text-gray-400">Username:</span> @{player.valorant_username}
              </p>
              <p>
                <span className="text-gray-400">Role:</span> {player.primary_role}
              </p>
              <p>
                <span className="text-gray-400">Rank:</span> {player.current_rank}
              </p>
            </div>
          </div>

          <Alert className="bg-yellow-900/20 border-yellow-500/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-yellow-400">
              This will also delete all player statistics, AI recommendations, and training data.
            </AlertDescription>
          </Alert>

          {error && (
            <Alert className="bg-red-900/20 border-red-500/20">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={handleRemove} disabled={loading} className="bg-red-600 hover:bg-red-700">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove Player"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
