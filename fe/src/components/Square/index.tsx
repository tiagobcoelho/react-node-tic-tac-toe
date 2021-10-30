import React, { useEffect, useState } from 'react';

// SVG imports
import SvgX from '../SVG/X';
import SvgO from '../SVG/O';

// Component Props type
type SqaureProps = {
  value: null | string,
  i: number,
  onClick: (value: number) => void,
};

const Square:React.FC<SqaureProps> = ({ value, i, onClick }) => {

  const [size, setSize] = useState<string>('0');

  const isX = value === 'x';
  const isFilled = value !== null;

  useEffect(() => {
    const width = window.innerWidth;

    if(width < 480) {
      setSize('50px');
    } else {
      setSize('80px');
    }
  }, []);

  return (
    <button 
      className="square" 
      disabled={isFilled} 
      onClick={() => onClick(i)}
    >
      {isFilled ? isX ? (
        <SvgX fontSize={size}/>
      ) : (
        <SvgO fontSize={size} />
      ): (
        ''
      )}
    </button>
  );
};

export default Square;
