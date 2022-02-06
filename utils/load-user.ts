import axios from 'axios'
import provideConfig from './axios-config'
import {UserModel} from '../models/userModel'

export const loadUser = async (): Promise<UserModel | undefined> => {
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

      //TODO: Handle errors
      return undefined
    }
  }
}

export default loadUser
