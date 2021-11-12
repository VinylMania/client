/* eslint-disable camelcase */
import React from 'react';
import Moment from 'react-moment';
import { UserModel } from '../../models/userModel';
import 'moment/locale/fr';

const ProfileHeader: React.FC<{ user: UserModel; albumLength: number }> = ({
  user,
  albumLength,
}) => {
  const { avatar, username, date_created, email } = user;
  console.log(date_created);
  return (
    <div className="flex flex-row flex-wrap justify-center bg-fourth py-4">
      <div className="mx-6 p-2 text-second">
        <p className="text-2xl font-bold uppercase text-center underline">
          {username}
        </p>
        <img
          className="rounded-full shadow-2xl"
          src={avatar}
          alt={`Avatar de ${username}`}
        />
      </div>
      <div className="mx-6 p-2">
        <ul className="mx-6">
          <li>
            <p>
              Membre depuis :{' '}
              <Moment locale="fr" format="DD MMMM YYYY">
                {date_created}
              </Moment>
            </p>
          </li>
          <li>
            <p>Email : {email}</p>
          </li>
          <li>
            Vous propose{' '}
            {albumLength > 1
              ? `${albumLength} vinyles`
              : `${albumLength} vinyle`}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileHeader;
