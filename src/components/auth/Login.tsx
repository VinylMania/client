import { Navigate } from 'react-router';
import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadUser, login } from '../../actions/auth';
import { LoginModel } from '../../models/userModel';
import Input from '../UI/Input';
import Button from '../UI/Button';
import FormContainer from './FormContainer';

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
    <FormContainer
      title="Connexion"
      link="/register"
      textLink="Pas de compte ?"
      textLinkBold="Inscrivez-vous dès maintenant !"
    >
      <form className="vinyl-form" onSubmit={(e) => onSubmit(e)}>
        <Input
          id="email"
          type="email"
          name="email"
          label="Adresse e-mail"
          placeholder="contact@vinylmania.fr"
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

        <Button type="submit" text="Se connecter" />
      </form>
    </FormContainer>
  );
};

export default Login;
