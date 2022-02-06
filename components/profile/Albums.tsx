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
    <section className="flex justify-center w-full h-full bg-buttonText">
      <div className="max-w-full w-full md:max-w-5xl px-4 md:px-0 h-full py-8">
        {userVinyles && userVinyles.length > 0 && (
          <>
            <h1 className="text-3xl pb-8">Collection</h1>
            <div className="py-8 flex gap-4 gap-y-8 flex-row flex-wrap justify-center md:justify-around items-end">
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
            <h1 className="text-3xl pb-8">
              Cet utilisateur n&apos;a pas encore ajouté de vinyle à sa
              collection.
            </h1>
          ))}
      </div>
    </section>
  )
}

export default Albums
