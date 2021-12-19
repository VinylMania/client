import React from 'react'
import {TextInputModel} from '../../../models/textInputModel'

const Input: React.FC<TextInputModel> = props => {
  const {
    id,
    type,
    name,
    label,
    placeholder,
    onChange,
    value,
    className,
    required,
  } = props
  return (
    <>
      <label className="font-semibold text-xl" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        name={name}
        onChange={e => onChange(e)}
        value={value}
        className={`my-4 p-2 ${className}`}
        required={required}
      />
    </>
  )
}

export default Input
