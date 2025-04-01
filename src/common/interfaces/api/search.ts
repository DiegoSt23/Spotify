import { AlbumsResponse } from './albums';
import { TracksResponse } from './tracks';
import { ArtistsResponse } from './artists';
import { PlaylistsResponse } from './playlists';

export interface SearchResponse {
  albums: AlbumsResponse;
  artists: ArtistsResponse;
  playlists: PlaylistsResponse;
  tracks: TracksResponse;
}
