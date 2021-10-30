import React from 'react';
import { useAppSelector } from '../../hooks';
import { AlertModel } from '../../models/alertModel';
import AlertItem from './AlertItem';

export const Alert: React.FC = () => {
  const alerts = useAppSelector((state) => state.root.alertReducer);

  return (
    <>
      {alerts &&
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert: AlertModel) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
    </>
  );
};
export default Alert;
