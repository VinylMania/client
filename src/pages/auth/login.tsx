import React, {FormEvent, useContext, useState} from 'react'
import {useAppDispatch} from '../../../hooks'
import {LoginModel, UserModel} from '../../../models/userModel'
import Input from '../../../components/UI/Input'
import FormContainer from '../../../components/Layout/FormContainer'
import type {NextPage} from 'next/types'
import {useQuery} from 'react-query'
import provideConfig from '../../../utils/axios-config'
import axios, {AxiosResponse} from 'axios'
import handleErrors from '../../../utils/errorHandler'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import loadUser from '../../../utils/loadUser'
import AuthContext from '../../context/auth-context'

const loginUser = async (userCredentials: LoginModel): Promise<string> => {
  const config = provideConfig()
  const body = JSON.stringify(userCredentials)
  //TODO: remove alerts

  const {data} = await axios.post<string, AxiosResponse<{accessToken: string}>>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/login`,
    body,
    config,
  )
  data.accessToken && localStorage.setItem('token', data.accessToken)
  return data.accessToken || ''

  //   if (response.data.accessToken) {
  //     return response.data
  //     //TODO: LOAD UESR
  //     // dispatch({type: AUTH_SUCCESS, payload: response.data})
  //     // dispatch(loadUser())
  //   }
  // } catch (err) {
  //   console.log(err)
  //   console.log(err)
  //   console.log(err)
  //   handleErrors(
  //     err as {error: string; message: string | string[]; statusCode: number},
  //   )
  //TODO: dispatch({type: AUTH_FAILURE})
}

export const Login: NextPage = () => {
  // const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<LoginModel>({
    email: '',
    password: '',
  })
  const {login} = useContext(AuthContext)

  const {email, password} = formData

  const {
    data: userToken,
    status,
    refetch,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    'loginUser',
    async () => {
      loginUser(formData)
      await loadUser()
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      useErrorBoundary: true,
    },
  )

  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement
    setFormData({...formData, [event.name]: event.value})
  }

  const onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    refetch()
    login()
  }

  return (
    <FormContainer
      title="Connexion"
      link="/auth/register"
      textLink="Pas de compte ?"
      textLinkBold="Inscrivez-vous dès maintenant !"
    >
      <div className="bg-slate-200 space-x-2 space-y-8">
        {isError && <div>Error</div>}
        {isSuccess && <div>Success</div>}
        {status && <div>{JSON.stringify(status)}</div>}
        {isLoading && <div>Loading</div>}
      </div>

      <form
        className="w-full flex flex-col gap-2 px-8
        "
        onSubmit={e => onSubmit(e)}
      >
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

        <button
          type="submit"
          className="group btn-submit mt-auto flex items-center disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-button group-hover:text-buttonText"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Se connecter
        </button>
      </form>
    </FormContainer>
  )
}

export default Login
