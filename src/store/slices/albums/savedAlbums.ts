import { StateCreator } from 'zustand';
import { SavedAlbumsStore } from '@common/interfaces';

export const savedAlbumsSlice: StateCreator<SavedAlbumsStore> = (set) => ({
  savedAlbums: {
    albums: [],
    total: 0,
    offset: 0,
    setAlbumsData: (payload) =>
      set((state) => ({
        savedAlbums: {
          ...state.savedAlbums,
          albums: payload.albums,
          total: payload.total,
          offset: payload.offset,
        },
      })),
  },
});
