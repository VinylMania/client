import {combineReducers} from 'redux'
import alertReducer from './alert'
import authReducer from './auth'
import profileReducer from './profile'
import libraryReducer from './library'
import discogsReducer from './discogs'

export default combineReducers({
  alertReducer,
  authReducer,
  libraryReducer,
  profileReducer,
  discogsReducer,
})
