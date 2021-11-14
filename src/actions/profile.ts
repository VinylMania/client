import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import { ErrorModel } from '../models/errorModel';
import { UserProfileModel } from '../models/userModel';
import { setAlert } from './alert';

export const getUserProfileById =
  (userId: string, callback: any, isLoading: any) =>
  (dispatch: any): void => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/users/${userId}`, config)
      .then((response: AxiosResponse<UserProfileModel>) => {
        callback(response.data);
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
        isLoading(false);
      });
  };

export const updateProfile =
  (avatarRef: React.RefObject<HTMLInputElement>, callback: any) =>
  (dispatch: any): void => {
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
      axios
        .put(`${process.env.REACT_APP_BACKEND_URI}/api/users`, formData, config)
        .then((response) => {
          callback(response.data);
          dispatch(
            setAlert({
              msg: 'Votre profil a été mis à jour !',
              alertType: 'success',
            }),
          );
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
    }
  };

export default getUserProfileById;
