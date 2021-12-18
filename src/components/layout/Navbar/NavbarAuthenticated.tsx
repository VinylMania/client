import React from 'react'
import {CgProfile, CgDisc, CgLogOut} from 'react-icons/cg'
import {logout} from '../../../actions/auth'
import {UserModel} from '../../../models/userModel'
import {useAppDispatch} from '../../../hooks'
import CustomLink from '../CustomLink'

const NavbarAuthenticated: React.FC<{
  authReducer: {
    isAuthenticated: boolean
    loading: boolean
    user: UserModel
  }
}> = ({authReducer}) => {
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="dropdown relative ml-2">
        <img
          src={authReducer?.user?.avatar}
          alt="Avatar de profil"
          className="rounded-full w-12 border-2 border-third"
        />
        <ul className="min-w-max dropdown-content bg-second shadow-2xl absolute z-10 flex flex-col">
          <CustomLink
            className="text-gray-50 hover:underline text-left"
            to={`users/${authReducer?.user?._id}`}
          >
            <CgProfile className="inline-block text-xl mr-2" /> Mon profil
          </CustomLink>

          <CustomLink
            className="text-gray-50 hover:underline text-left"
            to="/add-vinyl"
          >
            <CgDisc className="inline-block text-xl mr-2" />
            Ajouter un disque
          </CustomLink>

          <button
            type="button"
            className="text-gray-50 hover:underline text-left"
            onClick={() => dispatch(logout())}
          >
            <CgLogOut className="inline-block text-xl mr-2" />
            Se déconnecter
          </button>
        </ul>
      </div>
    </>
  )
}

export default NavbarAuthenticated
