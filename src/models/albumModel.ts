/* eslint-disable camelcase */
export interface AlbumModel {
  artist_title: string;
  album_title: string;
  albumId: string;
  album_cover_url: string;
  artistId: string;
  artist_cover_url: string;
  release_date: string;
  trade: boolean;
  date_created?: string;
  date_updated?: string;
  _id?: string;
}
