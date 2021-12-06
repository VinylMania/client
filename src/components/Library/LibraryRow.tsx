import React from 'react'
import {LibraryModel} from '../../models/libraryModel'
import LibraryDetail from './LibraryDetail'

const LibraryRow: React.FC<{library: LibraryModel}> = ({library}) => {
  const {user, albums} = library
  return (
    <>
      {albums &&
        albums.length > 0 &&
        React.Children.toArray(
          albums.map(album => <LibraryDetail user={user} album={album} />),
        )}
    </>
  )
}

export default LibraryRow
