/* eslint-disable camelcase */
import axios, {AxiosError, AxiosResponse} from 'axios'
import {AlbumModel} from '../models/albumModel'
import {ErrorModel} from '../models/errorModel'
import {LibraryModel, RemoveAlbumFromLibraryModel} from '../models/libraryModel'
import {setAlert} from './alert'
import provideConfig from '../utils/axios-config'
import {UserModel} from '../models/userModel'
import {
  EMPTY_LIBRARIES,
  EMPTY_LIBRARY,
  GET_LIBRARIES,
  GET_LIBRARY_BY_USER_ID,
} from './types'
import {store} from '../store'

export const updateLibrary =
  () =>
  (dispatch: typeof store.dispatch): void => {
    const artistDetails = store.getState().root.discogsReducer.artists.selected
    const albumDetails = store.getState().root.discogsReducer.albums.selected

    const details: AlbumModel = {
      artistId: artistDetails.id,
      albumId: albumDetails.id,
      album_cover_url: albumDetails.cover_image,
      artist_cover_url: artistDetails.cover_image,
      release_date: albumDetails.year,
      artist_title: artistDetails.title,
      album_title: albumDetails.title,
      trade: true,
    }

    const body = JSON.stringify(details)

    const config = provideConfig()

    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/api/library`, body, config)
      .then(response => {
        if (response.status === 200) {
          dispatch(
            setAlert({
              msg: 'Votre ajout a bien été pris en  compte !',
              alertType: 'success',
            }),
          )
        }
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const {errors} = err.response?.data

          if (errors) {
            errors.forEach(error => {
              dispatch(setAlert({msg: error.msg, alertType: 'warning'}))
            })
          }
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          )
        }
      })
  }

export const getLibraries =
  () =>
  (dispatch: typeof store.dispatch): void => {
    dispatch({type: EMPTY_LIBRARIES})
    const config = provideConfig()

    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/library/`, config)
      .then((response: AxiosResponse<LibraryModel[]>) => {
        dispatch({type: GET_LIBRARIES, payload: response.data})
      })

      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const {errors} = err.response?.data

          if (errors) {
            errors.forEach(error => {
              dispatch(setAlert({msg: error.msg, alertType: 'warning'}))
            })
          }
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          )
        }
      })
  }

export const getLibraryByUserId =
  (userId: UserModel['_id']) =>
  (dispatch: typeof store.dispatch): void => {
    dispatch({type: EMPTY_LIBRARY})
    const config = provideConfig()
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/library/${userId}`, config)
      .then((response: AxiosResponse<LibraryModel>) => {
        dispatch({type: GET_LIBRARY_BY_USER_ID, payload: response.data})
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const {errors} = err.response?.data

          if (errors) {
            errors.forEach(error => {
              dispatch(setAlert({msg: error.msg, alertType: 'warning'}))
            })
          }
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          )
        }
      })
  }

export const removeAlbumFromLibrary =
  (albumRequest: RemoveAlbumFromLibraryModel) =>
  (dispatch: typeof store.dispatch): void => {
    const {albumId, type, albumTitle} = albumRequest
    dispatch({type: EMPTY_LIBRARY})
    const config = provideConfig()

    const body = JSON.stringify({
      id: albumId,
      type,
    })
    const url = `${process.env.REACT_APP_BACKEND_URI}/api/library/${albumId}`
    axios
      .put(url, body, config)
      .then(response => {
        dispatch({type: GET_LIBRARY_BY_USER_ID, payload: response.data})
        dispatch(
          setAlert({
            msg: `L'album "${albumTitle}" a été retiré de votre bibliothèque.`,
            alertType: 'success',
          }),
        )
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const {errors} = err.response?.data

          if (errors) {
            errors.forEach(error => {
              dispatch(setAlert({msg: error.msg, alertType: 'warning'}))
            })
          }
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          )
        }
      })
  }
