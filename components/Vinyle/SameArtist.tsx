import React from 'react'
import {VinyleResponse} from '../../models/albumModel'
import Image from 'next/image'
import {useQuery} from 'react-query'
import axios from 'axios'
import {ErrorBoundary} from 'react-error-boundary'
import VinyleLinkItem from './VinyleLinkItem'
import LoadingError from '../UI/LoadingError'

const getArtistVinyles = async (
  artistId: VinyleResponse['artistId'],
  vinyleId: VinyleResponse['_id'],
): Promise<VinyleResponse[]> => {
  const {data} = await axios.get<VinyleResponse[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/artist/${artistId}`,
  )
  return data.filter(vinyle => vinyle._id !== vinyleId)
}

const SameArtist: React.FC<{
  artistId: VinyleResponse['artistId']
  vinyle: VinyleResponse
}> = ({artistId, vinyle}) => {
  const {data: artistVinyles} = useQuery('artistVinyles', () =>
    getArtistVinyles(artistId, vinyle._id),
  )
  return (
    <>
      {artistVinyles && artistVinyles.length > 0 && (
        <div className="w-fit px-4">
          <h2 className="text-center italic">Du même artiste</h2>
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
            <div className="flex flex-col flex-wrap gap-2 py-4">
              {artistVinyles &&
                artistVinyles.length > 0 &&
                React.Children.toArray(
                  artistVinyles
                    .filter(album => album._id !== vinyle._id)
                    .map(artistVinyle => (
                      <VinyleLinkItem
                        key={artistVinyle._id}
                        text={
                          artistVinyle.albumTitle.split('-')[1] ??
                          artistVinyle.albumTitle
                        }
                        avatar={artistVinyle.albumCoverUrl}
                        link={`/library/${artistVinyle._id}`}
                        alt={`Image de profil de ${artistVinyle.user.username}`}
                      />
                    )),
                )}
              {!artistVinyles && (
                <p className="mx-auto block w-max rounded-full bg-white bg-opacity-20 p-2 px-4 text-center text-lg">
                  Aucun résultat
                </p>
              )}
            </div>
          </ErrorBoundary>
        </div>
      )}
    </>
  )
}

export default SameArtist
