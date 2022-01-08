import React from 'react'
import Moment from 'react-moment'
import Image from 'next/image'
import {VinyleResponse} from '../../models/albumModel'
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
      className="relative w-72 flex flex-col overflow-hidden text-second p-4"
    >
      <figcaption>
        <p className="font-bold">{albumTitle}</p>
        <p className="font-thin italic">
          {artistTitle} - <Moment format="YYYY">{year}</Moment>
        </p>
      </figcaption>
      <Image
        alt={albumTitle}
        src={albumCoverUrl}
        blurDataURL={albumCoverUrl}
        placeholder="blur"
        layout="intrinsic"
        width={200}
        height={200}
        quality={50}
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
