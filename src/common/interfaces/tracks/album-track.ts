import { Track } from './track';

export type AlbumTrack = Omit<
  Track,
  'album' | 'external_ids' | 'is_playable' | 'popularity'
>;
