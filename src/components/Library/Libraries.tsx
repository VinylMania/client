import React, { useState, useEffect } from 'react';
import { getLibraries } from '../../actions/library';
import { useAppDispatch } from '../../hooks';
import { LibraryModel } from '../../models/libraryModel';
import LibraryRow from './LibraryRow';

const Libraries: React.FC = () => {
  const dispatch = useAppDispatch();
  const [libraries, setLibraries] = useState<LibraryModel[]>();

  useEffect(() => {
    dispatch(getLibraries(setLibraries));
  }, [dispatch]);
  return (
    <div className="flex flex-col bg-first p-8">
      {!libraries && (
        <p className="text-center text-2xl text-white font-bold">
          La bibliothèque est vide pour le moment.
        </p>
      )}
      {libraries &&
        libraries.length > 0 &&
        libraries.map((library) => (
          <div key={library._id}>
            {library.albums && library.albums.length > 0 && (
              <LibraryRow library={library} />
            )}
          </div>
        ))}
    </div>
  );
};

export default Libraries;
