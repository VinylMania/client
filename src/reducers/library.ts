import {AnyAction} from 'redux'
import {
  GET_LIBRARIES,
  GET_LIBRARY_BY_USER_ID,
  EMPTY_LIBRARY,
  EMPTY_LIBRARIES,
} from '../actions/types'

export default function libraryReducer(state = [], action: AnyAction): any {
  const {type, payload} = action
  switch (type) {
    case GET_LIBRARY_BY_USER_ID: {
      return {...state, loadingLib: false, library: payload.albums}
    }
    case GET_LIBRARIES: {
      return {...state, loadingLibs: false, libraries: payload}
    }
    case EMPTY_LIBRARY: {
      return {...state, loadingLib: true, library: null}
    }
    case EMPTY_LIBRARIES: {
      return {...state, loadingLibs: true, libraries: null}
    }
    default:
      return state
  }
}
