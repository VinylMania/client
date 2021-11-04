import React, { useState, useRef } from 'react';

const AlbumItem: React.FC<{
  album: any;
  setAlbumDetail: any;
  lockInput: any;
  artistDetail: any;
}> = (props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { album, setAlbumDetail, lockInput, artistDetail } = props;
  const hoverPosition = useRef<HTMLSpanElement>(null);
  const onClick = (): void => {
    setAlbumDetail(album);
    lockInput();
  };

  const onHover = (): void => {
    setIsHover(true);
  };

  const stopHover = (): void => {
    setIsHover(false);
  };

  return (
    <>
      {album && (
        <div className="cursor-pointer border-black border-b-2 overflow-hidden">
          <button
            type="button"
            // onMouseEnter={onHover}
            // onMouseLeave={stopHover}
            onClick={() => onClick()}
            className="text-cyan-700"
          >
            {album.title}
            {/* <span className={isHover ? 'absolute' : 'hidden'}>
                <img
                  className="w-14 h-auto "
                  src={artist.thumb}
                  alt={artist.title}
                />
              </span> */}
          </button>
        </div>
      )}
    </>
  );
};

export default AlbumItem;
