import { AnyAction } from 'redux';
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALERTS } from '../actions/types';
import { AlertModel } from '../models/alertModel';

export default function alertReducer(state = [], action: AnyAction): any {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      if (state.find((alert: AlertModel) => alert.msg === payload.msg)) {
        return state;
      }
      return [...state, payload];
    case REMOVE_ALERT:
      if (state.length === 0) {
        return state;
      }
      return state.filter((alert: AlertModel) => alert.id !== payload);
    case REMOVE_ALERTS:
      return [];

    default:
      return state;
  }
}
