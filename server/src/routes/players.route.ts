import express, { Request, Response } from 'express';

const router = express.Router();

/**
 *  PLAYER TYPE
 * ------------------------------------------------------------------
 */

export type Player = {
  id: number,
  name: string,
  winsCount: number,
};


/**
 *  PLAYERS ARRAY (STORE PLAYERS DATA)
 * ------------------------------------------------------------------
 */

let players: Player[] = [];


/**
 *  SET PLAYERS ROUTE - POST (http://localhost:5000/players)
 * ------------------------------------------------------------------
 */

router.post('/', (req: Request, res: Response) => {
  const playersNames = req.body;
  const tempPlayers: Player[] = [];

  playersNames.map((playerName: string, i: number) => {
    const p = {
      id: i,
      name: playerName,
      winsCount: 0
    };
    tempPlayers.push(p);
  });
  players = tempPlayers;
  res.status(200).send(players);
});


/**
 *  INCREMENT PLAYER WINS ROUTE - POST (http://localhost:5000/players/increment)
 * ------------------------------------------------------------------
 */

router.post('/increment', (req: Request, res: Response) => {
  const { id }  = req.body;
  const tempPlayers = players.map(player => {
    return {
      ...player,
      winsCount: player.id === id ? player.winsCount + 1 : player.winsCount
    };
  });
  players = tempPlayers;
  res.status(200).send(players);
});


/**
 *  RESTART PLAYERS ROUTE - GET (http://localhost:5000/players/restart)
 * ------------------------------------------------------------------
 */

router.get('/restart', (req: Request, res: Response) => {
  players = [];
  res.status(200).send(players);
});


/**
 *  REMATCH PLAYERS ROUTE - GET (http://localhost:5000/players/rematch)
 * ------------------------------------------------------------------
 */

router.get('/rematch', (req: Request, res: Response) => {
  const newPlayers = players.map(player => {
    return {
      ...player,
      winsCount: 0
    };
  }).reverse();
  players = newPlayers;
  res.status(200).send(players);
});

export { router };