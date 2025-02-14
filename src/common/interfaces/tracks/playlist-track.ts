import { UserTrack } from './user-track';

export interface PlaylistTrack extends UserTrack {
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string | null;
  video_thumbnail: {
    url: string | null;
  };
}