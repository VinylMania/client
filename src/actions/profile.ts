import axios, {AxiosResponse} from 'axios'
import React from 'react'
import {UserModel, UserProfileModel} from '../models/userModel'
import {setAlert} from './alert'
import {GET_PROFILE, EMPTY_PROFILE} from './types'
import provideConfig from '../utils/axios-config'
import {store} from '../store'
import handleErrors from '../utils/errorHandler'

export const getUserProfileById =
  (userId: UserProfileModel['_id']) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    dispatch({type: EMPTY_PROFILE})
    const config = provideConfig()

    try {
      const response = await axios.get<AxiosResponse<UserProfileModel>>(
        `${process.env.REACT_APP_BACKEND_URI}/api/users/${userId}`,
        config,
      )

      dispatch({type: GET_PROFILE, payload: response.data})
    } catch (err) {
      handleErrors(
        err as {error: string; message: string | string[]; statusCode: number},
      )
    }
  }

export const updateProfile =
  (avatarRef: React.RefObject<HTMLInputElement>) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    const privateToken = localStorage.token ? localStorage.token : ''

    if (avatarRef.current?.files) {
      const avatar = avatarRef.current.files[0]
      const formData = new FormData()

      formData.append('file', avatar)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': privateToken,
        },
      }

      try {
        const response = await axios.put<FormData, AxiosResponse<UserModel>>(
          `${process.env.REACT_APP_BACKEND_URI}/api/users`,
          formData,
          config,
        )

        dispatch(getUserProfileById(response.data._id))

        dispatch(
          setAlert({
            msg: 'Votre profil a été mis à jour !',
            alertType: 'success',
          }),
        )
      } catch (err) {
        handleErrors(
          err as {
            error: string
            message: string | string[]
            statusCode: number
          },
        )
      }
    }
  }

export default getUserProfileById
