import React from 'react'
import {FaExchangeAlt} from 'react-icons/fa'
import {BsFillTrashFill} from 'react-icons/bs'
import {AlbumModel} from '../../../models/albumModel'
import {useAppDispatch} from '../../../hooks'
import {removeAlbumFromLibrary} from '../../../actions/library'

const RemoveAlbumItem: React.FC<{
  type: 'trade' | 'delete'
  albumId: AlbumModel['_id']
  albumTitle: AlbumModel['album_title']
}> = ({type, albumId, albumTitle}) => {
  const dispatch = useAppDispatch()
  const onRemoveAlbumFromLibrary = (e: React.FormEvent): void => {
    e.preventDefault()
    if (albumId) {
      dispatch(removeAlbumFromLibrary({albumId, type, albumTitle}))
    }
  }

  return (
    <button
      onClick={e => onRemoveAlbumFromLibrary(e)}
      type="button"
      className={`${type === 'delete' ? 'bg-red-600' : 'bg-green-700'}`}
    >
      <p className="text-white hover:text-yellow-100 flex flex-row items-center drop-shadow">
        {type === 'delete' ? (
          <>
            <BsFillTrashFill className="mx-2" />
            Supprimer de la bibliothèque
          </>
        ) : (
          <>
            <FaExchangeAlt className="mx-2 " />
            Marquer comme échangé
          </>
        )}
      </p>
    </button>
  )
}

export default RemoveAlbumItem
