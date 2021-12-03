import React, { useEffect } from 'react';
import { getLibraries } from '../../actions/library';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LibraryModel } from '../../models/libraryModel';
import LoadingSpinner from '../UI/LoadingSpinner';
import LibraryRow from './LibraryRow';

const Libraries: React.FC = () => {
  const dispatch = useAppDispatch();
  const libraryReducer: { loadingLibs: boolean; libraries: LibraryModel[] } =
    useAppSelector((state) => state.root.libraryReducer);
  const { loadingLibs = true, libraries = undefined } = libraryReducer;

  useEffect(() => {
    dispatch(getLibraries());
  }, [dispatch]);
  return (
    <div className="flex flex-col bg-first p-8">
      {loadingLibs && <LoadingSpinner />}
      {!loadingLibs && !libraries && (
        <p className="text-center text-2xl text-second font-bold">
          La bibliothèque est vide pour le moment.
        </p>
      )}
      {!loadingLibs &&
        libraries &&
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
