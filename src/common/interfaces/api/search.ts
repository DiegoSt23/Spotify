import { AlbumsResponse } from './albums';
import { TracksResponse } from './tracks';
import { ArtistsResponse } from './artists';
import { PlaylistsResponse } from './playlists';
import { EpisodesResponse } from './episodes';
import { ShowsResponse } from './shows';

export interface SearchResponse {
  albums: AlbumsResponse;
  artists: ArtistsResponse;
  playlists: PlaylistsResponse;
  tracks: TracksResponse;
  episodes: EpisodesResponse;
  shows: ShowsResponse;
}
