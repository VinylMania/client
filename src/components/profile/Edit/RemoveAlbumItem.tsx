import React from 'react'
import {FaExchangeAlt} from 'react-icons/fa'
import {BsFillTrashFill} from 'react-icons/bs'
import {VinyleResponse} from '../../../../models/albumModel'
import {useAppDispatch} from '../../../../hooks'
import {removeAlbumFromLibrary} from '../../../../actions/library'

const RemoveAlbumItem: React.FC<{
  type: 'trade' | 'delete'
  albumId: VinyleResponse['_id']
  albumTitle: VinyleResponse['albumTitle']
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
      className={`text-white ${
        type === 'delete'
          ? 'bg-red-700 hover:bg-red-600'
          : 'bg-green-800 hover:bg-green-700'
      }`}
    >
      <p className="flex flex-row items-center drop-shadow-lg">
        {type === 'delete' ? (
          <>
            <BsFillTrashFill className="mx-2" />
            Supprimer de la bibliothèque
          </>
        ) : (
          <>
            <FaExchangeAlt className="mx-2" />
            Marquer comme échangé
          </>
        )}
      </p>
    </button>
  )
}

export default RemoveAlbumItem
