import React from 'react'
import {VinyleResponse} from '../../models/albumModel'
import Image from 'next/image'
import Link from 'next/link'
import LoadingSpinner from '../UI/LoadingSpinner'
import {useQuery} from 'react-query'

const getSimilarVinyles = async (
  albumId: VinyleResponse['albumId'],
): Promise<VinyleResponse[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/similar/${albumId}`,
  )
  return await response.json()
}

const Owners: React.FC<{
  albumId: VinyleResponse['albumId']
  vinyle: VinyleResponse
}> = ({albumId, vinyle}) => {
  const {
    data: similarVinyles,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
  } = useQuery('similarVinyles', () => getSimilarVinyles(albumId))
  return (
    <>
      {isSimilarLoading && <LoadingSpinner />}
      {isSimilarError && <p>Une erreur est survenue.</p>}
      {!isSimilarLoading && similarVinyles && (
        <div className="w-1/3 bg-slate-600 py-4">
          <h2 className="py-4 text-2xl font-bold text-center">
            Utilisateurs possédant ce vinyle
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
            {JSON.stringify(isSimilarError)}
            {/* {JSON.stringify(similarVinyles)} */}
            {/* {similarVinyles &&
              similarVinyles
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
                ))} */}
          </div>
        </div>
      )}
    </>
  )
}

export default Owners
