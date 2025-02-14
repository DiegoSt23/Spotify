import { ResponseBase } from './base';
import { Track, UserTrack } from '../tracks';

export interface TracksResponse extends ResponseBase {
  items: Track[];
}

export interface UserTracksResponse extends ResponseBase {
  items: UserTrack[];
}
