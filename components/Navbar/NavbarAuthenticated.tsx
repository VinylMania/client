import React from 'react'
import {CgProfile, CgDisc, CgLogOut, CgMathPlus} from 'react-icons/cg'
import {UserModel} from '../../models/userModel'
import Link from 'next/link'
import Image from 'next/image'

const NavbarAuthenticated: React.FC<{
  user: UserModel | undefined
  logout: () => void
}> = ({user, logout}) => {
  return (
    <>
      <div className="group relative ml-2 hover:cursor-pointer">
        <div className="relative mx-auto h-[40px] w-[40px] overflow-hidden rounded-full bg-button">
          {user && user.avatar && (
            <Image
              src={user.avatar}
              alt="Avatar de profil"
              layout="fill"
              objectFit="cover"
              quality={25}
              priority
              placeholder="empty"
            />
          )}
        </div>
        <ul className="z-10 flex min-w-max flex-col md:absolute md:right-0 md:hidden md:bg-black/50 md:shadow-2xl md:backdrop-blur-lg md:group-hover:flex">
          {user && user._id && (
            <Link href={`/users/${user._id}`}>
              <a className="navlink bg-black bg-opacity-0 py-2 px-4 text-left transition-all duration-300 hover:bg-opacity-25 hover:transition-all hover:duration-300">
                <CgProfile className="mr-2 inline-block text-xl" /> Mon profil
              </a>
            </Link>
          )}

          <Link href="/library/add">
            <a className="navlink bg-black bg-opacity-0 py-2 px-4 text-left transition-all duration-300 hover:bg-opacity-25 hover:transition-all hover:duration-300">
              <CgDisc className="mr-2 inline-block text-xl" />
              Ajouter un disque
            </a>
          </Link>

          <button
            type="button"
            className="navlink bg-black bg-opacity-0 py-2 px-4 text-left transition-all duration-300 hover:bg-opacity-25  hover:transition-all hover:duration-300"
            onClick={() => {
              console.log('Clicking the button log out')
              logout()
            }}
          >
            <CgLogOut className="mr-2 inline-block text-xl" />
            Se déconnecter
          </button>
        </ul>
      </div>
      <Link href="/library/add">
        <a
          aria-label="Ajouter un vinyle"
          className="text-3xl font-bold hover:text-button focus:text-button md:mr-auto"
        >
          <CgMathPlus size={32} className="fill-current" />
        </a>
      </Link>
    </>
  )
}

export default NavbarAuthenticated
