import React from 'react'
import { GameState } from '../../redux/game';

type GameHistoryProps = {
  history: GameState["history"]
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  return (
    <div>
      {history && history.map((game, i) => (
        <p>{i + 1} - {game.wonBy ? game.wonBy.winnerName : 'tie'}</p>
      ))}
    </div>
  )
}

export default GameHistory;
