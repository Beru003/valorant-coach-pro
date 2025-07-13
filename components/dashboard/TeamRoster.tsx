import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TEAM_ROSTER, ROLE_COLORS } from "@/lib/constants"
import type { Player } from "@/types"

interface PlayerCardProps {
  player: Player
}

function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 transition-colors">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={player.avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-gray-700 text-white">{player.name.split(" ")[0][0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-white">
            {player.name}
            <span className="text-gray-400 ml-2 text-sm">"{player.gamertag}"</span>
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <Badge
              variant="secondary"
              className="text-xs"
              style={{
                backgroundColor: `${ROLE_COLORS[player.role]}20`,
                color: ROLE_COLORS[player.role],
                borderColor: `${ROLE_COLORS[player.role]}40`,
              }}
            >
              {player.role}
            </Badge>
            <span className="text-sm text-gray-400">{player.rank}</span>
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span>K/D: {player.stats.kd}</span>
            <span>ACS: {player.stats.acs}</span>
            <span>HS%: {player.stats.headshots}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-green-500">{player.winRate}%</div>
        <div className="text-sm text-gray-400">Win Rate</div>
      </div>
    </div>
  )
}

export function TeamRoster() {
  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Team Roster</CardTitle>
        <CardDescription className="text-gray-400">Current team members and their performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TEAM_ROSTER.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
