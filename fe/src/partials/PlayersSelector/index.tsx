import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { setPlayers } from '../../redux/players';


const PlayersSelector: React.FC = () => {

  const dispatch = useDispatch()

  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [error, setError] = useState<boolean>(false)
  const handleSubmit = () => {
    if(player1 === player2) return setError(true)
    dispatch(setPlayers([player1, player2]))
  }
  
  return (
    <div>
      {error && (
        <p>both players can't have the same name</p>
      )}
      <Input onChange={(e) => setPlayer1(e.target.value)}/>
      <Input onChange={(e) => setPlayer2(e.target.value)}/>
      <Button skin={'primary'} onClick={handleSubmit}>
        Next
      </Button>
    </div>
  )
}


export default PlayersSelector;
