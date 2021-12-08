import React from 'react'
import Moment from 'react-moment'

import {AlbumModel} from '../../models/albumModel'
import 'moment/locale/fr'
import RemoveAlbumItem from './Edit/RemoveAlbumItem'

const AlbumItem: React.FC<{
  album: AlbumModel
  isAuth: boolean
  isOwner: boolean
}> = ({album, isAuth, isOwner}) => {
  const {album_cover_url, release_date, artist_title, album_title} = album

  return (
    <figure
      id={album.albumId}
      className="w-72 flex flex-col overflow-hidden text-second p-4"
    >
      <figcaption>
        <p className="font-bold">{album_title}</p>
        <p className="font-thin italic">
          {artist_title} - <Moment format="YYYY">{release_date}</Moment>
        </p>
      </figcaption>
      <img
        className="w-64 h-auto items-center self-center"
        src={album_cover_url}
        alt={album_title}
      />
      {isAuth && isOwner && (
        <>
          <RemoveAlbumItem
            type="trade"
            albumId={album._id}
            albumTitle={album_title}
          />
          <RemoveAlbumItem
            type="delete"
            albumId={album._id}
            albumTitle={album_title}
          />{' '}
        </>
      )}
    </figure>
  )
}

export default AlbumItem
