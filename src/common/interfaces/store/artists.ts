import { ArtistExtended } from '../artists';

export interface ArtistsStore {
  artists: ArtistExtended[];
  after?: string;
  total: number;
  setArtistsData: (data: { artists: ArtistExtended[]; total: number }) => void;
  setAfter: (data: string) => void;
}
