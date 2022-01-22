import React from 'react'
import {VinyleResponse} from '../../models/albumModel'
import Image from 'next/image'
import Link from 'next/link'
import LoadingSpinner from '../UI/LoadingSpinner'
import {useQuery} from 'react-query'

const getArtistVinyles = async (
  artistId: VinyleResponse['artistId'],
): Promise<VinyleResponse[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/artist/${artistId}`,
  )
  return await response.json()
}

const SameArtist: React.FC<{
  artistId: VinyleResponse['artistId']
  vinyle: VinyleResponse
}> = ({artistId, vinyle}) => {
  const {
    data: artistVinyles,
    isLoading: isArtistLoading,
    isError: isArtistError,
  } = useQuery('artistVinyles', () => getArtistVinyles(artistId))
  return (
    <>
      {isArtistLoading && <LoadingSpinner />}
      {isArtistError && <p>Une erreur est survenue.</p>}
      {!isArtistLoading && artistVinyles && (
        <div className="w-1/3 bg-slate-900 py-4">
          <h2 className="py-4 text-2xl font-bold text-center">
            Du même artiste
          </h2>
          <div className="mx-auto overflow-hidden relative w-[128px] h-[128px] rounded-full">
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
          <div className="w-2/3 py-4 overflow-hidden mx-auto">
            {artistVinyles.length > 0 &&
              React.Children.toArray(
                artistVinyles
                  .filter(album => album._id !== vinyle._id)
                  .map(artistVinyle => (
                    <Link
                      key={artistVinyle._id}
                      href={`/vinyles/${artistVinyle._id}`}
                    >
                      <a className="block p-2 font-thin bg-black hover:bg-third whitespace-nowrap">
                        {artistVinyle.albumTitle}
                      </a>
                    </Link>
                  )),
              )}
            {artistVinyles.length <= 1 && (
              <p className="text-lg text-center mx-auto block p-2 px-4 bg-white bg-opacity-20 rounded-full w-max">
                Aucun résultat
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default SameArtist
