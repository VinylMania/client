import React, {useContext} from 'react'
import {VinyleResponse} from '../../models/albumModel'
import {UserModel} from '../../models/userModel'
import AlbumItem from './AlbumItem'
import axios, {AxiosResponse} from 'axios'
import provideConfig from '../../utils/axios-config'
import {useQuery} from 'react-query'
import AuthContext from '../../context/auth-context'

const getUserVinyles = async (userId: string): Promise<VinyleResponse[]> => {
  const response = await axios.get<string, AxiosResponse<VinyleResponse[]>>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/user/${userId}`,
    provideConfig(),
  )

  return response.data
}
const Albums: React.FC<{userId: UserModel['_id']}> = ({userId}) => {
  const auth = useContext(AuthContext)
  const {isAuthenticated, user} = auth
  const {
    data: userVinyles,
    refetch,
    isLoading,
  } = useQuery(
    'getUserVinyles',
    () => {
      return getUserVinyles(userId)
    },
    {refetchOnWindowFocus: false, enabled: true},
  )

  return (
    <section className="flex h-full w-full justify-center bg-buttonText">
      <div className="h-full w-full max-w-full px-4 py-8 md:max-w-5xl md:px-0">
        {userVinyles && userVinyles.length > 0 && (
          <>
            <h1 className="pb-8 text-3xl">Collection</h1>
            <div className="flex flex-row flex-wrap items-end justify-center gap-4 gap-y-8 py-8 md:justify-around">
              {userVinyles &&
                userVinyles.length > 0 &&
                userVinyles.map(album => (
                  <AlbumItem
                    refreshAlbums={refetch}
                    key={album._id}
                    isAuth={isAuthenticated}
                    isOwner={user && user._id === userId ? true : false}
                    album={album}
                  />
                ))}
            </div>
          </>
        )}
        {!userVinyles ||
          (userVinyles.length === 0 && (
            <h1 className="pb-8 text-3xl">
              Cet utilisateur n&apos;a pas encore ajouté de vinyle à sa
              collection.
            </h1>
          ))}
      </div>
    </section>
  )
}

export default Albums
