import { ArtistExtended } from '../artists';

export interface FollowedArtistsStore {
  followedArtists: {
    artists: ArtistExtended[];
    total: number;
    after: string | null;
    setArtistsData: (data: {
      artists: ArtistExtended[];
      total: number;
      after: string | null;
    }) => void;
  };
}
