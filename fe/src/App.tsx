import React from 'react';
import './styles/App.scss';
import GameSelector  from './partials/GameSelector';
import PlayersSelector from './partials/PlayersSelector';
import { useSelector } from 'react-redux'
import { RootState } from './redux/store';
import { GameState } from './redux/game';
import Game from './partials/Game';
import Modal from './components/Modal';

const App: React.FC = () => {

  const players = useSelector((state: RootState)=> state.players)
  const game = useSelector((state: RootState): GameState => state.game)

  return (
    <div className="App">
     {!game.isGameChosen && players.length > 0 && (
       <GameSelector />
     )}

     {!players.length &&  (
       <PlayersSelector />
     )}

    {players.length > 0  && game.isGameChosen  &&(
     <Modal>
       <Game />
     </Modal>
    )}
    </div>
  );
}

export default App;
