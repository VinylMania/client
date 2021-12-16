import setAlert from '../actions/alert'
import {store} from '../store'

// Load User
export const handleErrors = (err: {
  error: string
  message: string | string[]
  statusCode: number
}): void => {
  const {message} = err
  if (typeof message === 'string') {
    store.dispatch(
      setAlert({
        msg: message,
        alertType: 'warning',
      }),
    )
  } else if (typeof message === 'object') {
    message.forEach((msg: string) => {
      store.dispatch(
        setAlert({
          msg,
          alertType: 'warning',
        }),
      )
    })
  } else {
    store.dispatch(
      setAlert({
        msg: 'Une erreur inconnue est survenue.',
        alertType: 'warning',
      }),
    )
  }
}

export default handleErrors
