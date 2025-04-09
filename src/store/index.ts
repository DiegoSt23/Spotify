import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  NavigationStore,
  QueueStore,
  FollowedArtistsStore,
  SavedTracksStore,
} from '@common/interfaces';
import {
  navigationSlice,
  queueSlice,
  savedTracksSlice,
  followedArtistSlice,
} from './slices';

interface Store
  extends NavigationStore,
    QueueStore,
    FollowedArtistsStore,
    SavedTracksStore {}

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...navigationSlice(...args),
    ...queueSlice(...args),
    ...followedArtistSlice(...args),
    ...savedTracksSlice(...args),
  }))
);
