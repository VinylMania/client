import React from 'react'
import {useEffect} from 'react'
import {AlertModel} from '../../models/alertModel'
import AlertItem from './AlertItem'

export const AlertWrapper: React.FC<{alerts: AlertModel[]}> = ({alerts}) => {
  const [uniqueAlerts, setUniqueAlerts] = React.useState<AlertModel[]>([])

  useEffect(() => {
    setUniqueAlerts(
      alerts.filter((value, index) => {
        return alerts.indexOf(value) == index
      }),
    )
  }, [alerts])

  const removeAlert = (msg: AlertModel['msg']): void => {
    setUniqueAlerts(uniqueAlerts.filter(alert => alert.msg !== msg))
  }
  return (
    <>
      {uniqueAlerts &&
        uniqueAlerts.length > 0 &&
        uniqueAlerts.map(alert => (
          <AlertItem remove={removeAlert} key={Math.random()} alert={alert} />
        ))}
    </>
  )
}
export default AlertWrapper
