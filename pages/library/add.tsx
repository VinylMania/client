import React, {FormEvent, useContext, useEffect, useRef, useState} from 'react'
import ArtistInput from '../../components/API input/ArtistInput'
import AlbumInput from '../../components/API input/AlbumInput'
import {DiscogAlbumModel, DiscogArtistModel} from '../../models/discogModel'
import Image from 'next/image'
import {ImCross} from 'react-icons/im'
import {flushSync} from 'react-dom'
import {AlbumModelDto, VinyleResponse} from '../../models/albumModel'
import axios, {AxiosError, AxiosResponse} from 'axios'
import provideConfig from '../../utils/axios-config'
import {useQuery} from 'react-query'
import ButtonLoader from '../../components/UI/ButtonLoader'
import AlertWrapper from '../../components/Alerts/Alerts'
import {AlertModel} from '../../models/alertModel'
import {ErrorModel} from '../../models/errorModel'
import Router, {useRouter} from 'next/router'
import AuthContext from '../../context/auth-context'
import {NextPage} from 'next'

const postVinyle = async (
  artist: DiscogArtistModel,
  album: DiscogAlbumModel,
): Promise<VinyleResponse> => {
  const {name: artistTitle, image: artistCoverUrl, id: artistId} = artist
  const {name: albumTitle, year, id: albumId, image: albumCoverUrl} = album

  const vinyle: AlbumModelDto = {
    artistTitle,
    artistCoverUrl,
    artistId,
    albumTitle,
    year,
    albumId,
    albumCoverUrl,
  }

  const response = await axios.post<string, AxiosResponse<VinyleResponse>>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
    JSON.stringify(vinyle),
    provideConfig(),
  )
  return response.data
}

const AddVinyl: NextPage = () => {
  const auth = useContext(AuthContext)

  useEffect(() => {
    if (!auth.isAuthenticated) {
      Router.push('/')
    }
  }, [auth])

  const [alerts, setAlerts] = useState<AlertModel[]>([])
  const [artistName, setArtistName] = useState('')
  const [selectedArtist, setSelectedArtist] = useState<
    DiscogArtistModel | undefined
  >()
  const artistInputRef = useRef<HTMLInputElement>(null)
  const albumInputRef = useRef<HTMLInputElement>(null)

  const [selectedAlbum, setSelectedAlbum] = useState<
    DiscogAlbumModel | undefined
  >()
  const onSubmit = (e: FormEvent): void => {
    setAlerts([])
    e.preventDefault()
    refetch()
  }

  const {data, refetch, isLoading} = useQuery(
    'postVinyle',
    () => {
      if (selectedArtist && selectedAlbum) {
        return postVinyle(selectedArtist, selectedAlbum)
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
      suspense: false,
      onError: (err: AxiosError<ErrorModel>) => {
        let newAlerts: AlertModel[] = []
        window.scroll({behavior: 'smooth', top: 0})
        if (!Array.isArray(err.response?.data?.message)) {
          newAlerts.push({
            alertType: 'warning',
            msg: err.response?.data?.message || '',
          })
        } else {
          newAlerts.push({
            alertType: 'warning',
            msg: 'Une erreur serveur est revenue. Veuillez réessayer.',
          })
        }

        flushSync(() => {
          window.scroll({behavior: 'smooth', top: 0})
          setAlerts(newAlerts)
        })
      },
      onSuccess: () => {
        let newAlerts: AlertModel[] = []
        newAlerts.push({
          alertType: 'success',
          msg: 'Vous avez ajouté ce vinyle avec succès !',
        })
        setAlerts(newAlerts)
      },
    },
  )

  return (
    <>
      <section className="w-full p-0 m-0">
        <form
          className="py-8 px-0 mx-0 lg:px-8 md:px-8 flex justify-center"
          onSubmit={e => onSubmit(e)}
        >
          <div
            className={`border-white border-2 bg-black/30 backdrop-blur-md p-8 gap-4 flex flex-col w-full lg:w-1/3 md:w-1/2 ${
              selectedArtist
                ? 'rounded-none md:rounded-l-3xl'
                : 'rounded-none md:rounded-3xl'
            }`}
          >
            <AlertWrapper alerts={alerts} />
            <ArtistInput
              isArtistInputLocked={selectedArtist !== undefined}
              setSelectedArtist={setSelectedArtist}
              artistName={artistName}
              selectedArtist={selectedArtist}
              setArtistName={setArtistName}
              artistInputRef={artistInputRef}
            />
            {selectedArtist && (
              <AlbumInput
                albumInputRef={albumInputRef}
                selectedAlbum={selectedAlbum}
                isAlbumInputLocked={selectedAlbum !== undefined}
                setSelectedAlbum={setSelectedAlbum}
                selectedArtist={selectedArtist}
              />
            )}
            {selectedArtist && selectedAlbum && (
              <button
                className={`mt-2 ${true ? 'btn-submit' : 'btn-disabled'}`}
                type="submit"
              >
                {' '}
                {isLoading && <ButtonLoader />}
                Ajouter le vinyle
              </button>
            )}
          </div>
          <div
            className={`border-2 flex flex-col lg:flex-row gap-8 border-white rounded-none md:rounded-r-3xl border-l-0 p-8 bg-black/30 backdrop-blur-md ${
              selectedArtist ? '' : 'hidden'
            }`}
          >
            {selectedArtist && (
              <figure>
                <figcaption>
                  Artiste sélectionné :{' '}
                  <span className="block font-semibold">
                    {selectedArtist.name}
                  </span>
                </figcaption>
                <div className="relative w-[160px] h-[160px] overflow-hidden">
                  <Image
                    alt={selectedArtist.name}
                    layout="fill"
                    objectFit="contain"
                    quality={50}
                    src={selectedArtist.image}
                    priority={true}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    flushSync(() => {
                      setSelectedArtist(undefined)
                      selectedAlbum && setSelectedAlbum(undefined)
                    })

                    artistInputRef.current?.focus()
                  }}
                  className="group text-lg my-4 cursor-pointer flex flex-row items-center hover:text-button focus:text-button"
                >
                  <ImCross className="mr-2 transform rotate-0 transition-all duration-200 group-hover:rotate-90 group-focus:rotate-90" />
                  Modifier
                </button>
              </figure>
            )}
            {selectedAlbum && (
              <figure>
                <figcaption>
                  Album sélectionné :{' '}
                  <span className="block font-semibold">
                    {selectedAlbum.name}
                  </span>
                </figcaption>
                <div className="relative w-[160px] h-[160px] overflow-hidden">
                  <Image
                    alt={selectedAlbum.name}
                    layout="fill"
                    objectFit="contain"
                    quality={50}
                    src={selectedAlbum.image}
                    priority={true}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    flushSync(() => {
                      setSelectedAlbum(undefined)
                    })
                    albumInputRef.current?.focus()
                  }}
                  className="group text-lg my-4 cursor-pointer flex flex-row items-center hover:text-button focus:text-button"
                >
                  <ImCross className="mr-2 transform rotate-0 transition-all duration-200 group-hover:rotate-90 group-focus:rotate-90" />
                  Modifier
                </button>
              </figure>
            )}
          </div>
        </form>
      </section>
    </>
  )
}

export default AddVinyl
