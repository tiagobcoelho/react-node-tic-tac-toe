import React, { useState } from 'react';

// Redux imports
import { useSelector } from 'react-redux'
import { RootState } from './redux/store';
import { GameState } from './redux/game';

// Component import
import Modal from './components/Modal';

// Partials imports
import WelcomeScreen from './partials/WelcomeScreen';
import PlayersSelector from './partials/PlayersSelector';
import GameSelector  from './partials/GameSelector';
import Game from './partials/Game';


const App: React.FC = () => {

  // Redux state
  const players = useSelector((state: RootState)=> state.players);
  const game = useSelector((state: RootState): GameState => state.game);

  // Local State
  const [welcomeScreen, setWelcomeScreen] = useState(true);

  return (
    <div className="app-container">

      {welcomeScreen && (
        <WelcomeScreen onClick={() => setWelcomeScreen(false)}/>
      )}

      {!players.length && !welcomeScreen && (
        <PlayersSelector />
      )}

     {!game.isGameChosen && players.length > 0 && (
       <GameSelector />
     )}


    {players.length > 0  && game.isGameChosen  &&(
     <Modal>
       <Game />
     </Modal>
    )}
    </div>
  );
};

export default App;
