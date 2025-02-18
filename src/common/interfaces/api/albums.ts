import { ResponseBase } from './base';
import { Album, AlbumExtended } from '../albums';

export interface AlbumsResponse extends ResponseBase {
  items: Album[];
}

export interface CurrentUserSavedAlbumsResponse extends ResponseBase {
  items: {
    added_at: string;
    album: Album;
  }[];
}

export type AlbumResponse = AlbumExtended;

export type AlbumSavedResponse = boolean[];

export interface PartialAlbumsResponse {
  albums: {
    items: Album[];
  } & ResponseBase;
  singles: {
    items: Album[];
  } & ResponseBase;
  compilations: {
    items: Album[];
  } & ResponseBase;
  appearsOn: {
    items: Album[];
  } & ResponseBase; 
}
