import { AlbumModel } from './albumModel';
import { UserModel } from './userModel';

export interface LibraryModel {
  _id: string;
  user?: UserModel;
  visibility: boolean;
  albums: AlbumModel[];
}
