import axios from 'axios';
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
import { LoginModel, RegisterModel } from '../models/userModel';
import setAlert from './alert';
// import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch: any) => {
  const privateToken = localStorage.token ? localStorage.token : '';

  try {
    const res = await axios.get('http://localhost:5000/api/auth', {
      headers: {
        'x-auth-token': privateToken,
      },
    });

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err: any) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error: any) =>
        dispatch(setAlert({ msg: error.msg, alertType: 'danger' })),
      );
    }
    dispatch({ type: AUTH_ERROR });
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

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth',
      body,
      config,
    );
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err: any) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error: any) =>
        dispatch(setAlert({ msg: error.msg, alertType: 'danger' })),
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

// Register User
export const register = (data: RegisterModel) => async (dispatch: any) => {
  const { username, email, password } = data;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name: username, email, password });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/users',
      body,
      config,
    );

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err: any) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error: any) =>
        dispatch(setAlert({ alertType: 'danger', msg: error.msg })),
      );
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// Logout / Clear profile
export const logout = () => (dispatch: any) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

export default login;
