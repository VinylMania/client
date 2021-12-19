import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../../hooks'
import {getAlbums} from '../../../actions/discogs'
import SuggestedItem from './SuggestedItem'
import {DiscogAlbumModel, DiscogArtistModel} from '../../../models/discogModel'
import EmptyResult from './EmptyResult'
import LoadingSpinner from '../UI/LoadingSpinner'
import {CLEAR_ALBUMS} from '../../../actions/types'
import LockInput from './LockInput'

const AlbumInput: React.FC = () => {
  const [query, setQuery] = React.useState<{artist: string; album: string}>({
    artist: '',
    album: '',
  })
  const dispatch = useAppDispatch()
  const artists: {
    selected: DiscogArtistModel
  } = useAppSelector(state => state.root.discogsReducer.artists)

  const albums: {
    search: DiscogAlbumModel[]
    loading: boolean
    searching: boolean
    selected: DiscogAlbumModel
    locked: boolean
  } = useAppSelector(state => state.root.discogsReducer.albums)

  const {selected: selectedArtist} = artists
  const {search, searching, loading, selected: selectedAlbum, locked} = albums

  const onChange = (e: React.FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement
    setQuery({...query, album: event.value})
  }

  useEffect(() => {
    query.artist = selectedArtist?.name

    const identifier = setTimeout(() => {
      if (query?.album && query.album.length > 1) {
        dispatch(getAlbums(query))
      } else {
        dispatch({type: CLEAR_ALBUMS})
      }
    }, 200)

    return () => {
      clearTimeout(identifier)
    }
  }, [query, dispatch, selectedArtist])

  return (
    <>
      {selectedArtist && selectedArtist.name && (
        <>
          <label className="font-semibold text-xl" htmlFor="album">
            Nom de l&apos;album
            <input
              id="album"
              className="mt-2 p-2 block w-full"
              type="text"
              minLength={1}
              maxLength={20}
              required
              onChange={onChange}
              disabled={locked}
              autoComplete="off"
              value={locked ? selectedAlbum?.name : query?.album}
            />
          </label>
          <LockInput setInput={setQuery} type="album" locked={locked} />

          {loading && !search && <LoadingSpinner />}
          {!loading &&
            search &&
            search.length > 0 &&
            React.Children.toArray(
              search.map(album => (
                <SuggestedItem type="album" result={album} />
              )),
            )}

          {!loading && searching && search && search.length === 0 && (
            <EmptyResult />
          )}
        </>
      )}
    </>
  )
}

export default AlbumInput
