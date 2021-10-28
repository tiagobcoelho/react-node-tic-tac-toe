import React from 'react';

type ButtonProps = {
  skin: "primary" | "secondary",
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ children ,skin , onClick}) => {
  return (
    <button onClick={onClick} className={`button butto-${skin}`}>
      {children}
    </button>
  )
}

export default Button;
