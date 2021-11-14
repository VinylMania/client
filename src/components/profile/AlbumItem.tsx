import React from 'react';
import Moment from 'react-moment';
import { AlbumModel } from '../../models/albumModel';
import 'moment/locale/fr';

const AlbumItem: React.FC<{ album: AlbumModel }> = ({ album }) => {
  const { album_cover_url, release_date, artist_title, album_title } = album;

  return (
    <div className="w-72 m-4 rounded-3xl p-4 flex flex-col overflow-hidden text-second">
      <p className="font-bold">{album_title}</p>
      <p className="font-thin italic">
        {artist_title} - <Moment format="YYYY">{release_date}</Moment>
      </p>
      <img
        className="w-64 h-auto items-center self-center"
        src={album_cover_url}
        alt={album_title}
      />
    </div>
  );
};

export default AlbumItem;
