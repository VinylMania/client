import axios from 'axios';
import { setAlert } from './alert';

export const getLibrary =
  (userInfo: any) =>
  (dispatch: any): void => {
    // const body = JSON.stringify({ user: userInfo });
    const privateToken = localStorage.token ? localStorage.token : '';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': privateToken,
      },
    };
    axios
      .get('http://localhost:5000/api/library/me', config)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((err) => {
        const { errors } = err.response?.data;

        if (errors) {
          errors.forEach((error: any) => {
            dispatch(setAlert({ msg: error.msg, alertType: 'danger' }));
          });
        }
      });
  };

export const updateLibrary =
  (query: any) =>
  (dispatch: any): void => {
    const { artistId, albumId } = query;

    const body = JSON.stringify({ artistId, albumId });

    const privateToken = localStorage.token ? localStorage.token : '';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': privateToken,
      },
    };

    axios
      .post('http://localhost:5000/api/library', body, config)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        const { errors } = err.response?.data;

        if (errors) {
          errors.forEach((error: any) => {
            dispatch(setAlert({ msg: error.msg, alertType: 'danger' }));
          });
        }
      });
  };
