import {AnyAction} from 'redux'
import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  USER_LOADED,
  LOGOUT,
  DELETE_ACCOUNT,
} from '../actions/types'

export default function authReducer(state = [], action: AnyAction): any {
  const {type, payload} = action
  switch (type) {
    case USER_LOADED:
      return {...state, isAuthenticated: true, loading: false, user: payload}
    case AUTH_SUCCESS:
      if (!payload.accessToken) {
        return state
      }
      localStorage.setItem('token', payload.accessToken)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      }
    case AUTH_FAILURE:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem('token')
      return {isAuthenticated: false}
    default:
      return state
  }
}
