import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';
import axios, { AxiosResponse } from 'axios'

/**
 *  INITIAL STATE & TYPES
 * ------------------------------------------------------------------
 */

export type Player = {
  id: number;
  name: string;
  winsCount: number
}

export type PlayersState = Player[] 

const initialState : PlayersState = []


/**
 *  SET PLAYERS ACTION, TYPE & FUNCTION
 * ------------------------------------------------------------------
 */

export const SET_PLAYERS = 'players/set';

interface setPlayersAction extends Action<typeof SET_PLAYERS> {
  payload: PlayersState;
}

export const setPlayers = (names: string[]):ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  setPlayersAction
  > => async (dispatch, getState) => {
  
    try {
      const response:AxiosResponse<PlayersState> = await axios.post('/players', names);
      const players: PlayersState = await response.data

      dispatch({
        type: SET_PLAYERS,
        payload: players 
      })
    } catch(e) {
      console.log(e)
    }
}


/**
 *  INCREMENT PLAYER WINS ACTION, TYPE & FUNCTION
 * ------------------------------------------------------------------
 */

export const INCREMENT_WINS = 'players/increment-wins'

interface incrementWinsAction extends Action<typeof INCREMENT_WINS> {
  payload: PlayersState;
}

export const incrementWins = (id: Player["id"]):ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  incrementWinsAction
  > => async dispatch => {
    const data = {
      id
    }
  
    try {
      const response:AxiosResponse<PlayersState> = await axios.post('/players/increment', data);
      const players: PlayersState = await response.data

      dispatch({
        type: INCREMENT_WINS,
        payload: players 
      })
    } catch(e) {
      console.log(e)
    }
}


/**
 *  CLEAR PLAYERS ACTION, TYPE & FUNCTION
 * ------------------------------------------------------------------
 */

const CLEAR_PLAYERS = 'players/clear'

interface clearPlayersAction extends Action<typeof CLEAR_PLAYERS> {
  payload: PlayersState;
}

export const clearPlayers = ():ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  clearPlayersAction
  > => async dispatch => {

    try {
      const response:AxiosResponse<PlayersState> = await axios.get(`/players/restart`);
      const players: PlayersState = await response.data

      dispatch({
        type: CLEAR_PLAYERS,
        payload: players 
      })
    } catch(e) {
      console.log(e)
    }
}


/**
 *  RESTART PLAYERS ACTION, TYPE & FUNCTION
 * ------------------------------------------------------------------
 */

const PLAYERS_REMATCH = 'players/rematch'

interface playersRematchAction extends Action<typeof PLAYERS_REMATCH> {
  payload: PlayersState;
}

export const playersRematch = ():ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  playersRematchAction
  > => async (dispatch, getState) => {

    try {
      const response:AxiosResponse<PlayersState> = await axios.get(`/players/rematch`);
      const players: PlayersState = await response.data

      dispatch({
        type: PLAYERS_REMATCH,
        payload: players 
      })
    } catch(e) {
      console.log(e)
    }
}


/**
 *  PLAYERS REDUCER
 * ------------------------------------------------------------------
 */

const playersReducer = (
  state = initialState,
  action: setPlayersAction | incrementWinsAction | clearPlayersAction | playersRematchAction
) => {
  switch(action.type) {
    case SET_PLAYERS:
      return action.payload
    case INCREMENT_WINS:
      return action.payload
    case CLEAR_PLAYERS:
      return action.payload
    case PLAYERS_REMATCH:
      return action.payload
    default:
      return state
  }
}

export default playersReducer;

