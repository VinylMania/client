import { Navigate } from 'react-router';
import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadUser, login } from '../../actions/auth';
import { LoginModel } from '../../models/userModel';
import Input from '../UI/Input';

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginModel>({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement;
    setFormData({ ...formData, [event.name]: event.value });
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    dispatch(login(formData));
    dispatch(loadUser());
  };

  // Redirect if user authenticated
  const isAuth = useAppSelector(
    (state) => state.root.authReducer.isAuthenticated,
  );

  if (isAuth) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="border-blue-300 mx-auto w-3/5 border-2  p-6 rounded-xl">
      <h2 className="text-2xl text-center">Connexion</h2>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
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

        <input
          type="submit"
          className="text-white bg-blue-600 border-1 text-center p-2 m-2 rounded-xl cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
