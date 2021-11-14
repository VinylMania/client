/* eslint-disable camelcase */
import React from 'react';
import { AlbumModel } from '../../models/albumModel';

const LibraryDetail: React.FC<{ album: AlbumModel }> = ({ album }) => {
  const { album_title, album_cover_url, artist_title, _id: aId } = album;
  return (
    <div className="p-2" key={aId}>
      <p>{artist_title}</p>
      <img className="w-28 h-auto" src={album_cover_url} alt={album_title} />
    </div>
  );
};

export default LibraryDetail;
