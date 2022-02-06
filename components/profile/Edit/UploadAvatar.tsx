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
        className="flex flex-col gap-8 items-center min-h-[600px]"
        onSubmit={postMedia}
      >
        <div className="border border-slate-400 w-[400px] h-[400px] overflow-hidden">
          <ErrorBoundary fallback={<LoadingError />}>
            {avatar && (
              <div className="relative w-[400px] h-[400px]">
                <button
                  className="z-10 cursor-pointer absolute top-0 right-0 text-button flex-1 :text-red-500"
                  onClick={() => resetAvatar()}
                  aria-label="Supprimer l'image"
                >
                  <AiOutlineCloseCircle size={32} className="fill-current" />
                </button>
                <Image
                  className="w-full mb-2"
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
                className="relative flex gap-4 justify-center text-button items-center p-4 w-full h-full bg-white/10 font-semibold cursor-pointer text-2xl"
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

        <div className="w-[400px] flex gap-4 flex-row">
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
