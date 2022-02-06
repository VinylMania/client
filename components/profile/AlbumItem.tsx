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
      <figure className="relative group w-[200px] h-[200px] overflow-hidden">
        <div className="group-focus:filter group:focus:blur-md group-hover:filter group-hover:blur-md transition-all duration-300">
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
          <a className="outline-none group bg-black bg-opacity-0 transition-all duration-300 absolute top-0 left-0 h-full w-full focus:bg-black/30 group-hover:bg-black/30  group-hover:transition-all focus:transition-all group-hover:duration-300 focus:duration-300 focus:backdrop-blur-sm">
            <ul className="absolute top-0 opacity-0 right-0 bottom-0 left-0 overflow-hidden text-white transition-all duration-300 group-hover:opacity-100 group-focus:opacity-100">
              <li className="text-lg px-2">{artistTitle}</li>
              <li className="italic px-2">{albumTitle}</li>
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
            className="outline-nonebg-black text-white border-2 border-black focus-visible:border-red-500 focus-visible:text-red-500 hover:border-red-500 focus:border-red-500 hover:text-red-500 focus:text-red-500 w-full absolute text-center bottom-0 transition-all duration-300"
          >
            Retirer ce vinyle
          </button>
        )}
      </figure>
    </>
  )
}

export default AlbumItem
