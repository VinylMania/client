import React from 'react'
import {useAppSelector, useAppDispatch} from '../../hooks'
import {AlertModel} from '../../models/alertModel'
import AlertItem from './AlertItem'
import setAlert from '../../actions/alert'

export const Alert: React.FC = () => {
  const alerts = useAppSelector(state => state.root.alertReducer)

  return (
    <>
      {alerts &&
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert: AlertModel) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
    </>
  )
}
export default Alert
