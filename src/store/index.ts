import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  NavigationStore,
  QueueStore,
  FollowedArtistsStore,
  SavedTracksStore,
  SavedAlbumsStore
} from '@common/interfaces';
import {
  navigationSlice,
  queueSlice,
  savedTracksSlice,
  followedArtistSlice,
  savedAlbumsSlice,
} from './slices';

interface Store
  extends NavigationStore,
    QueueStore,
    FollowedArtistsStore,
    SavedTracksStore,
    SavedAlbumsStore {}

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...navigationSlice(...args),
    ...queueSlice(...args),
    ...followedArtistSlice(...args),
    ...savedTracksSlice(...args),
    ...savedAlbumsSlice(...args),
  }))
);
