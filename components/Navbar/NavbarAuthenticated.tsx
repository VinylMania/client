import React from 'react'
import {CgProfile, CgDisc, CgLogOut, CgMathPlus} from 'react-icons/cg'
import {UserModel} from '../../models/userModel'
import Link from 'next/link'
import Image from 'next/image'
import {Menu, Divider} from '@mantine/core'

const NavbarAuthenticated: React.FC<{
  user: UserModel | undefined
  logout: () => void
}> = ({user, logout}) => {
  return (
    <>
      <Link href="/library/add">
        <a
          aria-label="Ajouter un vinyle"
          className="navlink text-3xl font-bold"
        >
          <CgMathPlus size={32} className="fill-current" />
        </a>
      </Link>
      <Menu
        placement="center"
        gutter={10}
        styles={{
          body: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(8px)',
            padding: '0px',
            margin: '0px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
          item: {
            padding: '12px 18px',
          },
        }}
        control={
          <button className="relative mx-auto h-[40px] w-[40px] overflow-hidden rounded-full bg-button">
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
          </button>
        }
        trigger="hover"
        shadow="lg"
        delay={50}
      >
        <Menu.Item
          icon={
            <CgDisc className="mr-2 inline-block text-xl text-button focus:text-red-500" />
          }
        >
          <Link href="/library/add">
            <a className="navlink text-left transition-all duration-300  hover:text-paragraph hover:transition-all hover:duration-300 focus:bg-red-500 focus:text-paragraph">
              Ajouter un disque
            </a>
          </Link>
        </Menu.Item>
        {user && user._id && (
          <Menu.Item
            icon={
              <CgProfile className="mr-2 inline-block text-xl text-button" />
            }
          >
            <Link href={`/users/${user._id}`}>
              <a className="navlink text-left transition-all duration-300  hover:text-paragraph hover:transition-all hover:duration-300 focus:text-paragraph">
                Mon profil
              </a>
            </Link>
          </Menu.Item>
        )}

        <Divider />
        <Menu.Item
          icon={<CgLogOut className="mr-2 inline-block text-xl text-button" />}
          onClick={() => logout()}
        >
          <button
            type="button"
            className="navlink bg-opacity-0 text-left transition-all  duration-300 hover:text-paragraph hover:transition-all hover:duration-300 focus:text-paragraph"
            onClick={() => {
              logout()
            }}
          >
            Se déconnecter
          </button>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default NavbarAuthenticated
