import React, {Suspense, useEffect, useRef, useState} from 'react'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import type {VinyleResponse} from '../../models/albumModel'
import LibraryDetail from '../../components/Library/LibraryDetail'
import {NextPage} from 'next'
import {useQuery} from 'react-query'
import Filters from '../../components/Library/Filters'
import axios from 'axios'

const getVinyles = async (): Promise<VinyleResponse[] | null> => {
  try {
    const response = await axios.get<VinyleResponse[]>(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
    )
    return response.data
  } catch (err) {
    console.log(err)
  }
  return null
}

export async function getStaticProps() {
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
      <main className="bg-buttonText pt-8 md:pt-32 pb-16 min-h-full">
        <div className="max-w-full px-8 md:max-w-5xl flex flex-col mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            {listVinyles && vinyles && (
              <Filters vinyles={listVinyles} setFilters={setFilters} />
            )}

            {!listVinyles?.length && (
              <p className="text-center text-2xl text-headline font-bold py-8">
                La bibliothèque est vide pour le moment.
              </p>
            )}

            {listVinyles && listVinyles.length > 0 && vinyles?.length === 0 && (
              <p className="text-center text-2xl text-headline font-bold py-8">
                Aucun résultat correspondant à votre recherche.
              </p>
            )}

            {listVinyles && vinyles && vinyles.length > 0 && (
              <section>
                <article className="bg-background p-4 rounded-xl flex flex-wrap gap-8 overflow-hidden justify-center md:justify-between">
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
