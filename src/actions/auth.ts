import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REMOVE_ALERTS,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT,
} from './types';
import { LoginModel, RegisterModel, UserModel } from '../models/userModel';
import setAlert from './alert';
import { ErrorModel } from '../models/errorModel';

// Load User
export const loadUser = () => async (dispatch: any) => {
  const privateToken = localStorage.token ? localStorage.token : '';

  if (privateToken.trim().length > 0) {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/auth`, {
        headers: {
          'x-auth-token': privateToken,
        },
      })
      .then((response: AxiosResponse<UserModel>) => {
        dispatch({ type: USER_LOADED, payload: response.data });
      })
      .catch((err: AxiosError<ErrorModel>) => {
        if (err.response?.data) {
          const { errors } = err.response?.data;
          if (errors) {
            errors.forEach((error) => {
              dispatch(setAlert({ msg: error.msg, alertType: 'warning' }));
              dispatch({ type: AUTH_ERROR });
            });
          }
        } else {
          dispatch(
            setAlert({
              msg: 'Un erreur avec le serveur est survenue.',
              alertType: 'warning',
            }),
          );
        }
      });
  }
};

// Login User
export const login = (data: LoginModel) => async (dispatch: any) => {
  dispatch({ type: REMOVE_ALERTS });
  const { email, password } = data;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  axios
    .post(`${process.env.REACT_APP_BACKEND_URI}/api/auth`, body, config)
    .then((response) => {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch(loadUser());
    })
    .catch((err: AxiosError<ErrorModel>) => {
      if (err.response?.data) {
        const { errors } = err.response?.data;

        if (errors) {
          errors.forEach((error) => {
            dispatch(setAlert({ msg: error.msg, alertType: 'warning' }));
          });
        }

        dispatch({ type: LOGIN_FAIL });
      } else {
        dispatch(
          setAlert({
            msg: 'Un erreur avec le serveur est survenue.',
            alertType: 'warning',
          }),
        );
      }
    });
};

// Register User
export const register = (data: RegisterModel) => async (dispatch: any) => {
  const { username, email, password } = data;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, email, password });

  axios
    .post(`${process.env.REACT_APP_BACKEND_URI}/api/users`, body, config)
    .then((response: AxiosResponse<string>) => {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      dispatch(loadUser());
    })
    .catch((err: AxiosError<ErrorModel>) => {
      if (err.response?.data) {
        const { errors } = err.response.data;

        if (errors) {
          errors.forEach((error) =>
            dispatch(setAlert({ alertType: 'warning', msg: error.msg })),
          );
        }
        dispatch({ type: REGISTER_FAIL });
      } else {
        dispatch(
          setAlert({
            msg: 'Un erreur avec le serveur est survenue.',
            alertType: 'warning',
          }),
        );
      }
    });
};

// Logout / Clear profile
export const logout = () => (dispatch: any) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export default login;
