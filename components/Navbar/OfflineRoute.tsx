import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {useAppSelector} from '../../../src/hooks'

const OfflineRoute: React.FC = () => {
  const {
    isAuthenticated,
    loading,
  }: {isAuthenticated: boolean; loading: boolean} = useAppSelector(
    state => state.root.authReducer,
  )
  if (isAuthenticated && !loading) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

export default OfflineRoute
