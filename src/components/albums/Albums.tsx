import React, { FormEvent, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useAppDispatch } from '../../hooks';
import { getAlbums } from '../../actions/discogs';
import AlbumItem from './AlbumItem';

const Albums: React.FC<{
  artistDetail: any;
  albumDetail: any;
  setAlbumDetail: any;
}> = (props) => {
  const { albumDetail, setAlbumDetail, artistDetail } = props;
  const [albumList, setAlbumList] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lockInput, setLockInput] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        dispatch(getAlbums(searchQuery, artistDetail.title, setAlbumList));
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchQuery, dispatch]);

  const onChange = (e: FormEvent): void => {
    const event = e.currentTarget as HTMLInputElement;
    setSearchQuery(event.value);
  };

  const lockInputHandler = (): void => {
    setLockInput(true);
    setAlbumList(null);
  };

  const unlockInput = (): void => {
    setLockInput(false);
    setSearchQuery('');
  };

  return (
    <>
      <div className="bg-violet-600">
        <h1 className="text-center text-4xl">Album Page</h1>
        <div className="overflow-hidden border-2 border-black flex flex-col w-2/6 justify-center">
          <div>
            <input
              id="album-name"
              className="border-2 p-1 rounded-lg border-black text-center"
              placeholder="Album Name"
              type="text"
              minLength={3}
              required
              onChange={onChange}
              value={lockInput ? albumDetail.title : searchQuery}
              disabled={lockInput}
            />
            {lockInput && (
              <button
                type="button"
                onClick={unlockInput}
                className="cursor-pointer flex flex-row p-2 m-2"
              >
                <ImCross className="cursor-pointer" />
                Modifier
              </button>
            )}
          </div>

          {albumList &&
            albumList.length > 0 &&
            albumList.map((album: any) => (
              <AlbumItem
                lockInput={lockInputHandler}
                key={album.id}
                album={album}
                setAlbumDetail={setAlbumDetail}
                artistDetail={artistDetail}
              />
            ))}
          {albumList && albumList.length === 0 && (
            <p className="text-center">Aucun résultat trouvé</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Albums;
