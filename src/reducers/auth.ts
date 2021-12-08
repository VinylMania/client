import {AnyAction} from 'redux'
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
} from '../actions/types'

export default function authReducer(state = [], action: AnyAction): any {
  const {type, payload} = action
  switch (type) {
    case USER_LOADED:
      return {...state, isAuthenticated: true, loading: false, user: payload}
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem('token')
      return {isAuthenticated: false}
    default:
      return state
  }
}
