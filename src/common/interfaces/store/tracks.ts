import { UserTrack } from '../tracks';

export interface SavedTracksStore {
  savedTracks: {
    tracks: UserTrack[];
    total: number;
    offset: number | null;
    setTracksData: (data: {
      tracks: UserTrack[];
      total: number;
      offset: number | null;
    }) => void;
  };
}
