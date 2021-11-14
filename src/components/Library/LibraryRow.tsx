import React from 'react';
import { LibraryModel } from '../../models/libraryModel';
import LibraryDetail from './LibraryDetail';
import UserDetail from './UserDetail';

const LibraryRow: React.FC<{ library: LibraryModel }> = ({ library }) => {
  const { _id: libraryId, user, albums } = library;
  return (
    <div
      className="my-4 py-4 flex flex-row overflow-hidden bg-fourth rounded-3xl"
      key={libraryId}
    >
      {user && <UserDetail user={user} />}
      <div className="flex flex-row flex-wrap overflow-hidden items-end">
        {albums &&
          albums.length > 0 &&
          albums.map((album) => (
            <LibraryDetail key={album._id} album={album} />
          ))}
      </div>
    </div>
  );
};

export default LibraryRow;
