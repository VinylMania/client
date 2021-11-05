import React from 'react';
import { UserModel } from '../../models/userModel';

const ProfileHeader: React.FC<{ user: UserModel }> = ({ user }) => {
  const { avatar, username } = user;
  return (
    <div style={{ backgroundColor: '#D6385E' }}>
      <p className="font-bold uppercase">{username}</p>
      <img
        className="rounded-full"
        src={avatar}
        alt={`Avatar de ${username}`}
      />
    </div>
  );
};

export default ProfileHeader;
