import React, {FormEvent, useContext, useRef, useState} from 'react'
import {LoginModel} from '../../models/userModel'
import FormContainer from '../Layout/FormContainer'
import {useMutation} from 'react-query'
import provideConfig from '../../utils/axios-config'
import axios, {AxiosResponse} from 'axios'
import AuthContext from '../../context/auth-context'
import AlertWrapper from '../Alerts/Alerts'
import type {AlertModel} from '../../models/alertModel'
import ButtonLoader from '../UI/ButtonLoader'
import {flushSync} from 'react-dom'
import {NextPage} from 'next'

export const LoginForm: NextPage = () => {
  const [formData, setFormData] = useState<LoginModel>({
    email: '',
    password: '',
  })

  const [alerts, setAlerts] = useState<AlertModel[]>([])
  const alertRef = useRef<HTMLDivElement>(null)

  const mutation = useMutation(
    async (userCreds: LoginModel) => {
      const {data} = await axios.post<
        string,
        AxiosResponse<{accessToken: string}>
      >(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/login`,
        JSON.stringify(userCreds),
        provideConfig(),
      )
      return data.accessToken
    },
    {
      onSuccess: (token: string) => {
        token && localStorage.setItem('token', token)
        loadUser()
      },
      onError: (err: any) => {
        resetContext()
        let newAlerts: AlertModel[] = []
        if (
          err.response?.data?.message &&
          Array.isArray(err.response?.data?.message)
        ) {
          err.response?.data?.message?.forEach((message: string) => {
            newAlerts.push({
              alertType: 'warning',
              msg: message,
            })
          })
        } else {
          newAlerts.push({
            alertType: 'warning',
            msg: 'Une erreur serveur est revenue. Veuillez réessayer.',
          })
        }

        flushSync(() => {
          setAlerts(newAlerts)
        })
        alertRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        })
      },
    },
  )

  const {loadUser, resetContext} = useContext(AuthContext)

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAlerts([])
    mutation.mutate(formData)
  }

  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement
    setFormData({...formData, [event.name]: event.value})
  }

  return (
    <>
      <div ref={alertRef}>{alerts && <AlertWrapper alerts={alerts} />}</div>
      <FormContainer
        title="Connexion"
        textLink="Pas de compte ?"
        textLinkBold="Inscrivez-vous dès maintenant !"
      >
        <form className="w-full px-8" onSubmit={onFormSubmit}>
          <fieldset
            className="flex w-full flex-col gap-y-8"
            disabled={mutation.isLoading}
          >
            <div className="flex flex-col">
              <label
                className="flex-1 text-lg font-light text-headline"
                htmlFor="email"
              >
                Adresse e-mail
              </label>
              <input
                placeholder="adresse@email.fr"
                id="email"
                type="email"
                name="email"
                onChange={onChange}
                className="form-text-inputs"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                className="flex-1 text-lg font-light text-headline"
                htmlFor="password"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={onChange}
                className="form-text-inputs"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="group btn-submit mt-auto flex items-center disabled:cursor-not-allowed"
            >
              {mutation.isLoading && <ButtonLoader />}
              Se connecter
            </button>
          </fieldset>
        </form>
      </FormContainer>
    </>
  )
}

export default LoginForm
