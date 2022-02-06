// import {AnyAction} from 'redux'
// import {
//   GET_ARTISTS,
//   SEARCH_ARTISTS,
//   CLEAR_ARTISTS,
//   SET_ARTIST,
//   GET_ALBUMS,
//   SEARCH_ALBUMS,
//   CLEAR_ALBUMS,
//   SET_ALBUM,
// } from '../../actions/types'
// import {DiscogAlbumModel, DiscogArtistModel} from '../../models/discogModel'

// const initialState: {
//   artists: {
//     search?: DiscogArtistModel[]
//     searching: boolean
//     loading: boolean
//     selected?: DiscogArtistModel
//     locked: boolean
//   }
//   albums: {
//     search?: DiscogAlbumModel[]
//     searching: boolean
//     loading: boolean
//     selected?: DiscogAlbumModel
//     locked: boolean
//   }
//   canSubmit: boolean
// } = {
//   artists: {
//     search: [],
//     searching: false,
//     loading: false,
//     selected: {} as DiscogArtistModel,
//     locked: false,
//   },
//   albums: {
//     search: [],
//     searching: false,
//     loading: false,
//     selected: {} as DiscogAlbumModel,
//     locked: false,
//   },
//   canSubmit: false,
// }

// export default function discogsReducer(
//   state = initialState,
//   action: AnyAction,
// ): any {
//   const {type, payload} = action

//   switch (type) {
//     case GET_ARTISTS: {
//       return {
//         ...state,
//         artists: {
//           search: payload,
//           loading: false,
//           searching: true,
//           selected: undefined,
//         },
//       }
//     }
//     case SET_ARTIST: {
//       return {...state, artists: {selected: payload, locked: true}}
//     }
//     case SEARCH_ARTISTS: {
//       return {...state, artists: {loading: true}}
//     }
//     case CLEAR_ARTISTS: {
//       return {
//         ...state,
//         canSubmit: false,
//         artists: initialState.artists,
//         albums: initialState.albums,
//       }
//     }

//     case GET_ALBUMS: {
//       return {
//         ...state,
//         loading: false,
//         albums: {
//           search: payload,
//           loading: false,
//           searching: true,
//           selected: undefined,
//         },
//       }
//     }
//     case SET_ALBUM: {
//       return {
//         ...state,
//         canSubmit: true,
//         albums: {selected: payload, locked: true},
//       }
//     }
//     case CLEAR_ALBUMS: {
//       return {...state, canSubmit: false, albums: initialState.albums}
//     }
//     case SEARCH_ALBUMS: {
//       return {...state, albums: {loading: true}}
//     }
//     default:
//       return state
//   }
// }
