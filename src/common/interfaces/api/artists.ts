import { ResponseBase } from './base';
import { ArtistExtended, ArtistBio } from '../artists';
import { Track } from '../tracks';

export interface ArtistsResponse extends ResponseBase {
  items: ArtistExtended[];
}

export interface CurrentUserFollowedArtistsResponse {
  artists: {
    href: string;
    limit: number;
    next: string;
    cursors: {
      after: string;
      before: string;
    };
    total: number;
    items: ArtistExtended[];
  };
}

export type ArtistResponse = ArtistExtended;

export type ArtistBioResponse = ArtistBio;

export type ArtistTopTracksResponse = {
  tracks: Track[];
};

export type ArtistFollowedResponse = boolean[];
