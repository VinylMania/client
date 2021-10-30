import React, { FormEvent, useState } from 'react';
import { Redirect } from 'react-router';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RegisterModel } from '../../models/userModel';
import { loadUser, register } from '../../actions/auth';
import setAlert, { removeAllAlerts } from '../../actions/alert';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<RegisterModel>({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;
  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement;
    setFormData({ ...formData, [event.name]: event.value });
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(removeAllAlerts());
    if (password !== password2) {
      dispatch(setAlert({ msg: "Password don't match", alertType: 'danger' }));
    } else {
      dispatch(register(formData));
      dispatch(loadUser());
    }
  };

  //  Redirect if user authenticated
  const isAuth = useAppSelector(
    (state) => state.root.authReducer.isAuthenticated,
  );

  if (isAuth) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="border-blue-300 mx-auto w-3/5 border-2 p-6 rounded-xl flex flex-row">
      <h2 className="text-2xl text-center">Connexion</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <Input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          onChange={onChange}
          value={username}
          className="border-2 border-black border-opacity-50 rounded-2xl p-2"
          required
        />
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email address"
          onChange={onChange}
          value={email}
          className="border-2 border-black border-opacity-50 rounded-2xl p-2"
          required
        />

        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Pasword"
          onChange={onChange}
          value={password}
          className="border-2 border-black border-opacity-50 rounded-2xl p-2"
          required
        />

        <Input
          id="password2"
          type="password"
          name="password2"
          placeholder="Confirm password"
          onChange={onChange}
          value={password2}
          className="border-2 border-black border-opacity-50 rounded-2xl p-2"
          required
        />

        <input
          type="submit"
          className="text-white bg-blue-600 border-1 text-center p-2 m-2 rounded-xl cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Register;
