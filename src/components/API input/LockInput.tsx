import React, {useState} from 'react'
import {ImCross} from 'react-icons/im'
import {useAppDispatch} from '../../../hooks'
import {CLEAR_ALBUMS, CLEAR_ARTISTS} from '../../../actions/types'

const LockInput: React.FC<{
  locked: boolean
  type: 'artist' | 'album'
  setInput: React.Dispatch<
    React.SetStateAction<{
      artist: string
      album: string
    }>
  >
}> = ({locked, type, setInput}) => {
  const [isHover, setIsHover] = useState(false)
  const dispatch = useAppDispatch()

  const onUnlock = (): void => {
    if (type === 'artist') {
      dispatch({type: CLEAR_ARTISTS})
      dispatch({type: CLEAR_ALBUMS})
    }
    if (type === 'album') {
      dispatch({type: CLEAR_ALBUMS})
    }
  }
  return (
    <>
      {locked && (
        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          type="button"
          onClick={onUnlock}
          className="text-lg my-4 cursor-pointer flex flex-row items-center hover:text-third"
        >
          <ImCross
            className={`mr-2 transform transition-all duration-200 ${
              isHover ? 'rotate-90' : ''
            }`}
          />
          Modifier
        </button>
      )}
    </>
  )
}

export default LockInput
