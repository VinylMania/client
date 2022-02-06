import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {VinyleResponse} from '../../models/albumModel'

const VinyleLinkItem: React.FC<{
  link: string
  avatar: VinyleResponse['user']['avatar']
  text: string
  alt: string
}> = ({link, alt, avatar, text}) => {
  return (
    <Link key={link} href={link} scroll={false}>
      <a className="flex flex-row items-start justify-start p-2 font-thin bg-black hover:bg-third focus:bg-third">
        <div className="overflow-hidden relative w-[36px] h-[36px] rounded-full">
          <Image
            alt={alt}
            layout="fill"
            objectFit="cover"
            quality={50}
            src={avatar}
            placeholder="blur"
            blurDataURL={avatar}
          />
        </div>
        <p className="pl-2 capitalize">{text}</p>
      </a>
    </Link>
  )
}

export default VinyleLinkItem
