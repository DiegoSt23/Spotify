import { UserTrack } from '../tracks';

export interface SavedTracksStore {
  savedTracks: {
    tracks: UserTrack[];
    total: number;
    offset: number | null;
    setTracks: (data: { tracks: UserTrack[]; total: number }) => void;
    setOffset: (data: number | null) => void;
  };
}
