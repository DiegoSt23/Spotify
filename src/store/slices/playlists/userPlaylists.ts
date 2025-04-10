import { StateCreator } from 'zustand';
import { UserPlaylistsStore } from '@common/interfaces';

export const userPlaylistsSlice: StateCreator<UserPlaylistsStore> = (set) => ({
  userPlaylists: {
    playlists: [],
    total: 0,
    offset: 0,
    setPlaylistsData: (payload) =>
      set((state) => ({
        userPlaylists: {
          ...state.userPlaylists,
          playlists: payload.playlists,
          total: payload.total,
          offset: payload.offset,
        },
      })),
  },
});
