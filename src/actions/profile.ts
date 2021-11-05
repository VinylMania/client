import axios, { AxiosResponse } from 'axios';
import { ErrorModel } from '../models/errorModel';
import { UserProfileModel } from '../models/userModel';
import { setAlert } from './alert';

export const getUserProfileById =
  (userId: string, callback: any) =>
  (dispatch: any): void => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .get(`http://localhost:5000/api/users/${userId}`, config)
      .then((response: AxiosResponse<UserProfileModel>) => {
        callback(response.data);
      })
      .catch((err: { response: { data: ErrorModel } }) => {
        const { errors } = err.response?.data;

        if (errors) {
          errors.forEach((error) => {
            dispatch(setAlert({ msg: error.msg, alertType: 'danger' }));
          });
        }
      });
  };

export default getUserProfileById;
