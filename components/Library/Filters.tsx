import {searchVinyleQuery} from 'library'
import React, {useEffect, useState} from 'react'

const Filters: React.FC<{
  setFilters: React.Dispatch<
    React.SetStateAction<
      | {
          artistTitle: searchVinyleQuery['artistTitle']
          albumTitle: searchVinyleQuery['albumTitle']
        }
      | undefined
    >
  >
}> = ({setFilters}) => {
  const [params, setParams] = useState<{
    artistTitle: searchVinyleQuery['artistTitle']
    albumTitle: searchVinyleQuery['albumTitle']
  }>({artistTitle: '', albumTitle: ''})

  useEffect(() => {
    const interval = setInterval(() => {
      setFilters(params)
    }, 2500)
    console.log(params)

    return () => {
      clearInterval(interval)
    }
  }, [params, setFilters])

  return (
    <>
      <section className="flex flex-col justify-center pt-8">
        <h2 className="text-3xl font-semibold text-headline">
          Affiner la recherche
        </h2>
        <form className="flex flex-col gap-8 py-8 md:flex-row">
          <div className="flex flex-1 flex-col">
            <label
              className="text-lg font-light text-headline"
              htmlFor="artist-name"
            >
              Nom de l&apos;artiste
            </label>
            <input
              placeholder="Bruce Springsteen"
              id="artist-name"
              type="text"
              name="artist-name"
              value={params.artistTitle}
              onChange={e =>
                setParams({
                  ...params,
                  artistTitle: e.target.value.toLowerCase(),
                })
              }
              className="form-text-inputs uppercase"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label
              className="text-lg font-light text-headline"
              htmlFor="album-name"
            >
              Nom de l&apos;album
            </label>
            <input
              placeholder="Born In The U.S.A."
              id="album-name"
              type="text"
              name="album-name"
              value={params.albumTitle}
              onChange={e =>
                setParams({
                  ...params,
                  albumTitle: e.target.value.toLowerCase(),
                })
              }
              className="form-text-inputs uppercase"
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Filters
