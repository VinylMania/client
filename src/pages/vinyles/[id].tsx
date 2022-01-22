import React from 'react'
import {NextPage} from 'next'
import {VinyleResponse} from '../../../models/albumModel'
import Image from 'next/image'
import {useQuery} from 'react-query'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
import SameArtist from '../../../components/Vinyle/SameArtist'
import Owners from '../../../components/Vinyle/Owners'
import Link from 'next/link'

const getVinyle = async (
  id: VinyleResponse['_id'],
): Promise<VinyleResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/${id}`,
  )
  return await response.json()
}

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
  )
  const vinyles = await response.json()

  const paths = vinyles.map((vinyle: VinyleResponse) => ({
    params: {
      id: vinyle._id,
    },
  }))
  return {paths, fallback: 'blocking'}
}

export async function getStaticProps(ctx: any) {
  const vinyleId = ctx.params.id
  const initialVinyle = await getVinyle(vinyleId)
  return {
    props: {
      initialVinyle,
    },
  }
}

const Vinyle: NextPage<{
  initialVinyle: VinyleResponse
}> = ({initialVinyle}) => {
  const {
    data: vinyle,
    isLoading,
    isError,
  } = useQuery('vinyle', () => getVinyle(initialVinyle._id), {
    initialData: initialVinyle,
  })

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isError && <p>Une erreur est survenue.</p>}
      {!isLoading && vinyle && (
        <>
          <section className="bg-third flex flex-row justify-center">
            <div className="bg-second w-2/3 py-2 flex flex-row text-white">
              <div className="relative w-[200px] h-[200px]">
                <Image
                  alt={vinyle.albumTitle}
                  layout="fill"
                  objectFit="contain"
                  quality={50}
                  src={vinyle.albumCoverUrl}
                  placeholder="blur"
                  blurDataURL={vinyle.albumCoverUrl}
                />
              </div>
              <div className="px-4">
                <h1 className="text-4xl font-semibold underline decoration-solid">
                  {vinyle.albumTitle}
                </h1>
                <h2 className="text-2xl">{vinyle.artistTitle}</h2>
                <p className="text-xl">{vinyle.year}</p>

                <Link href={`/users/${vinyle.user._id}`}>
                  <a className="flex flex-row py-4">
                    <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden">
                      <Image
                        alt={`Image de profil de ${vinyle.user.username}`}
                        layout="fill"
                        objectFit="contain"
                        quality={50}
                        src={`https:${vinyle.user.avatar}`}
                        placeholder="blur"
                        blurDataURL={`https:${vinyle.user.avatar}`}
                      />
                    </div>
                    <h3 className="text-lg pl-2">{vinyle.user.username}</h3>
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
      <div className="text-white flex flex-row justify-start">
        {vinyle && <SameArtist artistId={vinyle.artistId} vinyle={vinyle} />}
        <div className="w-1/3 bg-teal-600 py-4"></div>
        {vinyle && <Owners albumId={vinyle.albumId} vinyle={vinyle} />}
      </div>
    </>
  )
}

export default Vinyle
