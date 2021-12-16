import {VinyleResponse} from './albumModel'

export interface RemoveAlbumFromLibraryModel {
  type: 'trade' | 'delete'
  albumId: VinyleResponse['_id']
  albumTitle: VinyleResponse['albumTitle']
}
