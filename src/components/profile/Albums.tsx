import React from 'react';
import { AlbumModel } from '../../models/albumModel';
import AlbumItem from './AlbumItem';

const Albums: React.FC<{ albums: AlbumModel[] }> = ({ albums }) => (
  <div className="flex flex-row flex-wrap justify-center">
    {albums &&
      albums.length > 0 &&
      albums.map((album: AlbumModel) => <AlbumItem album={album} />)}
  </div>
);

export default Albums;
