import { Playlist } from './playlist';
import { PlaylistTrack } from '../tracks';

export interface PlaylistExtended extends Omit<Playlist, 'tracks'> {
  tracks: {
    items: PlaylistTrack[];
    total: number;
  };
}
