import { ArtistExtended } from '../artists';

export interface FollowedArtistsStore {
  followedArtists: {
    artists: ArtistExtended[];
    total: number;
    after: string | null;
    setArtists: (data: { artists: ArtistExtended[]; total: number }) => void;
    setAfter: (data: string | null) => void;
  }
}
