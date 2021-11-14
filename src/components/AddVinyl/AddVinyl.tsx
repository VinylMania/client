import React, { useState, FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateLibrary } from '../../actions/library';
import Button from '../UI/Button';
import { getArtists, getAlbums } from '../../actions/discogs';
import DiscogInput from '../API input/DiscogInput';
import { AlbumModel } from '../../models/albumModel';
import { DiscogAlbumModel, DiscogArtistModel } from '../../models/discogModel';

const AddVinyl: React.FC = () => {
  const dispatch = useAppDispatch();
  const [artistDetail, setArtistDetail] = useState<DiscogArtistModel>();
  const [albumDetail, setAlbumDetail] = useState<DiscogAlbumModel>();

  // Redirect if user authenticated
  const isAuth = useAppSelector(
    (state) => state.root.authReducer.isAuthenticated,
  );

  if (!isAuth) {
    return <Navigate to="/home" />;
  }

  const resetAllFields = (): void => {
    setArtistDetail(undefined);
    setAlbumDetail(undefined);
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (artistDetail && albumDetail) {
      const albumObject: AlbumModel = {
        artistId: artistDetail.id !== null ? artistDetail.id.toString() : '',
        albumId: albumDetail.id !== null ? albumDetail.id.toString() : '',
        album_cover_url:
          albumDetail.cover_image !== null ? albumDetail.cover_image : '',
        artist_cover_url:
          artistDetail.cover_image !== null ? artistDetail.cover_image : '',
        release_date: albumDetail.year !== null ? albumDetail.year : '',
        artist_title: artistDetail.title !== null ? artistDetail.title : '',
        album_title: albumDetail.title !== null ? albumDetail.title : '',
        trade: true,
      };

      dispatch(updateLibrary(albumObject));
    }
  };
  return (
    <div className="vinyl-form-wrapper">
      <div className="mx-32 p-4 bg-fourth">
        <form className="vinyl-form" onSubmit={(e) => onSubmit(e)}>
          <DiscogInput
            reset={resetAllFields}
            inputId="artist-name"
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
              inputId="album-name"
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
          <Button className="mt-4" type="submit" text="Ajouter le vinyle" />
        </form>
      </div>
    </div>
  );
};

export default AddVinyl;
