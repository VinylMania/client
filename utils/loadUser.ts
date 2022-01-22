import axios, {AxiosResponse} from 'axios'
import provideConfig from './axios-config'
import {UserModel} from '../models/userModel'
import handleErrors from './errorHandler'
import AuthContext from '../src/context/auth-context'

const loadUser = async (): Promise<UserModel | undefined> => {
  const config = provideConfig()

  if (config.headers.Authorization) {
    try {
      const response = await axios.get<UserModel>(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth`,
        config,
      )
      return response.data
    } catch (err) {
      localStorage.removeItem('token')

      console.error(err)
      handleErrors(
        err as {
          error: string
          message: string | string[]
          statusCode: number
        },
      )
      return undefined

      //       dispatch({type: AUTH_FAILURE})
    }
  }
}

export default loadUser
