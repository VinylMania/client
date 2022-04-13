import React, {useRef} from 'react'
import {useInfiniteQuery} from 'react-query'
import {UserModel, Users} from '../../models/userModel'
import User from './index'

const UserWrapper: React.FC<{
  initialUsers: Users
  getUsers: (userId: UserModel['_id'] | null) => Promise<Users>
}> = ({initialUsers, getUsers}) => {
  const userWrapperRef = useRef<HTMLDivElement>(null)

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery(
      'getUsers',
      ({pageParam = null}) => {
        return getUsers(pageParam)
      },
      {
        getNextPageParam: (lastPage: {itemId: UserModel['_id']}, pages) => {
          return lastPage.itemId
        },
        retry: true,
        suspense: false,

        initialData: initialUsers,
      },
    )

  return (
    <>
      <div
        ref={userWrapperRef}
        className="grid w-full max-w-4xl grid-cols-4 gap-8"
      >
        {data &&
          data.pages &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.users.map(user => (
                <User key={user._id} user={user} />
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
          ? 'Charger plus de profils'
          : 'Aucun profil supplémentaire à afficher'}
      </button>{' '}
    </>
  )
}

export default UserWrapper
