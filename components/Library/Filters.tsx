import React, {useEffect, useState} from 'react'
import {VinyleResponse} from '../../models/albumModel'
import Input from '../UI/Input'

const Filters: React.FC<{
  vinyles: VinyleResponse[]
  setFilters: React.Dispatch<
    React.SetStateAction<VinyleResponse[] | null | undefined>
  >
}> = ({vinyles, setFilters}) => {
  const [artistName, setArtistName] = useState('')
  const [albumTitle, setAlbumTitle] = useState('')

  useEffect(() => {
    if (vinyles?.length) {
      if (!artistName.length && !albumTitle.length) {
        return setFilters(vinyles)
      }
      if (albumTitle.length && !artistName.length)
        return setFilters(
          vinyles.filter(lib =>
            lib.albumTitle.toLowerCase().includes(albumTitle),
          ),
        )
      if (artistName.length && !albumTitle.length)
        return setFilters(
          vinyles.filter(lib =>
            lib.artistTitle.toLowerCase().includes(artistName),
          ),
        )

      if (artistName.length && albumTitle.length)
        return setFilters(
          vinyles.filter(
            lib =>
              lib.artistTitle.toLowerCase().includes(artistName) &&
              lib.albumTitle.toLowerCase().includes(albumTitle),
          ),
        )
    }
  }, [artistName, albumTitle, vinyles, setFilters])

  return (
    <>
      <section className="pt-8 flex flex-col justify-center">
        <h2 className="text-headline text-3xl font-semibold">
          Affiner la recherche
        </h2>
        <form className="flex flex-col md:flex-row gap-8 py-8">
          <div className="flex flex-col flex-1">
            <label
              className="text-headline font-light text-lg"
              htmlFor="artist-name"
            >
              Nom de l&apos;artiste
            </label>
            <input
              placeholder="Bruce Springsteen"
              id="artist-name"
              type="text"
              name="artist-name"
              onChange={e => setArtistName(e.target.value.toLowerCase().trim())}
              className="form-text-inputs uppercase"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              className="text-headline font-light text-lg"
              htmlFor="album-name"
            >
              Nom de l&apos;album
            </label>
            <input
              placeholder="Born In The U.S.A."
              id="album-name"
              type="text"
              name="album-name"
              onChange={e => setAlbumTitle(e.target.value.toLowerCase().trim())}
              className="form-text-inputs uppercase"
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Filters
