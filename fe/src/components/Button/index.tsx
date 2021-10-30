import React from 'react';

// Component Props type
type ButtonProps = {
  skin: "primary" | "secondary",
  onClick: () => void,
};

const Button: React.FC<ButtonProps> = ({ children ,skin , onClick}) => {
  return (
    <button onClick={onClick} className={`button button-${skin}`}>
      {children}
    </button>
  );
};

export default Button;
