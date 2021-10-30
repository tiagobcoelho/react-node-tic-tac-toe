import React from 'react'

// Redux import
import { GameState } from '../../redux/game';

// Component Props type
type GameHistoryProps = {
  history: GameState["history"],
};

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  if(history && history.length > 0 ) return (
    <div className="history-container">
      <div className="history-row">
        <div className="number-col header">#</div>
        <div className="result-col header">games history</div>
      </div>
      {history.map((game, i) => (
        <div className="history-row">
          <div className="number-col">{i + 1}</div>
          <div className="result-col">
            {game.wonBy ? `won by ${game.wonBy.winnerName}` : 'ended a tie'}
          </div>

        </div>
      ))}
    </div>
  );
  return null;
};

export default GameHistory;
