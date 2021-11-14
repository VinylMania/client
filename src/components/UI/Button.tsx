/* eslint-disable react/require-default-props */
import React from 'react';

const Button: React.FC<{
  text: string;
  type: 'submit' | 'button';
  className?: string;
  clickHandler?: () => void;
}> = ({ text, type, className, clickHandler }) => (
  <button
    type={type === 'submit' ? 'submit' : 'button'}
    onClick={clickHandler}
    className={`btn-submit ${className || ''}`}
  >
    {text}
  </button>
);

export default Button;
