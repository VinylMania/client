import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {getArtists} from '../../actions/discogs'
import SuggestedItem from './SuggestedItem'
import {DiscogArtistModel} from '../../models/discogModel'
import EmptyResult from './EmptyResult'
import LoadingSpinner from '../UI/LoadingSpinner'
import {CLEAR_ARTISTS} from '../../actions/types'
import LockInput from './LockInput'

const ArtistInput: React.FC = () => {
  const [query, setQuery] = React.useState<{artist: string; album: string}>({
    artist: '',
    album: '',
  })
  const dispatch = useAppDispatch()
  const artists: {
    search: DiscogArtistModel[]
    loading: boolean
    searching: boolean
    selected: DiscogArtistModel
    locked: boolean
  } = useAppSelector(state => state.root.discogsReducer.artists)

  const {search, searching, loading, selected, locked} = artists

  const onChange = (e: React.FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement
    setQuery({...query, artist: event.value})
  }

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (query?.artist && query.artist.length > 1) {
        dispatch(getArtists(query))
      } else {
        dispatch({type: CLEAR_ARTISTS})
      }
    }, 200)

    return () => {
      clearTimeout(identifier)
    }
  }, [query, dispatch])

  return (
    <>
      <label className="font-semibold text-xl" htmlFor="artist">
        Nom de l&apos;artiste
        <input
          id="artist"
          className="mt-2 p-2 block w-full"
          type="text"
          minLength={2}
          maxLength={20}
          required
          onChange={onChange}
          disabled={locked}
          autoComplete="off"
          value={locked ? selected.name : query.artist}
        />
      </label>
      <LockInput setInput={setQuery} type="artist" locked={locked} />

      {loading && !search && <LoadingSpinner />}
      {!loading &&
        search &&
        search.length > 0 &&
        React.Children.toArray(
          search.map(artist => (
            <SuggestedItem key={artist.id} type="artist" result={artist} />
          )),
        )}

      {!loading && searching && search && search.length === 0 && (
        <EmptyResult />
      )}
    </>
  )
}

export default ArtistInput
