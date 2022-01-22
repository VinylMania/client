import React, {useEffect, useState} from 'react'
import {VinyleResponse} from '../../models/albumModel'

const Filters: React.FC<{
  vinyles: VinyleResponse[]
  setFilters: React.Dispatch<React.SetStateAction<VinyleResponse[] | undefined>>
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
          <label className="flex-1 text-headline font-light text-lg">
            Nom de l&apos;artiste
            <input
              className="block text-black rounded-xl p-2 w-full"
              type="text"
              placeholder="Bruce Springsteen"
              onChange={e => setArtistName(e.target.value.toLowerCase().trim())}
            />
          </label>
          <label className="flex-1 text-headline font-light text-lg">
            Nom de l&apos;album
            <input
              className="block text-black rounded-xl p-2 w-full"
              type="text"
              placeholder="Born In The U.S.A."
              onChange={e => setAlbumTitle(e.target.value.toLowerCase().trim())}
            />
          </label>
        </form>
      </section>
    </>
  )
}

export default Filters
