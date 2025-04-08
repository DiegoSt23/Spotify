import { StateCreator } from 'zustand';
import { ArtistsStore } from '@common/interfaces';

export const artistSlice: StateCreator<ArtistsStore> = (set) => ({
  artists: [],
  total: 0,
  setAfter: (value) => set({ after: value }),
  setArtistsData: (data) =>
    set({
      artists: data.artists,
      total: data.total,
    }),
});
