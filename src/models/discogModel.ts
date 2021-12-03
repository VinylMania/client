/* eslint-disable camelcase */
export interface DiscogArtistModel {
  id: number;
  title: string;
  cover_image: string;
}

export interface DiscogAlbumModel {
  year: string;
  id: number;
  title: string;
  cover_image: string;
}

export interface DiscogAlbumResponseModel {
  data: {
    results: DiscogAlbumModel[];
  };
}
export interface DiscogArtistResponseModel {
  data: {
    results: DiscogArtistModel[];
  };
}
