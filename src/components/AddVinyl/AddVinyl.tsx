import React, { useState, useEffect, FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateLibrary } from '../../actions/library';

import { getArtists, getAlbums } from '../../actions/discogs';
import DiscogInput from '../API input/DiscogInput';

const AddVinyl: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const [artistDetail, setArtistDetail] = useState<any>();
  const [albumDetail, setAlbumDetail] = useState<any>();

  // Redirect if user authenticated
  const isAuth = useAppSelector(
    (state) => state.root.authReducer.isAuthenticated,
  );

  if (!isAuth) {
    return <Navigate to="/home" />;
  }

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (artistDetail && albumDetail) {
      const albumObject = {
        artistId: artistDetail.id !== null ? artistDetail.id : '',
        albumId: albumDetail.id !== null ? albumDetail.id : '',
        albumCoverUrl:
          albumDetail.cover_image !== null ? albumDetail.cover_image : '',
        artistCoverUrl:
          artistDetail.cover_image !== null ? artistDetail.cover_image : '',
        releaseDate: albumDetail.year !== null ? albumDetail.year : '',
        artistTitle: artistDetail.title !== null ? artistDetail.title : '',
        albumTitle: albumDetail.title !== null ? albumDetail.title : '',
      };

      dispatch(updateLibrary(albumObject));
    }
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <DiscogInput
          searchDelay={500}
          searchLength={2}
          additionalQuery={null}
          setResultDetail={setArtistDetail}
          getResultFn={getArtists}
          placeholder="Nom de l'artiste"
          inputValue={artistDetail ? artistDetail.title : ''}
        />

        {artistDetail && (
          <DiscogInput
            searchDelay={500}
            searchLength={1}
            additionalQuery={
              artistDetail.title.length > 0 ? artistDetail.title : ''
            }
            setResultDetail={setAlbumDetail}
            getResultFn={getAlbums}
            placeholder="Nom de l'album"
            inputValue={albumDetail ? albumDetail.title : ''}
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddVinyl;
