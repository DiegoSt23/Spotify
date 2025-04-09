import { StateCreator } from 'zustand';
import { SavedTracksStore } from '@common/interfaces';

export const savedTracksSlice: StateCreator<SavedTracksStore> = (set) => ({
  savedTracks: {
    tracks: [],
    total: 0,
    offset: 0,
    setOffset: (value) =>
      set((state) => ({
        savedTracks: {
          ...state.savedTracks,
          offset: value,
        },
      })),
    setTracks: (data) =>
      set((state) => ({
        savedTracks: {
          ...state.savedTracks,
          tracks: data.tracks,
          total: data.total,
        },
      })),
  },
});
