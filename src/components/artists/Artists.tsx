import React, { FormEvent, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import ArtistItem from './ArtistItem';
import { useAppDispatch } from '../../hooks';
import { getArtists } from '../../actions/discogs';

const Artists: React.FC<{ setArtistDetail: any; artistDetail: any }> = (
  props,
) => {
  const { artistDetail, setArtistDetail } = props;
  const [artistList, setArtistList] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [artistDetail, setArtistDetail] = useState<any>();
  const [lockInput, setLockInput] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const identifier = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        dispatch(getArtists(searchQuery, setArtistList));
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
    setArtistList(null);
  };

  const unlockInput = (): void => {
    setLockInput(false);
    setSearchQuery('');
  };

  return (
    <>
      <div className="bg-cyan-500">
        <h1 className="text-center text-4xl">Artist Page</h1>
        <div className="overflow-hidden border-2 border-black flex flex-col w-2/6 justify-center">
          <div>
            <input
              id="artist-name"
              className="border-2 p-1 rounded-lg border-black text-center"
              placeholder="Artist Name"
              type="text"
              minLength={3}
              required
              onChange={onChange}
              value={lockInput ? artistDetail.title : searchQuery}
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

          {artistList &&
            artistList.length > 0 &&
            artistList.map((artist: any) => (
              <ArtistItem
                lockInput={lockInputHandler}
                key={artist.id}
                artist={artist}
                setArtistDetail={setArtistDetail}
              />
            ))}
          {artistList && artistList.length === 0 && (
            <p className="text-center">Aucun résultat trouvé</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Artists;
