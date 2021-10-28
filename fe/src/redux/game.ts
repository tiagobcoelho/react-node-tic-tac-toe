import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import { Player } from './players';
import axios, { AxiosResponse } from 'axios';

/**
 *  INITIAL STATE & TYPES
 * ------------------------------------------------------------------
 */
     
type SingleGame = {
  wasWon: boolean;
  wonBy?: {
    winnerId: Player["id"],
    winnerName: Player["name"]
  } 
}

export type GameState = {
  isGameChosen: boolean
  isMultiple: boolean | null;
  setsToWin?: number
  history?: SingleGame[]
}


const initialState: GameState = {
  isGameChosen: false,
  isMultiple: null,
}


/**
 *  START GAME ACTION, TYPES & FUNCTION 
 * ------------------------------------------------------------------
 */

const GAME_START = 'game/start';

interface gameStartAction extends Action<typeof GAME_START> {
  payload: GameState
}

type GameType =  "single"| "best-of-3"| "best-of-5"

export const gameStart = (gameType: GameType):ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  gameStartAction
  > => async (dispatch, getState) => {
  
    try {
      const response:AxiosResponse<GameState> = await axios.get(`/game/${gameType}`);
      const game: GameState = await response.data

      dispatch({
        type: GAME_START,
        payload: game 
      })
    } catch(e) {
      console.log(e)
    }
}


/**
 *  SET GAME HISTORY ACTION, TYPE & FUNCTION 
 * ------------------------------------------------------------------
 */

const SET_GAME_HISTORY = 'game/set-game-history';

interface setGameHistoryAction extends Action<typeof SET_GAME_HISTORY> {
  payload : GameState
}

export const setGameHistory = (wassWon: boolean, player?: Player):ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  setGameHistoryAction
  > => async (dispatch, getState) => {
    let historyEntry: SingleGame = {
      wasWon: false,
    }

    if(wassWon && player) {
      historyEntry = {
        wasWon: true,
        wonBy: {
          winnerId: player.id,
          winnerName: player.name
        }
      }
    }
  
    try {
      const response:AxiosResponse<GameState> = await axios.post(`/game/set-history`, historyEntry);
      const game: GameState = await response.data

      dispatch({
        type: SET_GAME_HISTORY,
        payload: game 
      })
    } catch(e) {
      console.log(e)
    }
}


/**
 *  GAME RESTART ACTION, TYPE & FUNCTION 
 * ------------------------------------------------------------------
 */

const GAME_RESTART = 'game/restart';

interface setGameRestartAction extends Action<typeof GAME_RESTART> {
  payload: GameState
}

export const restartGame = ():ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  setGameRestartAction
  > => async (dispatch, getState) => {
    console.log("getting here")
  
    try {
      const response:AxiosResponse<GameState> = await axios.get(`/game/restart`);
      const game: GameState = await response.data
      console.log("game restrt")

      dispatch({
        type: GAME_RESTART,
        payload: game 
      })
    } catch(e) {
      console.log(e)
    }
}


/**
 *  GAMES REDUCER
 * ------------------------------------------------------------------
 */

const gamesReducer = (
  state= initialState,
  action: gameStartAction | setGameHistoryAction | setGameRestartAction
) => {
  switch(action.type) {
    case GAME_START:
      const game = action.payload
      return {
        ...game
      }
    case SET_GAME_HISTORY:
      const newState = action.payload
      return {
        ...newState
      }
    case GAME_RESTART:
      const gameRestart = action.payload
      return {
        ...gameRestart
      }
    default:
      return state
  }
}

export default gamesReducer;