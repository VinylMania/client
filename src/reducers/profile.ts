import { AnyAction } from 'redux';
import { GET_PROFILE, EMPTY_PROFILE } from '../actions/types';

export default function profileReducer(state = [], action: AnyAction): any {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE: {
      return { ...state, loading: false, user: payload };
    }
    case EMPTY_PROFILE: {
      return { ...state, loading: true, user: null };
    }
    default:
      return state;
  }
}
