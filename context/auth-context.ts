import React from 'react'
import type {UserModel} from '../models/userModel'
const AuthContext = React.createContext({
  isAuthenticated: false,
  logout: () => {
    localStorage.removeItem('token')
  },
  loadUser: () => {},
  updateAvatar: (avatar: UserModel['avatar']) => {},
  user: {} as UserModel | undefined,
  resetContext: () => {},
})
export default AuthContext
