import React from 'react'
import Moment from 'react-moment'
import {VinyleResponse} from '../models/albumModel'
import Link from 'next/link'
import Image from 'next/image'

const LibraryDetail: React.FC<{
  vinyle: VinyleResponse
}> = ({vinyle}) => {
  const {user, albumTitle, albumCoverUrl, artistTitle, year, albumId} = vinyle
  return (
    <div>
      <figure className="relative">
        <Link href={`/users/${user}`}>
          <a className="vinyl-wrapper absolute top-0 left-0 h-full w-full">
            <ul className="p-2 overflow-hidden">
              <li className="text-xl">{artistTitle}</li>
              <li className="italic">{albumTitle}</li>
              <li>
                <Moment format="YYYY" date={year} />
              </li>
            </ul>
          </a>
        </Link>
        <Image
          alt={albumTitle}
          layout="intrinsic"
          width={200}
          height={200}
          blurDataURL={albumCoverUrl}
          src={albumCoverUrl}
          quality={50}
          placeholder="blur"
        />
      </figure>
    </div>
  )
}

export default LibraryDetail
