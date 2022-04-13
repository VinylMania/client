import React, {useState} from 'react'
import {ImCross} from 'react-icons/im'

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

  const onUnlock = (): void => {}
  return (
    <>
      {locked && (
        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          type="button"
          onClick={onUnlock}
          className="hover:text-third my-4 flex cursor-pointer flex-row items-center text-lg"
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
