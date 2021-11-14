import { AlbumModel } from './albumModel';

/* eslint-disable camelcase */
export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel extends LoginModel {
  password2: string;
  username: string;
}

export interface UserModel {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  date_created: string;
  date_updated: string;
}

export interface UserProfileModel {
  _id: string;
  user: UserModel;
  visibility: boolean;
  albums: AlbumModel[];
}
