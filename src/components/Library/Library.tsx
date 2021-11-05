import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLibraries } from '../../actions/library';
import { useAppDispatch } from '../../hooks';

const Library: React.FC = () => {
  const dispatch = useAppDispatch();
  const [libraries, setLibraries] = useState<any>();

  useEffect(() => {
    dispatch(getLibraries(setLibraries));
  }, [dispatch]);
  return (
    <div className="flex flex-col bg-yellow-700 p-4 m-4">
      {libraries &&
        libraries.length > 0 &&
        libraries.map((library: any) => {
          const {
            _id: libraryId,
            user: { username, avatar, _id: userId },
            albums,
          } = library;
          return (
            <div>
              {albums && albums.length > 0 && (
                <div
                  className="user-profile m-2 p-2 rounded-2xl overflow-hidden bg-yellow-600 flex flex-row"
                  key={libraryId}
                >
                  <div className="mx-2">
                    <h1 className="text-white">{username}</h1>
                    <img
                      className="w-16 h-auto rounded-full"
                      src={avatar}
                      alt={`Avatar de ${username}`}
                    />
                    <Link
                      className="bg-green-500 p-2 rounded-lg"
                      to={`/users/${userId}`}
                    >
                      Visit profile
                    </Link>
                  </div>
                  <div className="mx-2">
                    <h2>Vous propose :</h2>
                    <div className="flex flex-row">
                      {albums &&
                        albums.length > 0 &&
                        albums.map((album: any) => {
                          const {
                            album_title: aTit,
                            album_cover_url: aUrl,
                            artist_title: arTit,
                            release_date: aRd,
                            _id: aId,
                          } = album;
                          return (
                            <>
                              <div className="m-2" key={aId}>
                                <img
                                  className="w-28 h-auto"
                                  src={aUrl}
                                  alt={aTit}
                                />
                                <p>{arTit}</p>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Library;
