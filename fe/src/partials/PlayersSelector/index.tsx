import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Redux import
import { setPlayers } from '../../redux/players';

// Component imports
import Button from '../../components/Button';
import Input from '../../components/Input';


const PlayersSelector: React.FC = () => {

  const dispatch = useDispatch();

  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");

  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    if(!player1.length || !player2.length) return setError("names can't be blank!");
    if(player1 === player2) return setError("both players can't have the same name!");
    dispatch(setPlayers([player1, player2]));
  };
  
  return (
    <div className="players-selector-container">
      <h2 className="section-title">Choose your player's names</h2>

      <div className="player-inputs-container">
        <Input 
          onChange={(e) => setPlayer1(e.target.value)} 
          label="Player 1"
          placeholder="choose player name"
        />
        <Input 
          onChange={(e) => setPlayer2(e.target.value)} 
          label="Player 2"
          placeholder="choose player name"
        />
      </div>
      {error.length > 0 && (
        <p className="input-errors">{error}</p>
      )}
      <Button skin={'primary'} onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
};


export default PlayersSelector;
