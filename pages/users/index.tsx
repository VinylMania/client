import React, {Suspense} from 'react'
import type {UserModel, Users} from '../../models/userModel'
import {NextPage} from 'next'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import {ErrorBoundary} from 'react-error-boundary'
import LoadingError from '../../components/UI/LoadingError'
import UserWrapper from '../../components/User/UserWrapper'
import axios from 'axios'

const getUsers = async (userId: UserModel['_id'] | null): Promise<Users> => {
  const response = await axios.get<Users>(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users${
      userId !== null ? `?itemId=${userId}` : ''
    }`,
  )
  return response.data
}

export async function getStaticProps() {
  const initialUsers = await getUsers(null)
  return {
    props: {
      initialUsers,
    },
  }
}

const UserProfile: NextPage<{initialUsers: Users}> = ({initialUsers}) => {
  return (
    <>
      <section className="flex h-full flex-col items-center justify-center gap-8 bg-background pt-8 pb-16 text-paragraph md:pt-8">
        <ErrorBoundary fallback={<LoadingError />}>
          <Suspense fallback={<LoadingSpinner />}>
            <UserWrapper getUsers={getUsers} initialUsers={initialUsers} />
          </Suspense>
        </ErrorBoundary>
      </section>
      <div className="flex-1 bg-background"></div>
    </>
  )
}

export default UserProfile
