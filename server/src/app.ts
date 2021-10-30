import express, { Application, NextFunction, Request, Response } from 'express';
import {router as gamesRouter } from './routes/games.route';
import { router as playersRouter } from './routes/players.route';

const app: Application = express();

const port = 5000;

/**
 *  EXPRESS MIDDLEWARES
 * ------------------------------------------------------------------
 */

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


/**
 *  EXPRESS ROUTES
 * ------------------------------------------------------------------
 */
app.use('/game', gamesRouter);
app.use('/players', playersRouter);


app.listen(port, () => console.log(`server running on port ${port}`));