import React, {useState, useEffect} from 'react'
import Moment from 'react-moment'
import {UserModel} from '../../models/userModel'
import 'moment/locale/fr'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {getUserProfileById} from '../../actions/profile'
import LoadingSpinner from '../UI/LoadingSpinner'
import ProfileEdit from './Edit/ProfileEdit'
import Image from 'next/image'

const getUserProfile = async (): Promise<UserModel[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
  )
  return await response.json()
}

// export async function getStaticProps() {
//   const initialVinyles = await getVinyles()
//   return {
//     props: {
//       initialVinyles,
//     },
//   }
// }

const ProfileHeader: React.FC<{userId: UserModel['_id'] | undefined}> = ({
  userId,
}) => {
  const dispatch = useAppDispatch()
  const userAuth = useAppSelector(state => state.root.authReducer)
  const profileReducer: {user: UserModel; loading: boolean} = useAppSelector(
    state => state.root.profileReducer,
  )
  const {user: userProfile, loading} = profileReducer

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (): void => {
    setIsModalOpen(true)
  }

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileById(userId))
      closeModal()
    }
  }, [dispatch, userId])

  return (
    <>
      <div className="pt-32 pb-16 flex flex-row flex-wrap justify-center bg-black text-buttonText">
        {loading && !userProfile && <LoadingSpinner />}
        {!loading && !userProfile && (
          <p>Nous n&apos;arrivons pas à charger le profil.</p>
        )}

        {!loading && userProfile && (
          <>
            <div className="relative border border-black">
              <Image
                alt="profile wave effect"
                layout="intrinsic"
                src="/profile-background.png"
                width={960}
                height={540}
                quality={1}
                blurDataURL="/profile-background.png"
                placeholder="blur"
              />
            </div>
            <div className="space-y-2 mx-6 p-2 text-second flex flex-col items-center">
              <p className="text-2xl font-bold uppercase text-center underline">
                {userProfile.username}
              </p>

              <Image
                layout="intrinsic"
                className="rounded-full"
                src={`https:${userProfile.avatar}`}
                alt={`Avatar de l'utilisateur ${userProfile.username}`}
                width={100}
                height={100}
              />
              {userAuth.isAuthenticated && userAuth.user._id === userId && (
                <ProfileEdit
                  openModal={openModal}
                  closeModal={closeModal}
                  isOpen={isModalOpen}
                />
              )}
            </div>
            <div className="mx-6 p-2">
              <ul className="mx-6">
                <li>
                  <p>
                    Membre depuis :{' '}
                    <Moment locale="fr" format="DD MMMM YYYY">
                      {userProfile.date_created}
                    </Moment>
                  </p>
                </li>
                <li>
                  Mise à jour du profil :{' '}
                  <Moment locale="fr" fromNow>
                    {userProfile.date_updated
                      ? userProfile.date_updated
                      : userProfile.date_created}
                  </Moment>
                </li>
                <li>
                  <p>Email : {userProfile.email}</p>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-center bg-third py-4">
        <p className="font-bold text-2xl text-white text-center">
          {userProfile?.username} vous propose
        </p>
      </div>
    </>
  )
}

export default ProfileHeader
