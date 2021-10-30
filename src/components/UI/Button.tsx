import React from 'react';
import { useAppDispatch } from '../../hooks';
import { setAlert } from '../../actions/alert';

const Button: React.FC<{ text: string }> = (props) => {
  const { text } = props;
  const dispatch = useAppDispatch();
  return (
    <button
      className="btn-submit"
      type="button"
      onClick={() => {
        dispatch(setAlert({ msg: 'This is a mistake', alertType: 'warning' }));
      }}
    >
      {text}
    </button>
  );
};

export default Button;
