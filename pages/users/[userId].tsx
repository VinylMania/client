import React, {Suspense} from 'react'
import {useRouter} from 'next/router'
import type {UserModel} from '../../models/userModel'
import ProfileHeader from '../../components/profile/ProfileHeader'
import {NextPage} from 'next'
import Albums from '../../components/profile/Albums'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import {ErrorBoundary} from 'react-error-boundary'
import LoadingError from '../../components/UI/LoadingError'

const UserProfile: NextPage = () => {
  const router = useRouter()
  const userId = router.query.userId as UserModel['_id']

  return (
    <section className="min-h-full w-full flex-1 bg-buttonText text-paragraph">
      <ErrorBoundary fallback={<LoadingError />}>
        <Suspense fallback={<LoadingSpinner />}>
          {userId && <ProfileHeader userId={userId} />}
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<LoadingError />}>
        <Suspense fallback={<LoadingSpinner />}>
          {userId && <Albums userId={userId} />}
        </Suspense>
      </ErrorBoundary>
    </section>
  )
}

export default UserProfile
