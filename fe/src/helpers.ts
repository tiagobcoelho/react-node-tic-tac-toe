import { PlayerData } from "./partials/Game"
import { PlayersState } from "./redux/players"

export function isGameWon(winningScore: number, playerScore: number) {
  if(winningScore === playerScore) return true
  return false
}


export const generateGamePlayers = (initialPlayers: PlayersState): PlayerData[] => {
  return initialPlayers.map((player, i) => {
    return {
      playerId: player.id,
      playerName: player.name,
      playerScore: 0,
      isX: i === 0 ? true : false
      
      
    }
  })
}