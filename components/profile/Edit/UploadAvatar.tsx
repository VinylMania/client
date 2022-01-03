import React, {useRef, useState} from 'react'

import {MdOutlineFileUpload} from 'react-icons/md'
import {useAppDispatch} from '../../../hooks'
import {updateProfile} from '../../../actions/profile'
import Image from 'next/image'

const UploadAvatar: React.FC<{closeModal: () => void}> = ({closeModal}) => {
  const dispatch = useAppDispatch()
  const avatarRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<any>()

  const postMedia = (e: React.FormEvent): void => {
    e.preventDefault()

    dispatch(updateProfile(avatarRef))
    closeModal()
  }

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {files} = event.target

    if (files) {
      setAvatar(URL.createObjectURL(files[0]))
    }
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={e => postMedia(e)}>
        <label
          htmlFor="avatarUpload"
          className="flex flex-row text-white items-center p-4 bg-third font-semibold cursor-pointer"
        >
          <MdOutlineFileUpload /> Insérez votre image
          <input
            className="m-2 cursor-pointer"
            ref={avatarRef}
            id="avatarUpload"
            type="file"
            name="file"
            accept="image/*"
            onChange={uploadAvatar}
          />
        </label>
        {!avatar && (
          <button onClick={closeModal} className="btn-submit" type="button">
            Retour
          </button>
        )}

        {avatar && (
          <>
            <Image
              className="w-full mb-2"
              alt="Avatar"
              layout="intrinsic"
              width={200}
              height={200}
              quality={50}
              placeholder="blur"
              src={avatar}
              blurDataURL={avatar}
            />
            <button className="btn-submit" type="submit">
              Envoyer
            </button>
            <button onClick={closeModal} className="btn-submit" type="button">
              Retour
            </button>
          </>
        )}
      </form>
    </div>
  )
}

export default UploadAvatar
