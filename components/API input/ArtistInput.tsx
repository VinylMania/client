import React, {useEffect, useState} from 'react'
import {DiscogArtistModel} from '../../models/discogModel'
import LoadingSpinner from '../UI/LoadingSpinner'
import {useQuery} from 'react-query'
import axios, {AxiosResponse} from 'axios'
import provideConfig from '../../utils/axios-config'
import {flushSync} from 'react-dom'
import Image from 'next/image'

const getArtist = async (artistName: string): Promise<DiscogArtistModel[]> => {
  const response = await axios.post<string, AxiosResponse<DiscogArtistModel[]>>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/discog/artist`,
    JSON.stringify({artist: artistName}),
    provideConfig(),
  )
  return response.data
}

const ArtistInput: React.FC<{
  isArtistInputLocked: boolean
  selectedArtist: DiscogArtistModel | undefined
  artistName: DiscogArtistModel['name']
  setArtistName: React.Dispatch<React.SetStateAction<string>>
  setSelectedArtist: React.Dispatch<
    React.SetStateAction<DiscogArtistModel | undefined>
  >
  artistInputRef: React.MutableRefObject<HTMLInputElement | null>
}> = ({
  artistInputRef,
  isArtistInputLocked,
  artistName,
  selectedArtist,
  setArtistName,
  setSelectedArtist,
}) => {
  const [displayList, setDisplayList] = useState(false)

  const onClick = (artist: DiscogArtistModel): void => {
    flushSync(() => {
      setSelectedArtist(artist)
      setDisplayList(false)
    })
  }

  const {
    data: artists,
    refetch,
    isLoading,
  } = useQuery(
    'getArtists',
    () => {
      return getArtist(artistName)
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
      suspense: false,
    },
  )

  const onChange = (e: React.FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement
    setArtistName(event.value)
  }

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (artistName && artistName.length > 1) {
        setDisplayList(true)
        refetch()
      } else {
        setDisplayList(false)
      }
    }, 200)

    return () => {
      clearTimeout(identifier)
    }
  }, [artistName, refetch])

  return (
    <>
      <label className="w-full font-semibold text-xl" htmlFor="artist">
        Nom de l&apos;artiste
      </label>
      <input
        ref={artistInputRef}
        id="artist"
        className="form-text-inputs"
        type="text"
        minLength={2}
        maxLength={20}
        required
        onChange={onChange}
        autoComplete="off"
        value={selectedArtist ? selectedArtist.name : artistName}
        disabled={isArtistInputLocked}
      />
      {isLoading && <LoadingSpinner />}

      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {!isLoading &&
          artists &&
          displayList &&
          artists.map(artist => (
            <div className="flex-1" key={artist.id}>
              <button
                onClick={() => onClick(artist)}
                className="group outline-none cursor-pointer text-paragraph transition-all duration-300 overflow-hidden"
                type="button"
              >
                <span>{artist.name}</span>
                <div className="border-transparent border group-hover:border-button group-focus:border-button  relative w-[160px] h-[160px] overflow-hidden">
                  <Image
                    alt={artist.name}
                    layout="fill"
                    objectFit="contain"
                    quality={50}
                    src={artist.image}
                    placeholder="blur"
                    blurDataURL={artist.image}
                  />
                </div>
              </button>
            </div>
          ))}
      </div>
      {!isLoading && artists && artists.length === 0 && (
        <p className="p-2 text-center text-first text-sm bg-buttonText">
          Aucun résultat trouvé
        </p>
      )}
    </>
  )
}

export default ArtistInput
