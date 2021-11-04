/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';

const ArtistItem: React.FC<{
  artist: any;
  setArtistDetail: any;
  lockInput: any;
}> = (props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { artist, setArtistDetail, lockInput } = props;
  const hoverPosition = useRef<HTMLSpanElement>(null);
  const onClick = (artistId: number): void => {
    setArtistDetail(artist);
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
      {artist && (
        <div className="cursor-pointer border-black border-b-2 overflow-hidden">
          <p
            // onMouseEnter={onHover}
            // onMouseLeave={stopHover}
            onClick={() => onClick(artist)}
            className="text-cyan-700"
          >
            {artist.title}
            {/* <span className={isHover ? 'absolute' : 'hidden'}>
              <img
                className="w-14 h-auto "
                src={artist.thumb}
                alt={artist.title}
              />
            </span> */}
          </p>
        </div>
      )}
    </>
  );
};
export default ArtistItem;
