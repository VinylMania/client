import React from 'react';
import { Link } from 'react-router-dom';
import { UserModel } from '../../models/userModel';

const UserDetail: React.FC<{ user: UserModel }> = ({ user }) => {
  const { username, avatar, _id: userId } = user;
  return (
    <div className="w-44 mx-2 flex flex-col items-center text-white">
      <h1 className="font-semibold text-second">{username}</h1>
      <img
        className="w-24 h-auto rounded-full my-2 shadow-xl"
        src={avatar}
        alt={`Avatar de ${username}`}
      />
      <Link className="btn-submit" to={`/users/${userId}`}>
        Consulter le profil
      </Link>
    </div>
  );
};

export default UserDetail;
