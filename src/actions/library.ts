/* eslint-disable camelcase */
import axios, { AxiosError } from 'axios';
import { setAlert } from './alert';

export const getLibrary =
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
      .get('http://localhost:5000/api/library/me', config)
      .then((response: any) => {
        callback(response.data.library);
      })
      .catch((err: any) => {
        const { errors } = err.response?.data;

        if (errors) {
          errors.forEach((error: any) => {
            dispatch(setAlert({ msg: error.msg, alertType: 'danger' }));
          });
        }
      });
  };

export const updateLibrary =
  (query: any) =>
  (dispatch: any): void => {
    const {
      artistId,
      albumId,
      albumCoverUrl,
      artistCoverUrl,
      releaseDate,
      artistTitle,
      albumTitle,
    } = query;

    const body = JSON.stringify({
      artistId,
      albumId,
      album_cover_url: albumCoverUrl,
      artist_cover_url: artistCoverUrl,
      release_date: releaseDate,
      artist_title: artistTitle,
      album_title: albumTitle,
    });

    const privateToken = localStorage.token ? localStorage.token : '';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': privateToken,
      },
    };

    axios
      .post('http://localhost:5000/api/library', body, config)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((err) => {
        const { errors } = err.response?.data;

        if (errors) {
          errors.forEach((error: any) => {
            dispatch(setAlert({ msg: error.msg, alertType: 'danger' }));
          });
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
      .then((response: any) => {
        callback(response.data);
      })
      .catch((err) => {
        const { errors } = err.response?.data;

        console.log(err.response.data);
        if (errors) {
          errors.forEach((error: any) => {
            dispatch(setAlert({ msg: error.msg, alertType: 'danger' }));
          });
        }
      });
  };
