import React, {useState, useContext} from 'react'
import Moment from 'react-moment'
import {UserModel} from '../../models/userModel'
import 'moment/locale/fr'
import ProfileEdit from './Edit/ProfileEdit'
import Image from 'next/image'
import provideConfig from '../../utils/axios-config'
import axios from 'axios'
import {useQuery} from 'react-query'
import AuthContext from '../../context/auth-context'
import {ErrorBoundary} from 'react-error-boundary'
import LoadingError from '../UI/LoadingError'

const getProfile = async (userId: UserModel['_id']): Promise<UserModel> => {
  const config = provideConfig()

  const {data} = await axios.get<UserModel>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/${userId}`,
    config,
  )
  return data
}

const ProfileHeader: React.FC<{userId: UserModel['_id']}> = ({userId}) => {
  const {data: userProfile} = useQuery(
    ['getProfile'],
    async () => {
      return await getProfile(userId)
    },
    {
      onError: err => {
        console.error(err)
      },
      refetchOnWindowFocus: false,
      retry: false,
    },
  )
  const isAuth = useContext(AuthContext)
  const {isAuthenticated, user} = isAuth

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex w-full flex-col items-center bg-background">
      <ErrorBoundary fallback={<LoadingError />}>
        {userProfile && (
          <div className="flex flex-row items-center py-4">
            <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full border">
              <Image
                layout="fill"
                objectFit="cover"
                quality={75}
                src={user?.avatar ? user.avatar : userProfile.avatar}
                alt={`Avatar de l'utilisateur ${userProfile.username}`}
                placeholder="blur"
                blurDataURL={user?.avatar ? user.avatar : userProfile.avatar}
              />
            </div>

            <div className="mx-4 flex flex-col gap-1">
              <p className="text-2xl font-bold capitalize text-headline">
                {userProfile.username}
              </p>
              <p>
                Membre depuis :{' '}
                <Moment className="italic" locale="fr" format="DD MMMM YYYY">
                  {userProfile.date_created}
                </Moment>
              </p>
              <p>
                Mise à jour du profil :{' '}
                <Moment className="italic" locale="fr" fromNow>
                  {userProfile.date_updated
                    ? userProfile.date_updated
                    : userProfile.date_created}
                </Moment>
              </p>
              <a
                className="max-w-fit transition-all duration-300 hover:text-button hover:underline"
                href={`mailto:${userProfile.email}`}
              >
                Email : {userProfile.email}
              </a>
            </div>
          </div>
        )}
        {isAuthenticated &&
          user &&
          userProfile &&
          user._id === userProfile._id && (
            <ProfileEdit
              openModal={openModal}
              closeModal={closeModal}
              isOpen={isModalOpen}
            />
          )}
      </ErrorBoundary>
    </div>
  )
}

export default ProfileHeader
