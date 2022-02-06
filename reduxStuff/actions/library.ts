// import axios, {AxiosResponse} from 'axios'
// import {AlbumModelDto, VinyleResponse} from '../models/albumModel'
// import {RemoveAlbumFromLibraryModel} from '../models/libraryModel'
// import {setAlert} from './alert'
// import provideConfig from '../utils/axios-config'
// import {UserModel} from '../models/userModel'
// import {
//   EMPTY_LIBRARIES,
//   EMPTY_LIBRARY,
//   GET_LIBRARIES,
//   GET_LIBRARY_BY_USER_ID,
// } from './types'
// import {store} from '../store'
// import handleErrors from '../utils/errorHandler'
// import {DiscogAlbumModel, DiscogArtistModel} from '../models/discogModel'

// export const addVinyle =
//   () =>
//   async (dispatch: typeof store.dispatch): Promise<void> => {
//     const artistDetails: DiscogArtistModel =
//       store.getState().root.discogsReducer.artists.selected
//     const albumDetails: DiscogAlbumModel =
//       store.getState().root.discogsReducer.albums.selected

//     const {
//       id: artistId,
//       name: artistTitle,
//       image: artistCoverUrl,
//     } = artistDetails

//     const {
//       id: albumId,
//       name: albumTitle,
//       year,
//       image: albumCoverUrl,
//     } = albumDetails

//     const details: AlbumModelDto = {
//       artistId,
//       artistTitle,
//       artistCoverUrl,
//       albumId,
//       albumTitle,
//       albumCoverUrl,
//       year,
//     }

//     const body = JSON.stringify(details)

//     const config = provideConfig()

//     try {
//       await axios.post<string, AxiosResponse<VinyleResponse>>(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles`,
//         body,
//         config,
//       )
//       dispatch(
//         setAlert({
//           msg: 'Votre ajout a bien été pris en compte !',
//           alertType: 'success',
//         }),
//       )
//     } catch (err) {
//       handleErrors(
//         err as {error: string; message: string | string[]; statusCode: number},
//       )
//     }
//   }

// export const getLibraries =
//   () =>
//   async (dispatch: typeof store.dispatch): Promise<void> => {
//     dispatch({type: EMPTY_LIBRARIES})
//     const config = provideConfig()
//     try {
//       const response = await axios.get<AxiosResponse<VinyleResponse[]>>(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/`,
//         config,
//       )

//       dispatch({type: GET_LIBRARIES, payload: response.data})
//     } catch (err) {
//       handleErrors(
//         err as {error: string; message: string | string[]; statusCode: number},
//       )
//       dispatch({type: GET_LIBRARIES, payload: []})
//     }
//   }

// export const getLibraryByUserId =
//   (userId: UserModel['_id']) =>
//   async (dispatch: typeof store.dispatch): Promise<void> => {
//     dispatch({type: EMPTY_LIBRARY})
//     const config = provideConfig()

//     try {
//       const {data} = await axios.get<AxiosResponse<VinyleResponse[]>>(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/user/${userId}`,
//         config,
//       )

//       dispatch({type: GET_LIBRARY_BY_USER_ID, payload: data})
//     } catch (err) {
//       handleErrors(
//         err as {error: string; message: string | string[]; statusCode: number},
//       )
//     }
//   }

// export const removeAlbumFromLibrary =
//   (albumRequest: RemoveAlbumFromLibraryModel) =>
//   async (dispatch: typeof store.dispatch): Promise<void> => {
//     const {albumId, albumTitle} = albumRequest
//     dispatch({type: EMPTY_LIBRARY})
//     const config = provideConfig()

//     // add param to await axios.delete
//     const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/vinyles/${albumId}`

//     try {
//       const {data} = await axios.delete<string, AxiosResponse<VinyleResponse>>(
//         url,
//         config,
//       )

//       dispatch({type: GET_LIBRARY_BY_USER_ID, payload: data})
//       dispatch(
//         setAlert({
//           msg: `L'album "${albumTitle}" a été retiré de votre bibliothèque.`,
//           alertType: 'success',
//         }),
//       )
//     } catch (err) {
//       handleErrors(
//         err as {error: string; message: string | string[]; statusCode: number},
//       )
//     }
//   }
