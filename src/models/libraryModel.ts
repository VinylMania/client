import {AlbumModel} from './albumModel'
import {UserModel} from './userModel'

export interface LibraryModel {
  _id: string
  user: UserModel
  visibility: boolean
  albums: AlbumModel[]
}

export interface RemoveAlbumFromLibraryModel {
  type: 'trade' | 'delete'
  albumId: AlbumModel['_id']
  albumTitle: AlbumModel['album_title']
}
