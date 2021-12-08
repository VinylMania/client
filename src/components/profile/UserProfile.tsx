import React, {useEffect} from 'react'

import {useParams} from 'react-router'
import {UserModel} from '../../models/userModel'
import ProfileHeader from './ProfileHeader'
import Albums from './Albums'
import {AlbumModel} from '../../models/albumModel'

const UserProfile: React.FC = () => {
  const {userId} = useParams<UserModel['_id']>()
  const {albumId} = useParams<AlbumModel['albumId']>()

  useEffect(() => {
    if (albumId) {
      const selectedAlbum = document.getElementById(albumId)
      selectedAlbum?.scrollIntoView({behavior: 'smooth'})
    }
  }, [albumId])

  return (
    <>
      {userId && <ProfileHeader userId={userId} />}
      {userId && <Albums userId={userId} />}
    </>
  )
}

export default UserProfile
