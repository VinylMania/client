import React, {useEffect, useState} from 'react'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import {VinyleResponse} from '../../../models/albumModel'
import LibraryDetail from '../../../components/Library/LibraryDetail'
import {NextPage} from 'next'
import {useQuery} from 'react-query'
import Filters from '../../../components/Library/Filters'

const getVinyles = async (): Promise<VinyleResponse[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
  )
  return await response.json()
}

export async function getStaticProps() {
  const initialVinyles = await getVinyles()
  return {
    props: {
      initialVinyles,
    },
  }
}

const Libraries: NextPage<{initialVinyles: VinyleResponse[]}> = ({
  initialVinyles,
}) => {
  const {
    data: listVinyles,
    isLoading,
    isError,
  } = useQuery('vinyles', getVinyles, {initialData: initialVinyles})

  const [vinyles, setFilters] = useState<VinyleResponse[]>()

  useEffect(() => {
    setFilters(listVinyles)
  }, [listVinyles])

  return (
    <main className="bg-buttonText pt-8 md:pt-32 pb-16 min-h-full">
      <div className="max-w-full px-8 md:max-w-5xl flex flex-col mx-auto">
        {isError && <div>Error</div>}
        {listVinyles && vinyles && (
          <Filters vinyles={listVinyles} setFilters={setFilters} />
        )}

        {isLoading && <LoadingSpinner />}
        {!isLoading && !listVinyles?.length && (
          <p className="text-center text-2xl text-headline font-bold py-8">
            La bibliothèque est vide pour le moment.
          </p>
        )}

        {listVinyles && listVinyles.length > 0 && vinyles?.length === 0 && (
          <p className="text-center text-2xl text-headline font-bold py-8">
            Aucun résultat correspondant à votre recherche.
          </p>
        )}
        {listVinyles && vinyles && vinyles!.length > 0 && (
          <section>
            <article className="bg-background p-4 rounded-xl flex flex-wrap gap-8 overflow-hidden justify-center md:justify-between">
              {vinyles.map((vinyle, index) => (
                <LibraryDetail key={index} vinyle={vinyle} />
              ))}
            </article>
          </section>
        )}
      </div>
    </main>
  )
}

export default Libraries
