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
      <a className="flex flex-row items-start justify-start bg-black p-2 font-thin hover:bg-third focus:bg-third">
        <div className="relative h-[36px] w-[36px] overflow-hidden rounded-full">
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
