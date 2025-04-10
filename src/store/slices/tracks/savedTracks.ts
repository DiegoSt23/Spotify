import { StateCreator } from 'zustand';
import { SavedTracksStore } from '@common/interfaces';

export const savedTracksSlice: StateCreator<SavedTracksStore> = (set) => ({
  savedTracks: {
    tracks: [],
    total: 0,
    offset: 0,
    setTracksData: (payload) =>
      set((state) => ({
        savedTracks: {
          ...state.savedTracks,
          tracks: payload.tracks,
          total: payload.total,
          offset: payload.offset,
        },
      })),
  },
});
