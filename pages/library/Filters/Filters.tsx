import React, {useEffect, useState} from 'react'
import {VinyleResponse} from '../../../models/albumModel'

const Filters: React.FC<{
  libraries: VinyleResponse[]
  setFilteredLibs: React.Dispatch<React.SetStateAction<VinyleResponse[]>>
}> = ({libraries, setFilteredLibs}) => {
  const [artistName, setArtistName] = useState('')
  const [albumTitle, setAlbumTitle] = useState('')

  useEffect(() => {
    if (libraries?.length) {
      if (!artistName.length && !albumTitle.length) {
        return setFilteredLibs(libraries)
      }
      if (albumTitle.length && !artistName.length)
        return setFilteredLibs(
          libraries.filter(lib =>
            lib.albumTitle.toLowerCase().includes(albumTitle),
          ),
        )
      if (artistName.length && !albumTitle.length)
        return setFilteredLibs(
          libraries.filter(lib =>
            lib.artistTitle.toLowerCase().includes(artistName),
          ),
        )

      if (artistName.length && albumTitle.length)
        return setFilteredLibs(
          libraries.filter(
            lib =>
              lib.artistTitle.toLowerCase().includes(artistName) &&
              lib.albumTitle.toLowerCase().includes(albumTitle),
          ),
        )
    }
  }, [artistName, albumTitle, libraries, setFilteredLibs])

  return (
    <>
      <section className="bg-fourth p-8 border border-black">
        <h2 className="text-2xl font-medium">Filtres</h2>
        <form className="flex flex-col max-w-xl">
          <label className="py-4">
            Nom de l&apos;artiste
            <input
              className="block rounded-xl p-2 w-full"
              type="text"
              placeholder="Bruce Springsteen"
              onChange={e => setArtistName(e.target.value.toLowerCase().trim())}
            />
          </label>
          <label className="py-4">
            Nom de l&apos;album
            <input
              className="block rounded-xl p-2 w-full"
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
