import React, {useEffect, useState} from 'react'
import {getLibraries} from '../../../actions/library'
import {useAppDispatch, useAppSelector} from '../../../hooks'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import Filters from './Filters/Filters'
import {VinyleResponse} from '../../../models/albumModel'
import LibraryDetail from '../../../components/LibraryDetail'
import {NextPage} from 'next'

export async function getStaticProps() {
  console.log('Getting them props !!')
  const data = await fetch('http://localhost:3000/api/vinyles') // getLibraries()
  const vinyles: VinyleResponse[] = await data.json()
  return {
    props: {
      vinyles,
    },
  }
}

const Libraries: NextPage<{vinyles: VinyleResponse[]}> = ({vinyles}) => {
  console.log(vinyles)
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
        {/* <Filters libraries={libraries} setFilteredLibs={setFilteredLibs} />
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
        )} */}

        {/* <section>
          <article className="list-vinyles">
            {!loadingLibs &&
              filteredLibs &&
              React.Children.toArray(
                filteredLibs.map((vinyle, index) => (
                  <LibraryDetail key={index} vinyle={vinyle} />
                )),
              )}
          </article>
        </section> */}
      </main>
    </>
  )
}

export default Libraries
