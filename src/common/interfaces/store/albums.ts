import { Album } from '../albums';

export interface SavedAlbumsStore {
  savedAlbums: {
    albums: Album[];
    total: number;
    offset: number | null;
    setAlbumsData: (data: {
      albums: Album[];
      total: number;
      offset: number | null;
    }) => void;
  };
}
