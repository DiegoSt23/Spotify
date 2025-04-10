import { StateCreator } from 'zustand';
import { FollowedArtistsStore } from '@common/interfaces';

export const followedArtistSlice: StateCreator<FollowedArtistsStore> = (set) => ({
  followedArtists: {
    artists: [],
    total: 0,
    after: '',
    setArtistsData: (payload) =>
      set((state) => ({
        followedArtists: {
          ...state.followedArtists,
          artists: payload.artists,
          total: payload.total,
          after: payload.after,
        },
      })),
  },
});
