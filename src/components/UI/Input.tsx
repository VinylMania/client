import React from 'react';
import { TextInputModel } from '../../models/textInputModel';

const Input: React.FC<TextInputModel> = (props) => {
  const { id, type, name, placeholder, onChange, value, className, required } =
    props;
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
      value={value}
      className={className}
      required={required}
    />
  );
};

export default Input;
