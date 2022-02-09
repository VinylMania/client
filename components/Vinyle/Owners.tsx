import React from 'react'
import {VinyleResponse} from '../../models/albumModel'
import Image from 'next/image'
import Link from 'next/link'
import LoadingSpinner from '../UI/LoadingSpinner'
import {useQuery} from 'react-query'
import axios from 'axios'
import {ErrorBoundary} from 'react-error-boundary'
import VinyleLinkItem from './VinyleLinkItem'
import LoadingError from '../UI/LoadingError'

const getSimilarVinyles = async (
  albumId: VinyleResponse['albumId'],
  userId: VinyleResponse['user']['_id'],
): Promise<VinyleResponse[]> => {
  const {data} = await axios.get<VinyleResponse[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/owners/${albumId}`,
  )
  return data.filter(vinyle => vinyle.user._id !== userId)
}

const Owners: React.FC<{
  albumId: VinyleResponse['albumId']
  vinyle: VinyleResponse
}> = ({albumId, vinyle}) => {
  const {data: similarVinyles} = useQuery(
    'similarVinyles',
    async () => {
      return await getSimilarVinyles(albumId, vinyle.user._id)
    },
    {
      onError: err => {
        console.error(err)
      },
    },
  )

  return (
    <>
      {similarVinyles && similarVinyles.length > 0 && (
        <div className="flex-1 bg-slate-600 py-4">
          <h2 className="py-4 text-center text-2xl font-bold">
            Utilisateurs possédant ce vinyle
          </h2>
          <div className="relative mx-auto h-[128px] w-[128px] overflow-hidden rounded-full">
            <Image
              alt={vinyle.artistTitle}
              layout="fill"
              objectFit="cover"
              quality={50}
              src={vinyle.artistCoverUrl}
              placeholder="blur"
              blurDataURL={vinyle.artistCoverUrl}
            />
          </div>
          <ErrorBoundary fallback={<LoadingError />}>
            <div className="mx-auto w-2/3 overflow-hidden py-4">
              {similarVinyles &&
                similarVinyles
                  .filter(album => album.user._id !== vinyle.user._id)
                  .map(artistVinyle => (
                    <VinyleLinkItem
                      key={artistVinyle._id}
                      text={artistVinyle.user.username}
                      avatar={artistVinyle.user.avatar}
                      link={`/vinyles/${artistVinyle._id}`}
                      alt={`Image de profil de ${artistVinyle.user.username}`}
                    />
                  ))}
            </div>
          </ErrorBoundary>
        </div>
      )}
    </>
  )
}

export default Owners
