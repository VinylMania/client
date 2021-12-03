import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { ErrorModel } from '../models/errorModel';
import { UserModel, UserProfileModel } from '../models/userModel';
import { setAlert } from './alert';
import { GET_PROFILE, EMPTY_PROFILE } from './types';
import provideConfig from '../utils/axios-config';
import { store } from '../store';

export const getUserProfileById =
  (userId: UserProfileModel['_id']) =>
  (dispatch: typeof store.dispatch): void => {
    dispatch({ type: EMPTY_PROFILE });
    const config = provideConfig();

    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/users/${userId}`, config)
      .then((response: AxiosResponse<UserProfileModel>) => {
        dispatch({ type: GET_PROFILE, payload: response.data });
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response !== undefined) {
          const { errors } = err.response.data;

          if (errors) {
            errors.forEach((error) => {
              dispatch(setAlert({ msg: error.msg, alertType: 'warning' }));
            });
          }
        }
      });
  };

export const updateProfile =
  (avatarRef: React.RefObject<HTMLInputElement>) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    const privateToken = localStorage.token ? localStorage.token : '';

    if (avatarRef.current?.files) {
      const avatar = avatarRef.current.files[0];
      const formData = new FormData();

      formData.append('file', avatar);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': privateToken,
        },
      };

      try {
        const { data: user } = await axios.put<
          FormData,
          AxiosResponse<UserModel>
        >(`${process.env.REACT_APP_BACKEND_URI}/api/users`, formData, config);

        dispatch(getUserProfileById(user._id));

        dispatch(
          setAlert({
            msg: 'Votre profil a été mis à jour !',
            alertType: 'success',
          }),
        );
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errors = err as AxiosError<ErrorModel>;
          const messages = errors.response?.data.errors;

          if (messages) {
            messages.forEach((error) => {
              dispatch(setAlert({ msg: error.msg, alertType: 'warning' }));
            });
          }
        }
      }
    }
  };

export default getUserProfileById;
