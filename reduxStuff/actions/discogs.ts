import axios, {AxiosResponse} from 'axios'
import {DiscogAlbumModel, DiscogArtistModel} from '../models/discogModel'
import {store} from '../store'
import provideConfig from '../utils/axios-config'
import {GET_ARTISTS, SEARCH_ARTISTS, GET_ALBUMS, SEARCH_ALBUMS} from './types'

export const getArtists =
  (query: {artist: string}) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    dispatch({type: SEARCH_ARTISTS})
    const body = JSON.stringify(query)
    const config = provideConfig()

    try {
      const response = await axios.post<
        string,
        AxiosResponse<DiscogArtistModel[]>
      >(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/discog/artist`,
        body,
        config,
      )
      const {data} = response

      dispatch({
        type: GET_ARTISTS,
        payload: data,
      })
    } catch (error) {
      // TODO : handle error
      dispatch({
        type: GET_ARTISTS,
        payload: [],
      })
    }
  }

export const getAlbums =
  (query: {artist: string; album: string}) =>
  async (dispatch: typeof store.dispatch): Promise<void> => {
    dispatch({type: SEARCH_ALBUMS})
    const body = JSON.stringify(query)
    const config = provideConfig()

    try {
      const response = await axios.post<
        string,
        AxiosResponse<DiscogAlbumModel[]>
      >(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/discog/album`, body, config)
      const {data} = response

      dispatch({type: GET_ALBUMS, payload: data})
    } catch (error) {
      // TODO : handle error
      dispatch({type: GET_ALBUMS, payload: []})
    }
  }
