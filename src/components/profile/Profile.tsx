import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment/locale/fr';
import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLibrary } from '../../actions/library';

const Profile: React.FC = () => {
  const [libraryList, setLibraryList] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLibrary(setLibraryList));
  }, [dispatch]);

  //  Redirect if user authenticated
  const isAuth = useAppSelector(
    (state) => state.root.authReducer.isAuthenticated,
  );

  if (!isAuth) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <h1>My Library</h1>
      <div className="flex flex-row flex-wrap ">
        {libraryList &&
          libraryList.albums.length > 0 &&
          libraryList.albums.map((album: any) => {
            const {
              _id,
              album_cover_url: albumCover,
              release_date: releaseDate,
              artist_title: artistTitle,
              album_title: albumTitle,
            } = album;
            return (
              <div
                className="m-2 border-2 rounded-2xl border-violet-500 p-2 flex flex-col"
                key={_id}
              >
                <p className="font-bold">{albumTitle}</p>
                <p className="font-thin italic">{artistTitle}</p>
                <p className="text-center">
                  Sorti le{' '}
                  <Moment locale="fr" format="DD MMMM YYYY">
                    {releaseDate}
                  </Moment>
                </p>
                <img
                  className="w-72 h-auto items-center self-center"
                  src={albumCover}
                  alt=""
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Profile;
