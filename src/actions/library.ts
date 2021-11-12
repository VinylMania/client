/* eslint-disable camelcase */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AlbumModel } from '../models/albumModel';
import { ErrorModel } from '../models/errorModel';
import { LibraryModel } from '../models/libraryModel';
import { setAlert } from './alert';

export const updateLibrary =
  (query: AlbumModel) =>
  (dispatch: any): void => {
    const body = JSON.stringify(query);

    const privateToken = localStorage.token ? localStorage.token : '';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': privateToken,
      },
    };

    axios
      .post('http://localhost:5000/api/library', body, config)
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            setAlert({
              msg: 'Votre ajout a bien été pris en  compte !',
              alertType: 'success',
            }),
          );
        }
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const { errors } = err.response?.data;

          if (errors) {
            errors.forEach((error) => {
              dispatch(setAlert({ msg: error.msg, alertType: 'warning' }));
            });
          }
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          );
        }
      });
  };

export const getLibraries =
  (callback: any) =>
  (dispatch: any): void => {
    const privateToken = localStorage.token ? localStorage.token : '';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': privateToken,
      },
    };
    axios
      .get('http://localhost:5000/api/library/', config)
      .then((response: AxiosResponse<LibraryModel[]>) => {
        callback(response.data);
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const { errors } = err.response?.data;

          if (errors) {
            errors.forEach((error) => {
              dispatch(setAlert({ msg: error.msg, alertType: 'warning' }));
            });
          }
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          );
        }
      });
  };
