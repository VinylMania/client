import {Dispatch} from 'redux'
import {v4 as uuidv4} from 'uuid'
import {AlertModel} from '../models/alertModel'

import * as Types from './types'

export const setAlert =
  (alert: AlertModel) =>
  (dispatch: Dispatch): void => {
    const {msg, alertType} = alert
    const id = uuidv4()

    dispatch({type: Types.SET_ALERT, payload: {msg, alertType, id}})
  }

export const removeAlert =
  (id: string) =>
  (dispatch: Dispatch): void => {
    dispatch({type: Types.REMOVE_ALERT, payload: id})
  }

export const removeAllAlerts =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({type: Types.REMOVE_ALERTS})
  }

export default setAlert
