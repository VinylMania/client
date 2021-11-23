import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  DiscogAlbumModel,
  DiscogArtistModel,
  DiscogAlbumResponseModel,
} from '../models/discogModel';
import { AppDispatch } from '../store';
import setAlert from './alert';

export const getArtists =
  (
    query: string,
    callback: React.Dispatch<
      React.SetStateAction<DiscogAlbumModel[] | DiscogArtistModel[] | undefined>
    >,
  ) =>
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
  (
    query: string,
    callback: React.Dispatch<
      React.SetStateAction<DiscogAlbumModel[] | DiscogArtistModel[] | undefined>
    >,
    artistName?: string,
  ) =>
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
        if (response.data && response.data.results) {
          const { results } = response.data.data;
          const filteredAlbums = results.filter((album: DiscogAlbumModel) =>
            album.title.toLowerCase().includes(query.toLowerCase()),
          );
          callback(filteredAlbums);
        }
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
