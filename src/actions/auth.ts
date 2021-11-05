import axios, { AxiosResponse } from 'axios';
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
      .get('http://localhost:5000/api/auth', {
        headers: {
          'x-auth-token': privateToken,
        },
      })
      .then((response: AxiosResponse<UserModel>) => {
        dispatch({ type: USER_LOADED, payload: response.data });
      })
      .catch((err: { response: { data: ErrorModel } }) => {
        const { errors } = err.response?.data;
        if (axios.isAxiosError(err)) {
          dispatch(setAlert({ msg: err.message, alertType: 'danger' }));
          dispatch({ type: AUTH_ERROR });
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

  // try {
  const res = await axios
    .post('http://localhost:5000/api/auth', body, config)
    .then((response) => {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch(loadUser());
    })
    .catch((err) => {
      const { errors } = err.response?.data;

      if (errors) {
        errors.forEach((error: any) => {
          dispatch(setAlert({ msg: error.msg, alertType: 'danger' }));
        });
      }

      dispatch({ type: LOGIN_FAIL });
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
    .post('http://localhost:5000/api/users', body, config)
    .then((response: AxiosResponse<string>) => {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      dispatch(loadUser());
    })
    .catch((err: { response: { data: ErrorModel } }) => {
      const { errors } = err.response.data;

      if (errors) {
        errors.forEach((error: any) =>
          dispatch(setAlert({ alertType: 'danger', msg: error.msg })),
        );
      }
      dispatch({ type: REGISTER_FAIL });
    });
  // .then((response: AxiosResponse<{ token: string }>) => {

  // })
  // .catch((err: AxiosError<ErrorModel>) => {
  //   const { errors } = err.response.data;
  // });
};

// Logout / Clear profile
export const logout = () => (dispatch: any) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export default login;
