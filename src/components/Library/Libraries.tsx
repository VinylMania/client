import React, {useEffect} from 'react'
import {getLibraries} from '../../actions/library'
import {useAppDispatch, useAppSelector} from '../../hooks'
import LoadingSpinner from '../UI/LoadingSpinner'
import Filters from './Filters/Filters'
import {VinyleResponse} from '../../models/albumModel'
import LibraryDetail from './LibraryDetail'

const Libraries: React.FC = () => {
  const dispatch = useAppDispatch()
  const libraryReducer: {loadingLibs: boolean; libraries: VinyleResponse[]} =
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

      {!loadingLibs && libraries?.length === 0 && (
        <p className="text-center text-2xl text-second font-bold">
          La bibliothèque est vide pour le moment.
        </p>
      )}

      <main className="flex flex-row bg-first p-8 h-full">
        <section className="bg-third px-16">
          <Filters />
        </section>

        <section>
          <article className="list-vinyles">
            {!loadingLibs &&
              libraries &&
              libraries.length > 0 &&
              React.Children.toArray(
                libraries.map(vinyle => <LibraryDetail vinyle={vinyle} />),
              )}
          </article>
        </section>
      </main>
    </>
  )
}

export default Libraries
