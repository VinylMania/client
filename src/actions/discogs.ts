import axios, { AxiosError, AxiosResponse } from 'axios';
import setAlert from './alert';

export const getArtists =
  (query: string, callback: any) =>
  (dispatch: any): void => {
    const body = JSON.stringify({ artist: query });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/api/artists/search`,
        body,
        config,
      )
      .then((response: any) => {
        const {
          data: { data },
        } = response;
        const filteredArtists = data.results.filter((artist: any) =>
          artist.title.toLowerCase().includes(query.toLowerCase()),
        );
        callback(filteredArtists);
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

export const getAlbums =
  (query: string, artistName: string, callback: any) =>
  (dispatch: any): void => {
    const body = JSON.stringify({ artist: artistName, album: query });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/api/albums/search`,
        body,
        config,
      )
      .then((response: any) => {
        const {
          data: { data },
        } = response;
        const filteredAlbums = data.results.filter((album: any) =>
          album.title.toLowerCase().includes(query.toLowerCase()),
        );
        callback(filteredAlbums);
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
