import React from 'react';
import { useDispatch } from 'react-redux';

//Redux import
import { gameStart } from '../../redux/game';

//Component import
import Button from '../../components/Button';

const GameSelector: React.FC = () => {

  const dispatch = useDispatch();

    return (
    <div className="game-selector-container">
      <h2 className="section-title">Choose the type of game</h2>
      <div className="select-game-btns-container">
      <Button skin={'primary'} onClick={() => dispatch(gameStart("single"))}>
        Single game
      </Button>
      <Button skin={'primary'} onClick={() => dispatch(gameStart("best-of-3"))}>
        Best of 3 game
      </Button>
      <Button skin={'primary'} onClick={() => dispatch(gameStart("best-of-5"))}>
        Best of 5 game
      </Button>
      </div>
    </div>
  );
};

export default GameSelector;
