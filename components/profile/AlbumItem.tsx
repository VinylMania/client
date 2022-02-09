import React, {FormEvent} from 'react'
import Moment from 'react-moment'
import Image from 'next/image'
import {VinyleResponse} from '../../models/albumModel'
import 'moment/locale/fr'
import Link from 'next/link'
import axios, {AxiosResponse} from 'axios'
import provideConfig from '../../utils/axios-config'
import {QueryObserverResult, useQuery} from 'react-query'

const deleteVinyle = async (albumId: VinyleResponse['_id']): Promise<void> => {
  const {data} = await axios.delete<string, AxiosResponse>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/${albumId}`,
    provideConfig(),
  )
}

const AlbumItem: React.FC<{
  album: VinyleResponse
  isAuth: boolean
  isOwner: boolean
  refreshAlbums: () => Promise<QueryObserverResult<VinyleResponse[], unknown>>
}> = ({refreshAlbums, album, isAuth, isOwner}) => {
  const {_id, albumCoverUrl, year, artistTitle, albumTitle} = album

  const {data, isLoading, refetch} = useQuery(
    'deleteVinyle',
    () => {
      deleteVinyle(_id)
    },
    {
      retry: false,
      enabled: false,
      suspense: false,
      onSuccess: () => {},
      onError: err => {},
    },
  )
  const onClick = (e: FormEvent) => {
    e.preventDefault()
    refetch()
    refreshAlbums()
  }

  return (
    <>
      <figure className="group relative h-[200px] w-[200px] overflow-hidden">
        <div className="group:focus:blur-md transition-all duration-300 group-hover:blur-md group-hover:filter group-focus:filter">
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
          <a className="group absolute top-0 left-0 h-full w-full bg-black bg-opacity-0 outline-none transition-all duration-300 focus:bg-black/30 focus:backdrop-blur-sm  focus:transition-all focus:duration-300 group-hover:bg-black/30 group-hover:transition-all group-hover:duration-300">
            <ul className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus:opacity-100">
              <li className="px-2 text-lg">{artistTitle}</li>
              <li className="px-2 italic">{albumTitle}</li>
              <li className="px-2">
                <Moment format="YYYY" date={year} />
              </li>
            </ul>
          </a>
        </Link>
        {isAuth && isOwner && (
          <button
            type="button"
            onClick={onClick}
            className="outline-nonebg-black absolute bottom-0 w-full border-2 border-black text-center text-white transition-all duration-300 hover:border-red-500 hover:text-red-500 focus:border-red-500 focus:text-red-500 focus-visible:border-red-500 focus-visible:text-red-500"
          >
            Retirer ce vinyle
          </button>
        )}
      </figure>
    </>
  )
}

export default AlbumItem
