import React from 'react'
import Moment from 'react-moment'

import {VinyleResponse} from '../../../models/albumModel'
import 'moment/locale/fr'
import RemoveAlbumItem from './Edit/RemoveAlbumItem'

const AlbumItem: React.FC<{
  album: VinyleResponse
  isAuth: boolean
  isOwner: boolean
}> = ({album, isAuth, isOwner}) => {
  const {_id, albumCoverUrl, year, artistTitle, albumTitle} = album

  return (
    <figure
      id={_id}
      className="w-72 flex flex-col overflow-hidden text-second p-4"
    >
      <figcaption>
        <p className="font-bold">{albumTitle}</p>
        <p className="font-thin italic">
          {artistTitle} - <Moment format="YYYY">{year}</Moment>
        </p>
      </figcaption>
      <img
        className="w-64 h-auto items-center self-center"
        src={albumCoverUrl}
        alt={albumTitle}
      />
      {isAuth && isOwner && (
        <>
          <RemoveAlbumItem type="trade" albumId={_id} albumTitle={albumTitle} />
          <RemoveAlbumItem
            type="delete"
            albumId={_id}
            albumTitle={albumTitle}
          />{' '}
        </>
      )}
    </figure>
  )
}

export default AlbumItem
