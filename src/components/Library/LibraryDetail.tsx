/* eslint-disable camelcase */
import React from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {AlbumModel} from '../../models/albumModel'
import {UserModel} from '../../models/userModel'

const LibraryDetail: React.FC<{user: UserModel; album: AlbumModel}> = ({
  album,
  user,
}) => {
  const {album_title, album_cover_url, artist_title, release_date, albumId} =
    album
  return (
    <div className="p-4 border-2 border-green-400">
      <figure className="relative">
        <Link
          to={`/users/${user._id}/${albumId}`}
          className="vinyl-wrapper absolute top-0 left-0 h-full w-full"
        >
          <ul className="p-2 overflow-hidden">
            <li className="text-xl">{artist_title}</li>
            <li className="italic">{album_title}</li>
            <li>
              <Moment format="YYYY" date={release_date} />
            </li>
          </ul>
        </Link>
        <img className="w-48 h-auto" src={album_cover_url} alt={album_title} />
      </figure>
    </div>
  )
}

export default LibraryDetail
