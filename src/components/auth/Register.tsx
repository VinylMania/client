import React, { FormEvent, useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../UI/Input';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RegisterModel } from '../../models/userModel';
import { loadUser, register } from '../../actions/auth';
import setAlert, { removeAllAlerts } from '../../actions/alert';
import Button from '../UI/Button';
import FormContainer from './FormContainer';

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
      dispatch(setAlert({ msg: "Password don't match", alertType: 'warning' }));
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
    return <Navigate to="/home" />;
  }

  return (
    <FormContainer
      title="Inscription"
      link="/login"
      textLink="Déjà inscrit ?"
      textLinkBold="Je me connecte"
    >
      <form className="vinyl-form" onSubmit={(e) => onSubmit(e)}>
        <Input
          id="username"
          label="Pseudonyme"
          type="text"
          name="username"
          placeholder="Bob Dylan"
          onChange={onChange}
          value={username}
          required
        />
        <Input
          id="email"
          type="email"
          name="email"
          label="Adresse e-mail"
          placeholder="bob.dylan@gmail.com"
          onChange={onChange}
          value={email}
          required
        />

        <Input
          id="password"
          type="password"
          name="password"
          label="Mot de passe"
          placeholder="********"
          onChange={onChange}
          value={password}
          required
        />

        <Input
          id="password2"
          type="password"
          name="password2"
          label="Confirmation du mot de passe"
          placeholder="********"
          onChange={onChange}
          value={password2}
          required
        />

        <Button type="submit" text="Je m'inscris" />
      </form>
    </FormContainer>
  );
};

export default Register;
