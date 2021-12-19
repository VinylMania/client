import React from 'react'
import Moment from 'react-moment'
import {VinyleResponse} from '../../models/albumModel'
import Link from 'next/link'

const LibraryDetail: React.FC<{
  vinyle: VinyleResponse
}> = ({vinyle}) => {
  const {user, albumTitle, albumCoverUrl, artistTitle, year, albumId} = vinyle
  return (
    <div className="p-4">
      <figure className="relative">
        <Link href={`/users/${user}/${albumId}`}>
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
        <img className="w-40 h-40" src={albumCoverUrl} alt={albumTitle} />
      </figure>
    </div>
  )
}

export default LibraryDetail
