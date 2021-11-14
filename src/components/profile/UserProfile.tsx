import React from 'react';

import { useParams } from 'react-router';
import { UserModel } from '../../models/userModel';
import ProfileHeader from './ProfileHeader';
import Albums from './Albums';

const UserProfile: React.FC = () => {
  const { userId } = useParams<UserModel['_id']>();

  return (
    <>
      {userId && <ProfileHeader userId={userId} />}
      {userId && <Albums userId={userId} />}
    </>
  );
};

export default UserProfile;
