import React from 'react'
import {useRouter} from 'next/router'
import {UserModel} from '../../models/userModel'
import ProfileHeader from '../../components/profile/ProfileHeader'
import {NextPage} from 'next'
import Albums from '../../components/profile/Albums'

const UserProfile: NextPage = () => {
  const router = useRouter()
  const userId = router.query.userId as UserModel['_id']

  return (
    <>
      {userId && <ProfileHeader userId={userId} />}
      {userId && <Albums userId={userId} />}
    </>
    // <>
  )
}

export default UserProfile
