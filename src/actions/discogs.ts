import axios from 'axios';
import { DiscogArtistModel } from '../models/discogModel';
import setAlert from './alert';
import { store } from '../store';
import provideConfig from '../utils/axios-config';
import {
  GET_ARTISTS,
  SEARCH_ARTISTS,
  GET_ALBUMS,
  SEARCH_ALBUMS,
} from './types';

export const getArtists =
  (query: { artist: string }) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    dispatch({ type: SEARCH_ARTISTS });
    const body = JSON.stringify(query);
    const config = provideConfig();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/api/artists/search`,
        body,
        config,
      )
      .then((response: any) => {
        if (response.data.data.results) {
          const { results } = response.data.data;
          const filteredArtists = results.filter((artist: DiscogArtistModel) =>
            artist.title.toLowerCase().includes(query.artist.toLowerCase()),
          );
          dispatch({
            type: GET_ARTISTS,
            payload: filteredArtists,
          });
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

export const getAlbums =
  (query: { artist: string; album: string }) =>
  (dispatch: typeof store.dispatch): void => {
    dispatch({ type: SEARCH_ALBUMS });
    const body = JSON.stringify(query);
    const config = provideConfig();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URI}/api/albums/search`,
        body,
        config,
      )
      .then((response: any) => {
        if (response.data.data.results) {
          const { results } = response.data.data;
          const filteredAlbums = results;
          dispatch({ type: GET_ALBUMS, payload: filteredAlbums });
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
