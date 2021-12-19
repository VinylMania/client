/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React from 'react'
import {DiscogArtistModel, DiscogAlbumModel} from '../../../models/discogModel'
import {useAppDispatch} from '../../../hooks'
import {SET_ALBUM, SET_ARTIST} from '../../../actions/types'

const SuggestedItem: React.FC<{
  type: 'artist' | 'album'
  result: DiscogAlbumModel | DiscogArtistModel
}> = ({result, type}) => {
  const dispatch = useAppDispatch()

  const selector = (): void => {
    if (type === 'artist') {
      dispatch({type: SET_ARTIST, payload: result})
    }
    if (type === 'album') {
      dispatch({type: SET_ALBUM, payload: result})
    }
  }

  return (
    <>
      {result && (
        <button
          onClick={() => selector()}
          className="cursor-pointer text-left bg-first hover:bg-third text-second hover:text-first transition-all duration-200 overflow-hidden"
          type="button"
        >
          {result.name}
        </button>
      )}
    </>
  )
}

export default SuggestedItem
