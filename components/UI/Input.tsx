import React from 'react'
import {TextInputModel} from '../../models/textInputModel'

const Input: React.FC<TextInputModel> = ({
  id,
  type,
  name,
  label,
  placeholder,
  onChange,
  value,
  className,
  required,
  minLength,
  maxLength,
}) => (
  <div className="flex flex-col">
    <label className="flex-1 text-headline font-light text-lg" htmlFor={id}>
      {label}
    </label>
    <input
      placeholder={placeholder}
      id={id}
      type={type}
      name={name}
      onChange={onChange ? e => onChange(e.target.value.trim()) : () => {}}
      value={value}
      className={`form-text-inputs ${className}`}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  </div>
)

export default Input
