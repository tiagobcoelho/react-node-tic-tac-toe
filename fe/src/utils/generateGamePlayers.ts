import { PlayerData } from "../partials/Game"
import { PlayersState } from "../redux/players"

export default function generateGamePlayers (initialPlayers: PlayersState): PlayerData[] {
  return initialPlayers.map((player, i) => {
    return {
      playerId: player.id,
      playerName: player.name,
      isX: i === 0 ? true : false
    }
  })
}