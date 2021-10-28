import React from 'react'

type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ onChange }) => {
  return (
    <input type="text" onChange={onChange} />
  )
}

export default Input;
