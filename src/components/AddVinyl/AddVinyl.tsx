import React, { useState, useEffect, FormEvent } from 'react';
import Albums from '../albums/Albums';
import Artists from '../artists/Artists';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLibrary, updateLibrary } from '../../actions/library';

const AddVinyl: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const [artistDetail, setArtistDetail] = useState<any>();
  const [albumDetail, setAlbumDetail] = useState<any>();
  const [userId, setUserId] = useState('');

  const user = useAppSelector((state) => state.root.authReducer.user);

  useEffect(() => {
    if (user) {
      const { _id: id } = user;
      setUserId(id);
    }
  }, [user]);

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(
      updateLibrary({
        artistId: artistDetail.id,
        albumId: albumDetail.id,
      }),
    );
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="user_id"
          value={userId.trim().length > 0 ? userId : 'Please log in'}
          disabled
        />
        <Artists
          artistDetail={artistDetail}
          setArtistDetail={setArtistDetail}
        />
        <Albums
          artistDetail={artistDetail}
          albumDetail={albumDetail}
          setAlbumDetail={setAlbumDetail}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddVinyl;
