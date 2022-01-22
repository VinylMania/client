import React from 'react'
import {UserModel} from '../../models/userModel'
const AuthContext = React.createContext({
  isLoading: true,
  isAuthenticated: false,
  logout: () => {
    localStorage.removeItem('token')
  },
  login: () => {},
  user: {} as UserModel | undefined,
})
export default AuthContext
