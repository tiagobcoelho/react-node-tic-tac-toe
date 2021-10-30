import React from 'react';

// Component import
import Button from 'src/components/Button';

type WelcomeScreenProps = {
  onClick: () => void,
};

const WelcomeScreen:React.FC<WelcomeScreenProps> = ({ onClick }) => {
  return (
    <div className="welcome-screen-container">
      <h1 className="welcome-title">Tic Tac Toe</h1>
      <Button skin="primary" onClick={onClick}>
        start
      </Button>
    </div>
  );
};

export default WelcomeScreen;
