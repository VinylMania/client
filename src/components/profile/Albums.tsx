import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { AlbumModel } from '../../models/albumModel';
import { UserModel } from '../../models/userModel';
import AlbumItem from './AlbumItem';
import { getLibraryByUserId } from '../../actions/library';
import { LibraryModel } from '../../models/libraryModel';
import LoadingSpinner from '../UI/LoadingSpinner';

const Albums: React.FC<{ userId: UserModel['_id'] | undefined }> = ({
  userId,
}) => {
  const [albums, setAlbums] = useState<LibraryModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [deleteAlbums, setDeleteAlbums] = useState<AlbumModel['_id'][]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getLibraryByUserId(userId, setAlbums, setIsLoading));
    }
  }, [dispatch, userId]);

  const onChange = (event: React.FormEvent): void => {
    const e = event.currentTarget as HTMLInputElement;
    if (e.checked) {
      const album = e.value as AlbumModel['_id'];
      deleteAlbums?.push(album);
      setDeleteAlbums(deleteAlbums);
    } else {
      const filter = deleteAlbums?.filter((item) => item !== e.value);
      setDeleteAlbums(filter);
    }
    console.log(deleteAlbums);
  };

  const message = "Nous n'arrivons pas à charger la bibliothèque.";
  return (
    <div className="flex flex-row flex-wrap justify-center items-end">
      {isLoading && !albums && <LoadingSpinner />}
      {!isLoading && !albums && <p>{message}</p>}

      {albums &&
        albums.albums.length > 0 &&
        albums.albums.map((album: AlbumModel) => (
          <AlbumItem key={album._id} album={album} />
        ))}

      <table className="table">
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {albums &&
            albums.albums.length > 0 &&
            albums.albums.map((album: AlbumModel) => (
              <tr key={album._id}>
                <td>
                  <input
                    type="checkbox"
                    className="w-16 h-16"
                    value={album._id}
                    onChange={(e) => onChange(e)}
                  />
                </td>
                <td>{album._id}</td>
                <td>{album.album_title}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Albums;
