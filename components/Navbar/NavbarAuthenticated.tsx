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
        <div className="relative w-[40px] h-[40px] bg-button rounded-full overflow-hidden mx-auto">
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
        <ul className="min-w-max flex md:hidden md:right-0 md:backdrop-blur-lg md:bg-black/50 md:group-hover:flex md:shadow-2xl md:absolute z-10 flex-col">
          {user && user._id && (
            <Link href={`/users/${user._id}`}>
              <a className="navlink bg-opacity-0 transition-all duration-300 py-2 px-4 text-left hover:bg-opacity-25 bg-black hover:transition-all hover:duration-300">
                <CgProfile className="inline-block text-xl mr-2" /> Mon profil
              </a>
            </Link>
          )}

          <Link href="/library/add">
            <a className="navlink bg-opacity-0 transition-all duration-300 py-2 px-4 text-left hover:bg-opacity-25 bg-black hover:transition-all hover:duration-300">
              <CgDisc className="inline-block text-xl mr-2" />
              Ajouter un disque
            </a>
          </Link>

          <button
            type="button"
            className="navlink bg-opacity-0 transition-all duration-300 py-2 px-4 text-left hover:bg-opacity-25 bg-black  hover:transition-all hover:duration-300"
            onClick={() => {
              console.log('Clicking the button log out')
              logout()
            }}
          >
            <CgLogOut className="inline-block text-xl mr-2" />
            Se déconnecter
          </button>
        </ul>
      </div>
      <Link href="/library/add">
        <a
          aria-label="Ajouter un vinyle"
          className="hover:text-button focus:text-button md:mr-auto text-3xl font-bold"
        >
          <CgMathPlus size={32} className="fill-current" />
        </a>
      </Link>
    </>
  )
}

export default NavbarAuthenticated
