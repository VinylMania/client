import React from 'react';
import { AlbumModel } from '../../models/albumModel';
import AlbumItem from './AlbumItem';

const Albums: React.FC<{ albums: AlbumModel[] }> = ({ albums }) => (
  <div className="flex flex-row flex-wrap justify-center items-end">
    {albums &&
      albums.length > 0 &&
      albums.map((album: AlbumModel) => (
        <AlbumItem key={album._id} album={album} />
      ))}
  </div>
);

export default Albums;
