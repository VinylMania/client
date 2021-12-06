import React, {useEffect} from 'react'
import {getLibraries} from '../../actions/library'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {LibraryModel} from '../../models/libraryModel'
import LoadingSpinner from '../UI/LoadingSpinner'
import LibraryRow from './LibraryRow'

const Libraries: React.FC = () => {
  const dispatch = useAppDispatch()
  const libraryReducer: {loadingLibs: boolean; libraries: LibraryModel[]} =
    useAppSelector(state => state.root.libraryReducer)
  const {loadingLibs = true, libraries = undefined} = libraryReducer

  useEffect(() => {
    dispatch(getLibraries())
  }, [dispatch])
  return (
    <>
      {loadingLibs && <LoadingSpinner />}
      {!loadingLibs && !libraries && (
        <p className="text-center text-2xl text-second font-bold">
          La bibliothèque est vide pour le moment.
        </p>
      )}
      <main className="flex flex-row bg-first p-8 h-full">
        <section className="bg-third px-16">
          <p>Filters</p>
        </section>

        <section>
          <article className="flex flex-wrap overflow-hidden items-start justify-start m-auto">
            {!loadingLibs &&
              libraries &&
              libraries.length > 0 &&
              React.Children.toArray(
                libraries.map(library => (
                  <>
                    {library.albums && library.albums.length > 0 && (
                      <LibraryRow library={library} />
                    )}
                  </>
                )),
              )}
          </article>
        </section>
      </main>
    </>
  )
}

export default Libraries
