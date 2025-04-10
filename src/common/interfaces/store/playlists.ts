import { Playlist } from '../playlists';

export interface UserPlaylistsStore {
  userPlaylists: {
    playlists: Playlist[];
    total: number;
    offset: number | null;
    setPlaylistsData: (data: {
      playlists: Playlist[];
      total: number;
      offset: number | null;
    }) => void;
  };
}
