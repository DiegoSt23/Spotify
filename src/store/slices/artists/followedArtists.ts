import { StateCreator } from 'zustand';
import { FollowedArtistsStore } from '@common/interfaces';

export const followedArtistSlice: StateCreator<FollowedArtistsStore> = (
  set
) => ({
  followedArtists: {
    artists: [],
    total: 0,
    after: '',
    setAfter: (value) =>
      set((state) => ({
        followedArtists: {
          ...state.followedArtists,
          after: value,
        },
      })),
    setArtists: (data) =>
      set((state) => ({
        followedArtists: {
          ...state.followedArtists,
          artists: data.artists,
          total: data.total,
        },
      })),
  },
});
