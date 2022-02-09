import React, {useContext, useRef, useState} from 'react'
import {MdOutlineFileUpload} from 'react-icons/md'
import Image from 'next/image'
import {ErrorBoundary} from 'react-error-boundary'
import LoadingError from '../../UI/LoadingError'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {useMutation} from 'react-query'
import axios, {AxiosResponse} from 'axios'
import {UserModel} from '../../../models/userModel'
import provideConfig from '../../../utils/axios-config'
import AuthContext from '../../../context/auth-context'

const UploadAvatar: React.FC<{closeModal: () => void}> = ({closeModal}) => {
  const avatarRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<any>()
  const [image, setIlmage] = useState<File>()
  const {updateAvatar} = useContext(AuthContext)

  const postMedia = (e: React.FormEvent): void => {
    e.preventDefault()
    mutation.mutate()
    updateAvatar(avatar)
    closeModal()
  }
  const mutation = useMutation(async updateAvatar => {
    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      const config = provideConfig()
      config.headers['Content-Type'] = 'multipart/form-data'
      const response = await axios.put<FormData, AxiosResponse<UserModel>>(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/avatar`,
        formData,
        config,
      )
    }
  })

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {files} = event.target

    if (files) {
      setAvatar(URL.createObjectURL(files[0]))
      setIlmage(files[0])
    }
  }

  const resetAvatar = (): void => {
    setAvatar(undefined)
  }

  return (
    <div>
      <form
        className="flex min-h-[600px] flex-col items-center gap-8"
        onSubmit={postMedia}
      >
        <div className="h-[400px] w-[400px] overflow-hidden border border-slate-400">
          <ErrorBoundary fallback={<LoadingError />}>
            {avatar && (
              <div className="relative h-[400px] w-[400px]">
                <button
                  className=":text-red-500 absolute top-0 right-0 z-10 flex-1 cursor-pointer text-button"
                  onClick={() => resetAvatar()}
                  aria-label="Supprimer l'image"
                >
                  <AiOutlineCloseCircle size={32} className="fill-current" />
                </button>
                <Image
                  className="mb-2 w-full"
                  alt="Avatar"
                  layout="fill"
                  objectFit="contain"
                  quality={50}
                  placeholder="blur"
                  src={avatar}
                  blurDataURL={avatar}
                />
              </div>
            )}
            {!avatar && (
              <label
                htmlFor="avatarUpload"
                className="relative flex h-full w-full cursor-pointer items-center justify-center gap-4 bg-white/10 p-4 text-2xl font-semibold text-button"
              >
                <MdOutlineFileUpload size={38} className="fill-current" />{' '}
                Ajouter un avatar
                <input
                  className="hidden"
                  ref={avatarRef}
                  id="avatarUpload"
                  type="file"
                  name="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={uploadAvatar}
                />
              </label>
            )}
          </ErrorBoundary>
        </div>

        <div className="flex w-[400px] flex-row gap-4">
          <button
            className="btn-submit flex-1"
            type="submit"
            disabled={avatar ? false : true}
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadAvatar
