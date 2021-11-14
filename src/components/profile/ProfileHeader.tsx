import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { UserModel } from '../../models/userModel';
import 'moment/locale/fr';
import UploadAvatar from './Edit/UploadAvatar';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserProfileById } from '../../actions/profile';
import LoadingSpinner from '../UI/LoadingSpinner';

const ProfileHeader: React.FC<{ userId: UserModel['_id'] | undefined }> = ({
  userId,
}) => {
  const [userDetail, setUserDetail] = useState<UserModel>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.root.authReducer);

  const error = "Nous n'arrivons pas à charger le profil.";

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileById(userId, setUserDetail, setIsLoading));
    }
  }, [dispatch, userId]);

  return (
    <div className="flex flex-row flex-wrap justify-center bg-fourth py-4">
      {isLoading && !userDetail && <LoadingSpinner />}
      {!isLoading && !userDetail && <p>{error}</p>}

      {userDetail && (
        <>
          <div className="mx-6 p-2 text-second">
            <p className="text-2xl font-bold uppercase text-center underline">
              {userDetail.username}
            </p>
            <img
              className="h-32 w-auto rounded-full shadow-2xl"
              src={userDetail.avatar}
              alt={`Avatar de ${userDetail.username}`}
            />
          </div>
          <div className="mx-6 p-2">
            <ul className="mx-6">
              <li>
                <p>
                  Membre depuis :{' '}
                  <Moment locale="fr" format="DD MMMM YYYY">
                    {userDetail.date_created}
                  </Moment>
                </p>
              </li>
              <li>
                Mise à jour du profil :{' '}
                <Moment locale="fr" fromNow>
                  {userDetail.date_updated
                    ? userDetail.date_updated
                    : userDetail.date_created}
                </Moment>
              </li>
              <li>
                <p>Email : {userDetail.email}</p>
              </li>
              <li>Vous propose</li>
            </ul>
          </div>
          {userAuth.isAuthenticated && userAuth.user._id === userId && (
            <UploadAvatar setUserDetail={setUserDetail} />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
