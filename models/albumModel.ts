import {UserModel} from './userModel'

/* eslint-disable camelcase */
export interface AlbumModelDto {
  artistTitle: string
  albumTitle: string
  year: string
  artistId: string
  albumId: string
  albumCoverUrl: string
  artistCoverUrl: string
}

export interface VinyleResponse {
  user: string
  _id?: string
  artistTitle: string
  albumTitle: string
  year: string
  artistId: string
  albumId: string
  albumCoverUrl: string
  artistCoverUrl: string
}
