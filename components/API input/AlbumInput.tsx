import React, {SetStateAction, useEffect, useRef, useState} from 'react'
import {DiscogAlbumModel, DiscogArtistModel} from '../../models/discogModel'
import LoadingSpinner from '../UI/LoadingSpinner'
import {useQuery} from 'react-query'
import axios, {AxiosResponse} from 'axios'
import provideConfig from '../../utils/axios-config'
import {flushSync} from 'react-dom'
import Image from 'next/image'

const getAlbum = async (
  selectedArtist: DiscogArtistModel,
  albumTitle: string,
): Promise<DiscogAlbumModel[]> => {
  const response = await axios.post<string, AxiosResponse<DiscogAlbumModel[]>>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/discog/album`,
    JSON.stringify({artist: selectedArtist.name, album: albumTitle}),
    provideConfig(),
  )
  return response.data
}

const AlbumInput: React.FC<{
  isAlbumInputLocked: boolean
  selectedAlbum: DiscogAlbumModel | undefined
  albumInputRef: React.MutableRefObject<HTMLInputElement | null>
  selectedArtist: DiscogArtistModel
  setSelectedAlbum: React.Dispatch<SetStateAction<DiscogAlbumModel | undefined>>
}> = ({
  isAlbumInputLocked,
  selectedArtist,
  selectedAlbum,
  albumInputRef,
  setSelectedAlbum,
}) => {
  const [albumTitle, setAlbumTitle] = useState('')
  const [displayAlbumList, setDisplayAlbumList] = useState(false)

  const onClick = (album: DiscogAlbumModel): void => {
    flushSync(() => {
      setSelectedAlbum(album)
      setDisplayAlbumList(false)
    })
  }

  const {
    data: albums,
    refetch,
    isLoading,
  } = useQuery(
    'getAlbums',
    () => {
      return getAlbum(selectedArtist, albumTitle)
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
    setAlbumTitle(event.value)
  }

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (albumTitle && albumTitle.length > 1) {
        setDisplayAlbumList(true)
        refetch()
      } else {
        setDisplayAlbumList(false)
      }
    }, 200)

    return () => {
      clearTimeout(identifier)
    }
  }, [albumTitle, refetch])

  return (
    <>
      <label className="w-full font-semibold text-xl" htmlFor="artist">
        Titre de l&apos;album
      </label>
      <input
        ref={albumInputRef}
        id="album"
        className="form-text-inputs"
        type="text"
        minLength={1}
        maxLength={20}
        required
        onChange={onChange}
        autoComplete="off"
        value={selectedAlbum ? selectedAlbum.name : albumTitle}
        disabled={isAlbumInputLocked}
      />
      {isLoading && <LoadingSpinner />}

      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {!isLoading &&
          albums &&
          displayAlbumList &&
          albums.map(album => (
            <div className="flex-1" key={album.id}>
              <button
                onClick={() => onClick(album)}
                className="group outline-none cursor-pointer text-paragraph transition-all duration-300 overflow-hidden"
                type="button"
              >
                <span>{album.name}</span>
                <div className="border-transparent border group-hover:border-button group-focus:border-button  relative w-[160px] h-[160px] overflow-hidden">
                  <Image
                    alt={album.name}
                    layout="fill"
                    objectFit="contain"
                    quality={50}
                    src={album.image}
                    placeholder="blur"
                    blurDataURL={album.image}
                  />
                </div>
              </button>
            </div>
          ))}
      </div>
      {!isLoading && albums && albums.length === 0 && (
        <p className="p-2 text-center text-first text-sm bg-buttonText">
          Aucun résultat trouvé
        </p>
      )}
    </>
  )
}

export default AlbumInput
