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

export async function getStaticProps(ctx) {
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
    <Suspense fallback={<LoadingSpinner />}>
      <LoadingError />
      <section className="flex flex-row justify-center">
        <div className="border w-2/4 py-2 flex flex-row">
          {vinyle && (
            <>
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
              <div className="flex-1 px-4">
                <h1 className="text-4xl font-semibold underline decoration-solid">
                  {vinyle.albumTitle}
                </h1>
                <h2 className="text-2xl">{vinyle.artistTitle}</h2>
                <p className="text-xl">{vinyle.year}</p>

                <Link href={`/users/${vinyle.user._id}`}>
                  <a className="group flex flex-row py-2">
                    <div className="relative w-[40px] h-[40px] group-hover:border-button border-2 transition-all duration-300 border-white rounded-full overflow-hidden">
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
                    <h3 className="group-hover:text-button transition-all duration-300 text-lg group-hover:text-xl pl-2">
                      {vinyle.user.username}
                    </h3>
                  </a>
                </Link>
                <div className="flex flex-row">
                  <button className="flex-1 bg-green-500">
                    Envoyer un message
                  </button>
                  <button className="flex-1 bg-purple-600">
                    Consulter le profil
                  </button>
                  <button className="flex-1 bg-red-600">Signaler</button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <div className="text-white flex flex-row justify-start">
        {vinyle && <SameArtist artistId={vinyle.artistId} vinyle={vinyle} />}
        {vinyle && <Owners albumId={vinyle.albumId} vinyle={vinyle} />}
      </div>
    </Suspense>
  )
}

export default Vinyle
