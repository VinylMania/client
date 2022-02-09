import React, {Suspense, useEffect, useState} from 'react'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import type {VinyleResponse} from '../../models/albumModel'
import LibraryDetail from '../../components/Library/LibraryDetail'
import {NextPage} from 'next'
import {useQuery} from 'react-query'
import Filters from '../../components/Library/Filters'
import axios from 'axios'

const getVinyles = async (): Promise<VinyleResponse[]> => {
  const response = await axios.get<VinyleResponse[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
  )
  return response.data
}

export async function getServerSideProps() {
  const initialVinyles = await getVinyles()
  return {
    props: {
      initialVinyles,
    },
  }
}

const Libraries: NextPage<{initialVinyles: VinyleResponse[] | null}> = ({
  initialVinyles,
}) => {
  const [vinyles, setFilters] = useState<VinyleResponse[] | null>()

  const {data: listVinyles} = useQuery(
    'getVinyles',
    () => {
      return getVinyles()
    },
    {
      initialData: initialVinyles,
      retry: false,
    },
  )

  useEffect(() => {
    setFilters(listVinyles)
  }, [listVinyles])

  return (
    <>
      <main className="min-h-full bg-buttonText pt-8 pb-16 md:pt-16">
        <div className="mx-auto flex max-w-full flex-col px-8 md:max-w-5xl">
          <Suspense fallback={<LoadingSpinner />}>
            {listVinyles && vinyles && (
              <Filters vinyles={listVinyles} setFilters={setFilters} />
            )}

            {!listVinyles?.length && (
              <p className="py-8 text-center text-2xl font-bold text-headline">
                La bibliothèque est vide pour le moment.
              </p>
            )}

            {listVinyles && listVinyles.length > 0 && vinyles?.length === 0 && (
              <p className="py-8 text-center text-2xl font-bold text-headline">
                Aucun résultat correspondant à votre recherche.
              </p>
            )}

            {listVinyles && vinyles && vinyles.length > 0 && (
              <section>
                <article className="flex flex-wrap justify-center gap-8 overflow-hidden rounded-xl bg-background p-4 md:justify-between">
                  {vinyles.map((vinyle, index) => (
                    <LibraryDetail key={index} vinyle={vinyle} />
                  ))}
                </article>
              </section>
            )}
          </Suspense>
        </div>
      </main>
    </>
  )
}

export default Libraries
