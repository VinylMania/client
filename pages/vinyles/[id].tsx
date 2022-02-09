import React, {Suspense, useEffect} from 'react'
import {NextPage} from 'next'
import type {VinyleResponse} from '../../models/albumModel'
import Image from 'next/image'
import {useQuery} from 'react-query'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import SameArtist from '../../components/Vinyle/SameArtist'
import Owners from '../../components/Vinyle/Owners'
import Link from 'next/link'
import axios from 'axios'
import LoadingError from '../../components/UI/LoadingError'
import {ErrorBoundary} from 'react-error-boundary'

const getVinyle = async (
  id: VinyleResponse['_id'],
): Promise<VinyleResponse> => {
  const response = await axios.get<VinyleResponse>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/${id}`,
  )
  return response.data
}

export async function getStaticPaths() {
  const response = await axios.get<VinyleResponse[]>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
  )
  const vinyles = response.data

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
  const {data: vinyle, refetch} = useQuery(
    'vinyle',
    async () => {
      window.scroll({top: 0, left: 0, behavior: 'smooth'})
      return await getVinyle(initialVinyle._id)
    },
    {
      initialData: initialVinyle,
      retry: false,
      onError: err => {
        console.error(err)
      },
    },
  )
  useEffect(() => {
    refetch()
  }, [initialVinyle, refetch])

  return (
    <ErrorBoundary fallback={<LoadingError />}>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="flex flex-row justify-center py-8">
          <div className="flex w-2/4 flex-col items-center border py-2 md:flex-row md:items-start">
            {vinyle && (
              <>
                <div className="relative h-[200px] w-[200px]">
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
                <div className="flex-1 px-4">
                  <h1 className="text-4xl font-semibold underline decoration-solid">
                    {vinyle.albumTitle}
                  </h1>
                  <h2 className="text-2xl">{vinyle.artistTitle}</h2>
                  <p className="text-xl">{vinyle.year}</p>

                  <Link href={`/users/${vinyle.user._id}`}>
                    <a className="group flex flex-row py-2">
                      <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full border-2 border-white transition-all duration-300 group-hover:border-button">
                        <Image
                          alt={`Image de profil de ${vinyle.user.username}`}
                          layout="fill"
                          objectFit="contain"
                          quality={50}
                          src={vinyle.user.avatar}
                          placeholder="blur"
                          blurDataURL={vinyle.user.avatar}
                        />
                      </div>
                      <h3 className="pl-2 text-lg transition-all duration-300 group-hover:text-xl group-hover:text-button">
                        {vinyle.user.username}
                      </h3>
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
        <div className="flex flex-col justify-start text-white md:flex-row">
          <Suspense
            fallback={
              <div className="flex-1">
                <LoadingSpinner />
              </div>
            }
          >
            {vinyle && (
              <SameArtist artistId={vinyle.artistId} vinyle={vinyle} />
            )}
          </Suspense>

          <Suspense
            fallback={
              <div className="flex-1">
                <LoadingSpinner />
              </div>
            }
          >
            {vinyle && <Owners albumId={vinyle.albumId} vinyle={vinyle} />}
          </Suspense>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Vinyle
