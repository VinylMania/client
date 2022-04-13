import React, {Suspense, useEffect} from 'react'
import {GetServerSidePropsContext, GetStaticPropsContext, NextPage} from 'next'
import type {VinyleResponse} from '../../models/albumModel'
import Image from 'next/image'
import {useQuery} from 'react-query'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import SameArtist from '../../components/Vinyle/SameArtist'
import Link from 'next/link'
import axios from 'axios'
import LoadingError from '../../components/UI/LoadingError'
import {ErrorBoundary} from 'react-error-boundary'
import {useRouter} from 'next/router'
import {Button} from '@mantine/core'
import {Send} from 'react-feather'
import {CgProfile} from 'react-icons/cg'
import {BsPerson} from 'react-icons/bs'

const getVinyle = async (
  vinyleId: VinyleResponse['_id'],
): Promise<VinyleResponse> => {
  const response = await axios.get<VinyleResponse>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/${vinyleId ?? ''}`,
  )
  return response.data
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {vinyleId} = context.params
  const vinyle = await getVinyle(vinyleId)
  return {
    props: {initialVinyle: vinyle}, // will be passed to the page component as props
  }
}

const Vinyle: NextPage<{initialVinyle: VinyleResponse}> = ({initialVinyle}) => {
  const router = useRouter()
  const vinyleId = router.query.vinyleId as VinyleResponse['_id']

  const {data: vinyle} = useQuery(
    'getVinyle',
    async () => {
      window.scroll({top: 0, left: 0, behavior: 'smooth'})
      return await getVinyle(vinyleId)
    },
    {
      retry: true,
      initialData: initialVinyle,
      suspense: false,
      enabled: true,
      onError: err => {
        console.error(err)
      },
    },
  )

  return (
    <ErrorBoundary fallback={<LoadingError />}>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="h-full bg-background">
          <section className="flex flex-row justify-center py-8 text-paragraph">
            <div className="flex w-full max-w-5xl flex-col items-center bg-black/20 py-2 md:flex-row md:items-start">
              {vinyle && (
                <>
                  <div className="relative h-[600px] w-[600px]">
                    <Image
                      alt={vinyle.albumTitle}
                      layout="fill"
                      objectFit="cover"
                      quality={75}
                      src={vinyle.albumCoverUrl}
                      // src="https://images.unsplash.com/photo-1535992165812-68d1861aa71e?ixlib=rb-1.2.1"
                      placeholder="blur"
                      blurDataURL={vinyle.albumCoverUrl}
                      // blurDataURL="https://images.unsplash.com/photo-1535992165812-68d1861aa71e?ixlib=rb-1.2.1"
                    />
                  </div>
                  <div className="flex flex-col gap-2 px-4">
                    <strong>Information sur le vinyle</strong>
                    <h1 className="text-4xl font-semibold underline decoration-solid">
                      {vinyle.albumTitle.split('-')[1].trim() ??
                        vinyle.albumTitle}
                    </h1>
                    <div className="flex items-baseline gap-2">
                      <span className="italic">de</span>
                      <h2 className="text-2xl">{vinyle.artistTitle}</h2>
                    </div>
                    <p className="text-xl">{vinyle.year}</p>

                    <strong>Information sur le propriétaire</strong>

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
                    <div className="flex gap-4">
                      <Link href={`/chat/${vinyle.user._id}`} passHref>
                        <Button
                          type="button"
                          className="btn-submit border-2"
                          leftIcon={<Send />}
                        >
                          Contacter
                        </Button>
                      </Link>
                      <Link href={`/users/${vinyle.user._id}`} passHref>
                        <Button
                          component="a"
                          className="rounded-lg border-2 border-current bg-buttonText p-2 text-paragraph transition-all hover:bg-background "
                          leftIcon={<BsPerson size={20} />}
                        >
                          Voir le profil
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              {vinyle && (
                <SameArtist artistId={vinyle.artistId} vinyle={vinyle} />
              )}
            </Suspense>
          </section>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Vinyle
