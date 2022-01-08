import React from 'react'
import {VinyleResponse} from '../../../models/albumModel'
import {NextPage} from 'next'
import {useQuery} from 'react-query'

// export async function getStaticProps() {
//   console.log('Getting them props !!')
//   const data = await fetch('http://localhost:3000/api/vinyles') // getLibraries()
//   const vinyles: VinyleResponse[] = await data.json()
//   return {
//     props: {
//       vinyles,
//     },
//   }
// }

const Two: NextPage<{vinyles: VinyleResponse[]}> = ({vinyles}) => {
  const {isLoading, error, data} = useQuery('repoData', () =>
    fetch('http://localhost:3000/api/vinyles').then(res => res.json()),
  )

  return (
    <>
      {vinyles?.length &&
        vinyles.map(vinyle => <h1 key={vinyle._id}>{vinyle.artistTitle}</h1>)}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      <article>
        {!isLoading && !error && data && JSON.stringify(data, null, 4)}
      </article>
    </>
  )
}

export default Two
