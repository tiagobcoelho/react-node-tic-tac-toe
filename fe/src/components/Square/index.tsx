import React from 'react';
import { Player } from '../../redux/players';
import { SquareData } from '../../partials/Game';

type SqaureProps = SquareData & {
  onClick: (playerId: SquareData["value"]) => void
}

const Square:React.FC<SqaureProps> = ({ value, isFilled, isX, onClick }) => {

  const style = isX ? `squares X` : `squares O`;

  const displayValue = isFilled ? isX  ? "X" : 'O': ''

  return (
    <div>
      <button className={style} disabled={isFilled} value={value} onClick={() => onClick(value)}>
        {displayValue}
      </button>
    </div>
  );
};

export default Square;
