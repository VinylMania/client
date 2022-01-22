import React from 'react'
import Moment from 'react-moment'
import {VinyleResponse} from '../../models/albumModel'
import Link from 'next/link'
import Image from 'next/image'

const LibraryDetail: React.FC<{
  vinyle: VinyleResponse
}> = ({vinyle}) => {
  const {albumTitle, albumCoverUrl, artistTitle, year, _id} = vinyle
  return (
    <div className="flex-initial">
      <figure className="relative group w-[200px] h-[200px] overflow-hidden">
        <div className="group-hover:filter group-hover:blur-md transition-all duration-300">
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
        </div>
        <Link href={`/vinyles/${_id}`}>
          <a className="bg-black bg-opacity-0 transition-all duration-300 absolute top-0 left-0 h-full w-full hover:bg-black hover:bg-opacity-30 hover:transition-all hover:duration-300">
            <ul className="absolute top-0 opacity-0 right-0 bottom-0 left-0 overflow-hidden text-white transition-all duration-500 hover:opacity-100">
              <li className="text-lg px-2">{artistTitle}</li>
              <li className="italic px-2">{albumTitle}</li>
              <li className="px-2">
                <Moment format="YYYY" date={year} />
              </li>
            </ul>
          </a>
        </Link>
      </figure>
    </div>
  )
}

export default LibraryDetail
