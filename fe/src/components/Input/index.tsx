import React from 'react';

// Component Props type
type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  label: string,
  placeholder: string,
};

const Input: React.FC<InputProps> = ({ onChange, label, placeholder }) => {
  return (
    <div className="input-container">
      <label htmlFor={label} className="input-label">{label}</label>
      <input 
        type="text" 
        id={label} 
        className="input" 
        placeholder={placeholder}
        onChange={onChange} 
      />
    </div>
  );
};

export default Input;
