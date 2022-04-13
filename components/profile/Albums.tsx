import React, {useContext} from 'react'
import {VinyleResponse} from '../../models/albumModel'
import {UserModel} from '../../models/userModel'
import AlbumItem from './AlbumItem'
import axios, {AxiosResponse} from 'axios'
import provideConfig from '../../utils/axios-config'
import {useQuery} from 'react-query'
import AuthContext from '../../context/auth-context'
import {Image} from '@mantine/core'

const getUserVinyles = async (
  userId: string,
): Promise<{
  artist: VinyleResponse['artistTitle']
  vinyles: VinyleResponse[]
}> => {
  const response = await axios.get<
    string,
    AxiosResponse<{
      artist: VinyleResponse['artistTitle']
      vinyles: VinyleResponse[]
    }>
  >(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/user/${userId}`,
    provideConfig(),
  )

  return response.data
}
const Albums: React.FC<{userId: UserModel['_id']}> = ({userId}) => {
  const auth = useContext(AuthContext)
  const {isAuthenticated, user} = auth
  const {data: userVinyles, refetch} = useQuery(
    'getUserVinyles',
    () => {
      return getUserVinyles(userId)
    },
    {refetchOnWindowFocus: false, enabled: true, retry: false},
  )

  return (
    <section className="flex h-full w-full justify-center bg-buttonText">
      <div className="h-full w-full max-w-full md:max-w-4xl md:px-0">
        {userVinyles && userVinyles.length > 0 && (
          <>
            <h1 className="pb-8 text-3xl">Collection</h1>
            <div className="grid grid-cols-2 gap-8 py-8 md:justify-around">
              {userVinyles &&
                userVinyles.length > 0 &&
                userVinyles.map((album, key) => (
                  <div className="rounded-lg bg-slate-500 p-4" key={key}>
                    <div className="flex gap-4">
                      <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full border-4 border-button">
                        <Image
                          alt={`${album.artist}`}
                          layout="fill"
                          objectFit="cover"
                          width={60}
                          height={60}
                          blurDataURL={album.artistCoverUrl}
                          src={album.artistCoverUrl}
                          quality={30}
                          placeholder="blur"
                        />
                      </div>
                      <h2>{album.artist}</h2>
                    </div>
                    <ul>
                      {album.vinyles.map((vinyle, key) => (
                        <AlbumItem
                          refreshAlbums={refetch}
                          key={vinyle._id}
                          isAuth={isAuthenticated}
                          isOwner={user && user._id === userId ? true : false}
                          album={vinyle}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </>
        )}
        {!userVinyles ||
          (userVinyles.length === 0 && (
            <h1 className="pb-8 text-center text-3xl">
              Cet utilisateur n&apos;a pas encore ajouté de vinyle à sa
              collection.
            </h1>
          ))}
      </div>
    </section>
  )
}

export default Albums
