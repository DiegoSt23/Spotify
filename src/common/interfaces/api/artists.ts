import { ResponseBase } from './base';
import { ArtistExtended } from '../artists';

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
