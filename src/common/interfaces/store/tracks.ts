import { UserTrack } from '../tracks';

export interface TracksStore {
  savedTracks: UserTrack[];
  totalSavedTracks: number;
  savedTracksOffset: number | null;
  setSavedTracks: (data: {
    savedTracks: UserTrack[];
    totalSavedTracks: number;
  }) => void;
  setSavedTracksOffset: (data: number | null) => void;
}
