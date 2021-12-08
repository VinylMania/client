import React, {useState, useEffect, useCallback} from 'react'
import Moment from 'react-moment'
import {UserModel} from '../../models/userModel'
import 'moment/locale/fr'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {getUserProfileById} from '../../actions/profile'
import LoadingSpinner from '../UI/LoadingSpinner'
import ProfileEdit from './Edit/ProfileEdit'

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
      <div className="flex flex-row flex-wrap justify-center bg-fourth py-4">
        {loading && !userProfile && <LoadingSpinner />}
        {!loading && !userProfile && (
          <p>Nous n&apos;arrivons pas à charger le profil.</p>
        )}

        {!loading && userProfile && (
          <>
            <div className="mx-6 p-2 text-second flex flex-col items-center">
              <p className="text-2xl font-bold uppercase text-center underline">
                {userProfile.username}
              </p>
              <img
                className="h-32 w-auto rounded-full shadow-2xl"
                src={userProfile.avatar}
                alt={`Avatar de ${userProfile.username}`}
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
