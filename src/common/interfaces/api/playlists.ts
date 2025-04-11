import { ResponseBase } from './base';
import { Playlist } from '../playlists';
import { PlaylistTrack } from '../tracks';

export interface PlaylistsResponse extends ResponseBase {
  items: Playlist[];
}

export type PlaylistResponse = Playlist;

export type PlaylistsTracksResponse = {
  items: PlaylistTrack[];
  total?: number;
  next?: string | null;
};


export type PlaylistSavedResponse = boolean[];
