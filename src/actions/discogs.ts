import axios, {AxiosResponse} from 'axios'
import {
  DiscogAlbumResponseModel,
  DiscogArtistResponseModel,
} from '../models/discogModel'
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
        AxiosResponse<DiscogArtistResponseModel>
      >(`${process.env.REACT_APP_BACKEND_URI}/api/artists/search`, body, config)

      const {results} = response.data.data
      const filteredArtists = results.filter(artist =>
        artist.title.toLowerCase().includes(query.artist.toLowerCase()),
      )
      dispatch({
        type: GET_ARTISTS,
        payload: filteredArtists,
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
        AxiosResponse<DiscogAlbumResponseModel>
      >(`${process.env.REACT_APP_BACKEND_URI}/api/albums/search`, body, config)
      const {results} = response.data.data

      const filteredAlbums = results
      dispatch({type: GET_ALBUMS, payload: filteredAlbums})
    } catch (error) {
      // TODO : handle error
      dispatch({type: GET_ALBUMS, payload: []})
    }
  }
