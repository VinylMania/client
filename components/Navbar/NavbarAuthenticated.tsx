import React from 'react'
import {CgProfile, CgDisc, CgLogOut} from 'react-icons/cg'
import {logout} from '../../actions/auth'
import {UserModel} from '../../models/userModel'
import {useAppDispatch} from '../../hooks'
import Link from 'next/link'
import Image from 'next/image'
import profilePic from '../../public/mystery-man.jpg'
import styles from '../../styles/avatar.module.css'

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
        <div className="w-8 h-8 rounded-full border-2 border-third bg-third overflow-hidden">
          <Image
            placeholder="blur"
            blurDataURL={profilePic}
            src={`https:${authReducer?.user?.avatar}`}
            alt="Avatar de profil"
            layout="intrinsic"
            quality={60}
            priority
            width={40}
            height={40}
          />
        </div>
        <ul className="min-w-max dropdown-content bg-second shadow-2xl absolute z-10 flex flex-col">
          <Link href={`users/${authReducer?.user?._id}`}>
            <a className="text-gray-50 hover:underline text-left">
              <CgProfile className="inline-block text-xl mr-2" /> Mon profil
            </a>
          </Link>

          <Link href="/library/add">
            <a className="text-gray-50 hover:underline text-left">
              <CgDisc className="inline-block text-xl mr-2" />
              Ajouter un disque
            </a>
          </Link>

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
