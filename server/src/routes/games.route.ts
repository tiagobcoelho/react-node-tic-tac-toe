import express, { Request, Response } from 'express';
import { Player } from './players.route';

const router = express.Router();

/**
 *  GAME TYPES
 * ------------------------------------------------------------------
 */

type SingleGame = {
  wasWon: boolean;
  wonBy?: {
    winnerId: Player["id"],
    winnerName: Player["name"],
  } ;
};

export type Game = {
  isGameChosen: boolean,
  isMultiple: boolean;
  setsToWin?: number,
  history?: SingleGame[],
};

const setsToWin: number[] = [1, 2, 3];

/**
 *  CURRENT GAME OBJECT (STORE GAME DATA)
 * ------------------------------------------------------------------
 */

let currentGame: Game = {
  isGameChosen: true,
  isMultiple: false,
  setsToWin: setsToWin[0],
  history: [],
};


/**
 *  SINGLE GAME ROUTE - GET (http://localhost:5000/game/single)
 * ------------------------------------------------------------------
 */

router.get('/single', (req: Request, res: Response) => {
  const game = {
    isGameChosen: true,
    isMultiple: false,
    setsToWin: setsToWin[0],
    history: []
  };
  currentGame = game;
  res.status(200).send(game);
});


/**
 *  BEST OF 3 GAME ROUTE - GET (http://localhost:5000/game/best-of-3)
 * ------------------------------------------------------------------
 */

router.get('/best-of-3', (req: Request, res: Response) => {
  const game = {
    isGameChosen: true,
    isMultiple: true,
    setsToWin: setsToWin[1],
    history: [],
  };
  currentGame = game;
  res.status(200).send(game);
});


/**
 *  BEST OF 5 GAME ROUTE - GET (http://localhost:5000/game/best-of-5)
 * ------------------------------------------------------------------
 */

router.get('/best-of-5', (req: Request, res: Response) => {
  const game = {
    isGameChosen: true,
    isMultiple: true,
    setsToWin: setsToWin[2],
    history: [],
  };
  currentGame = game;
  res.status(200).send(game);
});


/**
 *  SET GAME HISTORY ROUTE - POST (http://localhost:5000/game/set-history)
 * ------------------------------------------------------------------
 */

router.post('/set-history', (req: Request, res: Response) => {
  const winner = req.body;
  const newHistory = currentGame.history?.length ? [...currentGame.history, winner] : [winner];
  const newGame = {
    ...currentGame,
    history: newHistory
  };
  currentGame = newGame;
  res.status(200).send(newGame);
});

/**
 *  RESTART GAME ROUTE - GET (http://localhost:5000/game/restart)
 * ------------------------------------------------------------------
 */

router.get('/restart', (req: Request, res: Response) => {
  const game = {
    isGameChosen: false,
    isMultiple: false,
    history: [],
  };
  currentGame = game;
  res.status(200).send(game);
});

export { router };