import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';
import { useAppDispatch } from '../../hooks';
import { getUserProfileById } from '../../actions/profile';
import { UserProfileModel } from '../../models/userModel';
import ProfileHeader from './ProfileHeader';
import Albums from './Albums';

const UserProfile: React.FC = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState<UserProfileModel>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileById(userId, setUserProfile));
    }
  }, [dispatch, userId]);

  return (
    <>
      {userProfile && userProfile.user && (
        <ProfileHeader user={userProfile.user} />
      )}
      {userProfile && userProfile.albums && userProfile.albums.length > 0 && (
        <Albums albums={userProfile.albums} />
      )}
    </>
  );
};

export default UserProfile;
