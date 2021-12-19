import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {useAppSelector} from '../../hooks'

const PrivateRoute: React.FC = () => {
  const {
    isAuthenticated,
    loading,
  }: {isAuthenticated: boolean; loading: boolean} = useAppSelector(
    state => state.root.authReducer,
  )
  if (isAuthenticated && !loading) {
    return <Outlet />
  }
  return <Navigate to="/" />
}

export default PrivateRoute
