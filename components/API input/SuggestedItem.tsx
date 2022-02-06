import React from 'react'
import {DiscogArtistModel, DiscogAlbumModel} from '../../models/discogModel'

const SuggestedItem: React.FC<{
  type: 'artist' | 'album'
  result: DiscogAlbumModel | DiscogArtistModel
}> = ({result, type}) => {
  // const selector = (): void => {
  //   if (type === 'artist') {
  //   }
  //   if (type === 'album') {
  //   }
  // }

  return (
    <>
      {result && (
        <button
          className="cursor-pointer text-left bg-first hover:bg-button focus:bg-button text-second hover:text-first transition-all duration-300 overflow-hidden"
          type="button"
        >
          {result.name}
        </button>
      )}
    </>
  )
}

export default SuggestedItem
