import { StateCreator } from 'zustand';
import { TracksStore } from '@common/interfaces';

export const tracksSlice: StateCreator<TracksStore> = (set) => ({
  savedTracks: [],
  totalSavedTracks: 0,
  savedTracksOffset: 0,
  setSavedTracksOffset: (value) =>
    set({
      savedTracksOffset: value,
    }),
  setSavedTracks: (data) =>
    set({
      savedTracks: data.savedTracks,
      totalSavedTracks: data.totalSavedTracks,
    }),
});
