import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Component imports
import Square from '../../components/Square';
import GameHistory from '../../components/GameHistory';
import { useModal } from '../../components/Modal/use-modal';

// Redux imports
import { RootState } from '../../redux/store';
import { clearPlayers, incrementWins, Player, playersRematch } from '../../redux/players';
import { restartGame, setGameHistory } from '../../redux/game';

// Helpers import
import generateGamePlayers from '../../utils/generateGamePlayers';
import calculateWinner from '../../utils/calculateWinner';

// Player for single game type
export type PlayerData =  {
  playerId: Player['id'],
  playerName: Player['name'],
  isX: boolean,
};

const Game:React.FC = () => {

  const dispatch = useDispatch();

  // Redux state
  const players = useSelector((state: RootState) => state.players);
  const game = useSelector((state: RootState) => state.game);

  // Local state
  const [playersInfo, setPlayersInfo] = useState<PlayerData[]>(generateGamePlayers(players));
  
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  const [stepNumber, setStepNumber] = useState(1);

  const [currentPlayer, setCurrentPlayer] = useState<PlayerData | null>(null);

  // add modal function from useModal hook
  const { addModal } = useModal();

  // set current player if no current player is set
  useEffect(() => {
    if(!playersInfo || currentPlayer ) return;
    setCurrentPlayer(playersInfo[0]);
  }, [playersInfo, currentPlayer]);


  // Function to handle every player move
  const handleClick = (i: number): void => {

    if(!currentPlayer || !playersInfo) return;
    
    const currentHistory = [...squares];
    currentHistory[i] = currentPlayer.isX ? 'x' : 'o';
    
    setSquares(currentHistory);
    
    setCurrentPlayer(prevState => {
      const nextPlayer = playersInfo.find(player => player.playerId !== currentPlayer.playerId);
      return nextPlayer ? nextPlayer : prevState;
    });

    if(stepNumber > 4) {
      if(calculateWinner(currentHistory)) {
        return handleSingleGameWon(currentPlayer.playerId);
      };
    };

    if(stepNumber === 9) return setTie();

    setStepNumber(state => state + 1);
  };


  // Function to handle single game won
  const handleSingleGameWon = (id: PlayerData["playerId"]): void => {

    const currentWinner = players.find(player => player.id === id);
    
    if(!currentWinner || !game.setsToWin) return;
    
    if(currentWinner.winsCount + 1 < game.setsToWin) {
      // Overall game is not finished
      dispatch(incrementWins(id));
      dispatch(setGameHistory(true, currentWinner));
      setSquares(Array(9).fill(null));
      setStepNumber(1);
      resetPlayers()
    } else {
      // Game won
      addModal({
        message: `${currentWinner.name} won!`,
        isFlash: false,
        rematch,
        restart
      });
    };
  };

  // Function to handle Single game tie
  const setTie = () => {   
    // IF MULTIPLE
      setSquares(Array(9).fill(null));
      // dispatch set history action with the tie
      dispatch(setGameHistory(false));

      if(!game.isMultiple) return addModal({
        isFlash: false,
        message: "the game was a tie",
        rematch,
        restart
      });
      
      // display flash message saying it was a tie
      addModal({
        isFlash: true,
        message: "the game was a tie"
      });

      setStepNumber(1);
      resetPlayers()
  };
  
  // helper function to change player who is X (and therefore starts the game)
  const resetPlayers = () => {
    setPlayersInfo((prevState) => {
      return prevState.map(player => {
        return {
          ...player,
          isX: player.isX ? false : true
        }
      });
    });
    setCurrentPlayer(prevState => {
      let nextPlayer = playersInfo.find(player => player.isX === false);
      if(!nextPlayer) return prevState;
      nextPlayer.isX = true;
      return nextPlayer;
    });
  };

  // Function to trigger game restart
  const restart = () => {
    dispatch(clearPlayers());
    dispatch(restartGame());
  };

  // Function to trigger game rematch
  const rematch = () => {
    dispatch(restartGame());
    dispatch(playersRematch());
    setCurrentPlayer(null);
  };

  return (
    <div className="game-container">
      <p className="current-player">current player is {currentPlayer?.playerName}</p>

      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} i={i} onClick={handleClick} />
        ))}
      </div>

        {game.history && game.history?.length > 0 && (
          <GameHistory history={game.history}/>
        )}
    </div>
  );
};

export default Game;
