/* eslint-disable no-underscore-dangle */

import React from 'react'
import {Link} from 'react-router-dom'
import {useAppSelector} from '../../hooks'
import {UserModel} from '../../models/userModel'

import NavbarAuthenticated from './Navbar/NavbarAuthenticated'
import NavbarOffline from './Navbar/NavbarOffline'

export const Navbar: React.FC = () => {
  const authReducer: {
    isAuthenticated: boolean
    loading: boolean
    user: UserModel
  } = useAppSelector(state => state.root.authReducer)
  const isAuth = authReducer.isAuthenticated

  return (
    <header className="bg-second">
      <nav className="flex justify-center items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white p-2 hover:underline"
        >
          Accueil
        </Link>
        <ul className="items-end flex flex-row justify-end flex-nowrap">
          <Link className="text-gray-50 hover:underline p-2" to="/library">
            <p>Bibliothèque</p>
          </Link>
          {isAuth && <NavbarAuthenticated authReducer={authReducer} />}
          {!isAuth && <NavbarOffline />}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
