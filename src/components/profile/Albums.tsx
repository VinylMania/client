import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AlbumModel } from '../../models/albumModel';
import { UserModel } from '../../models/userModel';
import AlbumItem from './AlbumItem';
import { getLibraryByUserId } from '../../actions/library';
import LoadingSpinner from '../UI/LoadingSpinner';

const Albums: React.FC<{ userId: UserModel['_id'] }> = ({ userId }) => {
  const libraryReducer: { loadingLib: boolean; library: AlbumModel[] } =
    useAppSelector((state) => state.root.libraryReducer);
  const userAuth: {
    isAuthenticated: boolean;
    loading: boolean;
    user: UserModel;
  } = useAppSelector((state) => state.root.authReducer);

  const { isAuthenticated: isAuth = false } = userAuth;
  const isOwner = isAuth && userId === userAuth.user._id;

  const dispatch = useAppDispatch();

  const { loadingLib = true, library } = libraryReducer;

  const getLibaryCallback = useCallback(() => {
    dispatch(getLibraryByUserId(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    getLibaryCallback();
  }, [getLibaryCallback]);

  return (
    <>
      <button className="btn-submit" type="button" onClick={getLibaryCallback}>
        Refreshy
      </button>

      <div className="flex flex-row flex-wrap justify-center items-end">
        {loadingLib && !library && <LoadingSpinner />}
        {!loadingLib && !library && (
          <p>Nous n&apos;arrivons pas à charger la bibliothèque.</p>
        )}

        {!loadingLib &&
          library &&
          library.length &&
          React.Children.toArray(
            library.map((album) => (
              <AlbumItem isAuth={isAuth} isOwner={isOwner} album={album} />
            )),
          )}
      </div>
    </>
  );
};

export default Albums;
