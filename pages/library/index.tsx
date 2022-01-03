import React, {useEffect, useCallback, useState} from 'react'
import {getLibraries} from '../../actions/library'
import {useAppDispatch, useAppSelector} from '../../hooks'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Filters from './Filters/Filters'
import {VinyleResponse} from '../../models/albumModel'
import LibraryDetail from '../../components/LibraryDetail'

const Libraries: React.FC = () => {
  const dispatch = useAppDispatch()
  const libraryReducer: {loadingLibs: boolean; libraries: VinyleResponse[]} =
    useAppSelector(state => state.root.libraryReducer)
  const {loadingLibs = true, libraries = undefined} = libraryReducer
  const [filteredLibs, setFilteredLibs] = useState<VinyleResponse[]>()

  useEffect(() => {
    setFilteredLibs(libraries)
  }, [libraries])

  useEffect(() => {
    dispatch(getLibraries())
  }, [dispatch])

  return (
    <>
      <main className="flex flex-col p-8 h-full">
        <Filters libraries={libraries} setFilteredLibs={setFilteredLibs} />
        {loadingLibs && <LoadingSpinner />}
        {!loadingLibs && !libraries?.length && (
          <p className="text-center text-2xl text-second font-bold py-8">
            La bibliothèque est vide pour le moment.
          </p>
        )}

        {!loadingLibs && libraries.length && !filteredLibs?.length && (
          <p className="text-center text-2xl text-second font-bold py-8">
            Aucun résultat correspondant à votre recherche.
          </p>
        )}

        <section>
          <article className="list-vinyles">
            {!loadingLibs &&
              filteredLibs &&
              React.Children.toArray(
                filteredLibs.map((vinyle, index) => (
                  <LibraryDetail key={index} vinyle={vinyle} />
                )),
              )}
          </article>
        </section>
      </main>
    </>
  )
}

export default Libraries
