import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearPlayers, incrementWins, INCREMENT_WINS, Player, playersRematch } from '../../redux/players';
import { RootState } from '../../redux/store';
import { generateGamePlayers, isGameWon } from '../../helpers';
import { boardInitialState, winningScore } from './boardInitialState';
import Square from '../../components/Square';
import { restartGame, setGameHistory } from '../../redux/game';
import Modal from '../../components/Modal';
import { useModal } from '../../components/Modal/use-modal';
import GameHistory from '../../components/GameHistory';

export type SquareData = {
  value: number,
  playerId?: Player["id"],
  isFilled: boolean,
  isX?: boolean
}

export type PlayerData =  {
  playerId: Player['id'],
  playerName: Player['name']
  playerScore: number,
  isX: boolean
}

const Game:React.FC = () => {
  const dispatch = useDispatch()

  const players = useSelector((state: RootState) => state.players)
  const game = useSelector((state: RootState) => state.game)

  const [playersInfo, setPlayersInfo] = useState<PlayerData[]>(generateGamePlayers(players))
  
  const [squares, setSquares] = useState<(SquareData)[]>(boardInitialState);

  const [stepNumber, setStepNumber] = useState(1);

  const [currentPlayer, setCurrentPlayer] = useState<PlayerData | null>(null)

  const { addModal } = useModal()


  useEffect(() => {
    if(!playersInfo || currentPlayer ) return 
    setCurrentPlayer(playersInfo[0])
  }, [])

  const restart = () => {
    dispatch(clearPlayers())
    dispatch(restartGame())
  }
  

  const rematch = () => {
    dispatch(restartGame())
    dispatch(playersRematch())
    setCurrentPlayer(null)
  }

  const handleSingleGameWon = (id: PlayerData["playerId"]): void => {

    const currentWinner = players.find(player => player.id === id);
    
    if(!currentWinner || !game.setsToWin) return
    
    if(currentWinner.winsCount + 1 < game.setsToWin) {
      dispatch(incrementWins(id))
      dispatch(setGameHistory(true, currentWinner))
      setSquares(boardInitialState)
      setStepNumber(1)
      setPlayersInfo((prevState) => {
        return prevState.map(player => {
          return {
            ...player,
            playerScore: 0,
            isX: player.isX ? false : true
          }
        })
      })
      setCurrentPlayer(prevState => {
        let nextPlayer = playersInfo.find(player => player.isX === false)
        if(!nextPlayer) return prevState
        nextPlayer.isX = true
        return nextPlayer;
      })
    } else {
      addModal({
        message: `${currentWinner.name} won`,
        isFlash: false,
        rematch,
        restart
      })
    }
  }

  const handleClick = (value: SquareData["value"]): void => {

    if(!currentPlayer || !playersInfo) return

    setSquares((prevState) => {
      return prevState.map(square => {
        if(square.value === value) {
          return {
            ...square,
            playerId: currentPlayer.playerId,
            isFilled: true,
            isX: currentPlayer.isX ? true : false
          }
        }
        return square
      })
    })
    
    setCurrentPlayer(prevState => {
      const nextPlayer = playersInfo.find(player => player.playerId !== currentPlayer.playerId)
      return nextPlayer ? nextPlayer : prevState;
    })

    if(stepNumber > 4){
      if(isGameWon(winningScore, currentPlayer.playerScore + value)) return handleSingleGameWon(currentPlayer.playerId)
    }

    if(stepNumber === 9) setTie()

    setPlayersInfo(prevState => {
      if(!prevState) return prevState
      return prevState.map(player => {
        if(player.playerId === currentPlayer.playerId) {
          return {
            ...player,
            playerScore: player.playerScore + value
          }
        }
        return player
      })
    })

    setStepNumber(state => state + 1)
  }

  const setTie = () => {   
    // IF MULTIPLE
      setSquares(boardInitialState)
      // dispatch set history action with the tie
      dispatch(setGameHistory(false))
      
      // display flash message saying it was a tie
      addModal({
        isFlash: true,
        message: "the game was a tie"
      })
  }

  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square.value} isFilled={square.isFilled} isX={square.isX} onClick={handleClick} />
      ))}

        <p>current player is {currentPlayer?.playerName}</p>

        {game.history && game.history?.length > 0 && (
          <GameHistory history={game.history}/>
        )}
    </div>
  );
};

export default Game;
