import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import {UserModel} from '../../../models/userModel'

const UserDetail: React.FC<{user: UserModel}> = ({user}) => {
  const {username, avatar, _id: userId} = user
  return (
    <div className="w-44 mx-2 flex flex-col items-center text-white">
      <h1 className="font-semibold text-second">{username}</h1>
      <Image
        className="h-auto rounded-full my-2 shadow-xl"
        layout="intrinsic"
        width={200}
        height={200}
        quality={50}
        src={avatar}
        alt={`Avatar de ${username}`}
        placeholder="blur"
        blurDataURL={avatar}
      />
      <Link href={`/users/${userId}`}>
        <a className="btn-submit">Consulter le profil</a>
      </Link>
    </div>
  )
}

export default UserDetail
