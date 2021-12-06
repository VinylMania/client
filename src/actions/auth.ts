import axios, {AxiosError, AxiosResponse} from 'axios'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REMOVE_ALERTS,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT,
} from './types'
import {LoginModel, RegisterModel, UserModel} from '../models/userModel'
import setAlert from './alert'
import {ErrorModel} from '../models/errorModel'
import {store} from '../store'
import provideConfig from '../utils/axios-config'

// Load User
export const loadUser =
  () =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    const config = provideConfig()

    if (config.headers['x-auth-token'].trim().length > 0) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URI}/api/auth`, config)
        .then((response: AxiosResponse<UserModel>) => {
          dispatch({type: USER_LOADED, payload: response.data})
        })
        .catch((err: AxiosError<ErrorModel>) => {
          if (err.response?.data) {
            const {errors} = err.response?.data
            if (errors) {
              errors.forEach(error => {
                dispatch(setAlert({msg: error.msg, alertType: 'warning'}))
                dispatch({type: AUTH_ERROR})
              })
            }
          } else {
            dispatch(
              setAlert({
                msg: 'Un erreur avec le serveur est survenue.',
                alertType: 'warning',
              }),
            )
          }
        })
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

    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/api/auth`, body, config)
      .then(response => {
        dispatch({type: LOGIN_SUCCESS, payload: response.data})
        dispatch(loadUser())
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const {errors} = err.response?.data

          if (errors) {
            errors.forEach(error => {
              dispatch(setAlert({msg: error.msg, alertType: 'warning'}))
            })
          }

          dispatch({type: LOGIN_FAIL})
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          )
        }
      })
  }

// Register User
export const register =
  (data: RegisterModel) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    const {username, email, password} = data
    const config = provideConfig()
    const body = JSON.stringify({username, email, password})

    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/api/users`, body, config)
      .then(response => {
        dispatch({type: REGISTER_SUCCESS, payload: response.data})
        dispatch(loadUser())
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const {errors} = err.response.data

          if (errors) {
            errors.forEach(error =>
              dispatch(setAlert({alertType: 'warning', msg: error.msg})),
            )
          }
          dispatch({type: REGISTER_FAIL})
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          )
        }
      })
  }

// Logout / Clear profile
export const logout =
  () =>
  (dispatch: typeof store.dispatch): void => {
    dispatch({type: CLEAR_PROFILE})
    dispatch({type: LOGOUT})
  }

export default login
