import axios, {AxiosResponse} from 'axios'
import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  REMOVE_ALERTS,
  USER_LOADED,
  CLEAR_PROFILE,
  LOGOUT,
} from './types'
import {LoginModel, RegisterModel, UserModel} from '../models/userModel'
import handleErrors from '../utils/errorHandler'
import {store} from '../store'
import provideConfig from '../utils/axios-config'

// Load User
export const loadUser =
  () =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    const config = provideConfig()

    if (config.headers.Authorization) {
      try {
        const response = await axios.get<AxiosResponse<UserModel>>(
          `${process.env.REACT_APP_BACKEND_URI}/api/auth`,
          config,
        )

        dispatch({type: USER_LOADED, payload: response.data})
      } catch (err) {
        handleErrors(
          err as {
            error: string
            message: string | string[]
            statusCode: number
          },
        )

        dispatch({type: AUTH_FAILURE})
      }
    }
  }

// Login User
export const login =
  (data: LoginModel) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    dispatch({type: REMOVE_ALERTS})
    const {email, password} = data
    const config = provideConfig()
    const body = JSON.stringify({email, password})

    try {
      const response = await axios.post<
        string,
        AxiosResponse<{accessToken: string}>
      >(`${process.env.REACT_APP_BACKEND_URI}/api/auth/login`, body, config)

      if (response.data.accessToken) {
        dispatch({type: AUTH_SUCCESS, payload: response.data})
        dispatch(loadUser())
      }
    } catch (err) {
      handleErrors(
        err as {error: string; message: string | string[]; statusCode: number},
      )
      dispatch({type: AUTH_FAILURE})
    }
  }

// Register User
export const register =
  (registerModel: RegisterModel) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    const {username, email, password} = registerModel
    const config = provideConfig()
    const body = JSON.stringify({username, email, password})

    try {
      const {data} = await axios.post<
        string,
        AxiosResponse<{accessToken: string}>
      >(`${process.env.REACT_APP_BACKEND_URI}/api/auth/register`, body, config)

      if (data.accessToken) {
        dispatch({type: AUTH_SUCCESS, payload: data})
        dispatch(loadUser())
      }
    } catch (err) {
      handleErrors(
        err as {error: string; message: string | string[]; statusCode: number},
      )
      dispatch({type: AUTH_FAILURE})
    }
  }

// Logout / Clear profile
export const logout =
  () =>
  (dispatch: typeof store.dispatch): void => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
  }

export default login
