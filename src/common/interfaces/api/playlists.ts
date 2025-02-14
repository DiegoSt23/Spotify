import { ResponseBase } from './base';
import { Playlist, PlaylistExtended } from '../playlists';

export interface PlaylistsResponse extends ResponseBase {
  items: Playlist[];
}

export type PlaylistResponse = PlaylistExtended;
