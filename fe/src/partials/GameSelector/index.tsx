import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { gameStart } from '../../redux/game';
import Button from '../../components/Button';

const GameSelector: React.FC = () => {

  const game = useSelector((state: RootState) => state.game)
  const dispatch = useDispatch()

    return (
    <div>
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
  )
}


export default GameSelector;
