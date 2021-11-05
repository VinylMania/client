/* eslint-disable camelcase */
import React from 'react';
import Moment from 'react-moment';
import { AlbumModel } from '../../models/albumModel';
import 'moment/locale/fr';

const AlbumItem: React.FC<{ album: AlbumModel }> = ({ album }) => {
  const { _id, album_cover_url, release_date, artist_title, album_title } =
    album;

  return (
    <div
      style={{ backgroundColor: '#F8EFD4' }}
      className="m-2 rounded-2xl p-2 flex flex-col"
      key={_id}
    >
      <p className="font-bold">{album_title}</p>
      <p className="font-thin italic">{artist_title}</p>
      <p className="text-center">
        Sorti le{' '}
        <Moment locale="fr" format="DD MMMM YYYY">
          {release_date}
        </Moment>
      </p>
      <img
        className="w-72 h-auto items-center self-center"
        src={album_cover_url}
        alt=""
      />
    </div>
  );
};

export default AlbumItem;
