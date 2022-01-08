import React, {FormEvent, useState} from 'react'
import {useAppDispatch} from '../../../hooks'
import {login} from '../../../actions/auth'
import {LoginModel} from '../../../models/userModel'
import Input from '../../../components/UI/Input'
import FormContainer from '../../../components/Layout/FormContainer'
import type {NextPage} from 'next/types'

export const Login: NextPage = () => {
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<LoginModel>({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement
    setFormData({...formData, [event.name]: event.value})
  }

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault()

    dispatch(login(formData))
  }

  return (
    <FormContainer
      title="Connexion"
      link="/register"
      textLink="Pas de compte ?"
      textLinkBold="Inscrivez-vous dès maintenant !"
    >
      <form className="vinyl-form" onSubmit={e => onSubmit(e)}>
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

        <button type="submit" className="btn-submit">
          Se connecter
        </button>
      </form>
    </FormContainer>
  )
}

export default Login