import {searchVinyleQuery} from 'library'
import React, {useEffect, useRef, useState} from 'react'
import {useInfiniteQuery} from 'react-query'
import {VinyleResponse} from '../../models/albumModel'
import Filters from './Filters'
import Vinyle from './Vinyle'
const VinyleWrapper: React.FC<{
  getVinyles: (
    searchVinyleQuery: searchVinyleQuery,
  ) => Promise<VinyleResponse[]>
  initialVinyles: VinyleResponse[]
}> = ({getVinyles, initialVinyles}) => {
  const vinyleWrapperRef = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState<{
    artistTitle: searchVinyleQuery['artistTitle']
    albumTitle: searchVinyleQuery['albumTitle']
  }>({artistTitle: '', albumTitle: ''})
  const [itemId, setItemId] = useState<searchVinyleQuery['itemId']>('')

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch} =
    useInfiniteQuery(
      'getVinyles',
      ({pageParam = null}) => {
        const query: searchVinyleQuery = {
          itemId: itemId,
          ...filters,
        }
        return getVinyles(query)
      },
      {
        getNextPageParam: (
          lastPage: {itemId: VinyleResponse['_id']},
          pages,
        ) => {
          setItemId(lastPage.itemId)
          return lastPage.itemId
        },
        retry: true,
        suspense: false,

        initialData: initialVinyles,
      },
    )

  // useEffect(() => {
  //   console.log(filters, itemId)
  // }, [filters])

  return (
    <>
      {/* {!data.pages?.length && (
        <p className="py-8 text-center text-2xl font-bold text-headline">
          La bibliothèque est vide pour le moment.
        </p>
      )}

      {data && data.pages.length > 0 && vinyles?.length === 0 && (
        <p className="py-8 text-center text-2xl font-bold text-headline">
          Aucun résultat correspondant à votre recherche.
        </p>
      )} */}

      {/* {data && data.pages && <Filters setFilters={setFilters} />} */}
      <div
        ref={vinyleWrapperRef}
        className="grid max-w-5xl grid-cols-4 gap-8 overflow-hidden"
      >
        {data &&
          data.pages &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.vinyles.map(vinyle => (
                <Vinyle key={vinyle._id} vinyle={vinyle} />
              ))}
            </React.Fragment>
          ))}
      </div>
      <button
        className="btn-submit"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Chargement ...'
          : hasNextPage
          ? 'Charger plus de vinyles'
          : 'Aucun vinyle supplémentaire à afficher'}
      </button>
    </>
  )
}

export default VinyleWrapper
