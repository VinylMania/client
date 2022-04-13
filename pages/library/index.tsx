import React, {Suspense, useEffect} from 'react'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import type {VinyleResponse} from '../../models/albumModel'
import {NextPage} from 'next'
import axios from 'axios'
import {ErrorBoundary} from 'react-error-boundary'
import LoadingError from '../../components/UI/LoadingError'
import VinyleWrapper from '../../components/Library/VinyleWrapper'

export interface searchVinyleQuery {
  artistTitle: VinyleResponse['artistTitle']
  itemId: VinyleResponse['_id']
  albumTitle: VinyleResponse['albumTitle']
}

const getVinyles = async (
  searchVinyle: searchVinyleQuery | null = null,
): Promise<VinyleResponse[]> => {
  const response = await axios.post<string, VinyleResponse[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/search`,
    JSON.stringify({
      artistTitle: '',
      albumTitle: '',
      itemId: '',
      ...searchVinyle,
    }),
  )

  return response.data
}

export async function getStaticProps() {
  const initialVinyles = await getVinyles(null)
  return {
    props: {
      initialVinyles,
    },
  }
}

const Libraries: NextPage<{initialVinyles: VinyleResponse[]}> = ({
  initialVinyles,
}) => {
  return (
    <>
      <section className="flex h-full flex-col items-center justify-center gap-8 bg-background pt-8 pb-16 text-paragraph md:pt-8">
        <ErrorBoundary fallback={<LoadingError />}>
          <Suspense fallback={<LoadingSpinner />}>
            <VinyleWrapper
              getVinyles={getVinyles}
              initialVinyles={initialVinyles}
            />
          </Suspense>
        </ErrorBoundary>
      </section>
    </>
  )
}
/* <main className="h-full border-2 bg-buttonText pt-8 pb-16 md:pt-16">
        <div className="mx-auto flex max-w-full flex-col px-8 md:max-w-5xl">
          <Suspense fallback={<LoadingSpinner />}>
            

            {listVinyles && vinyles && vinyles.length > 0 && (
              <section>
                <article className="grid grid-cols-4 gap-8 overflow-hidden rounded-xl">
                  {vinyles.map((vinyle, index) => (
                    <LibraryDetail key={index} vinyle={vinyle} />
                  ))}
                </article>
              </section>
            )}
          </Suspense>
        </div>
      </main>
      <div className="flex-1 bg-buttonText" /> */

export default Libraries
