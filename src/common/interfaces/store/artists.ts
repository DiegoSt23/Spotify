import { ArtistExtended } from '../artists';

export interface FollowedArtistsStore {
  followedArtists: {
    artists: ArtistExtended[];
    total: number;
    after?: string;
    setArtists: (data: { artists: ArtistExtended[]; total: number }) => void;
    setAfter: (data: string) => void;
  }
}
