import React, {FormEvent, useContext, useRef, useState} from 'react'
import {RegisterModel} from '../../models/userModel'
import FormContainer from '../Layout/FormContainer'
import AuthContext from '../../context/auth-context'
import {useMutation} from 'react-query'
import provideConfig from '../../utils/axios-config'
import axios, {AxiosResponse} from 'axios'
import {AlertWrapper} from '../Alerts/Alerts'
import ButtonLoader from '../UI/ButtonLoader'
import {AlertModel} from '../../models/alertModel'
import {flushSync} from 'react-dom'

const RegisterForm: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterModel>({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const [alerts, setAlerts] = useState<AlertModel[]>([])
  const alertRef = useRef<HTMLDivElement>(null)

  const mutation = useMutation(
    async (userCreds: RegisterModel) => {
      const {data} = await axios.post<
        string,
        AxiosResponse<{accessToken: string}>
      >(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/register`,
        JSON.stringify(userCreds),
        provideConfig(),
      )
      return data.accessToken
    },
    {
      onSuccess: (token: string) => {
        token && localStorage.setItem('token', token)
        // loadUser()
        console.log(token)
        loadUser()
      },
      onError: (err: any) => {
        resetContext()
        let newAlerts: AlertModel[] = []

        if (Array.isArray(err.response?.data?.message)) {
          err.response?.data?.message?.forEach((message: string) => {
            newAlerts.push({alertType: 'warning', msg: message})
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
    if (registerData.password !== registerData.password2) {
      setAlerts([
        {msg: 'Les mots de passe ne correspondent pas', alertType: 'warning'},
      ])
    } else {
      setAlerts([])
      mutation.mutate(registerData)
    }
  }

  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement
    setRegisterData({...registerData, [event.name]: event.value})
  }

  return (
    <>
      <div ref={alertRef}>{alerts && <AlertWrapper alerts={alerts} />}</div>
      <FormContainer
        title="Inscription"
        textLink="Déjà inscrit ?"
        textLinkBold="Je me connecte"
      >
        <form onSubmit={onFormSubmit}>
          <fieldset
            className="w-full flex flex-col gap-y-8"
            disabled={mutation.isLoading}
          >
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <label
                  className="flex-1 text-headline font-light text-lg"
                  htmlFor="username"
                >
                  Surnom
                </label>
                <input
                  placeholder="adresse@email.fr"
                  id="username"
                  type="text"
                  name="username"
                  onChange={onChange}
                  className="form-text-inputs"
                  minLength={2}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="flex-1 text-headline font-light text-lg"
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
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <label
                  className="flex-1 text-headline font-light text-lg"
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

              <div className="flex flex-col">
                <label
                  className="flex-1 text-headline font-light text-lg"
                  htmlFor="password2"
                >
                  Confirmation de MDP
                </label>
                <input
                  id="password2"
                  type="password"
                  name="password2"
                  onChange={onChange}
                  className="form-text-inputs"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <button
              type="submit"
              className="group btn-submit mt-auto flex items-center disabled:cursor-not-allowed"
            >
              {mutation.isLoading && <ButtonLoader />}
              Je m&apos;inscris !
            </button>
          </fieldset>
        </form>
      </FormContainer>
    </>
  )
}

export default RegisterForm
