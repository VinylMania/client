import {Button} from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {User as UserIcon} from 'react-feather'
import {UserModel} from '../../models/userModel'

const User: React.FC<{user: UserModel}> = ({user}) => {
  return (
    <div className="w-full rounded-lg border-2 border-button  p-4 shadow-lg">
      <figure className="flex flex-col items-center justify-center gap-2">
        <div className="relative mx-auto h-[120px] w-[120px] overflow-hidden rounded-full">
          {user && user.avatar && (
            <Image
              src={user.avatar}
              alt={`avatar de ${user.username}`}
              layout="fill"
              objectFit="cover"
              quality={30}
              priority
              placeholder="empty"
            />
          )}
        </div>

        <h2 className="text-lg font-semibold">{user.username}</h2>
        <div className="flex w-full justify-center">
          <Link href={`/users/${user._id}`} passHref>
            <Button
              component="a"
              className="rounded-lg border-2 border-current bg-black/40 p-2 text-button transition-all hover:bg-button hover:text-black"
              leftIcon={<UserIcon size={20} />}
            >
              Voir le profil
            </Button>
          </Link>
        </div>
      </figure>
    </div>
  )
}

export default User
