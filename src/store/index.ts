import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  CurrentUserStore,
  NavigationStore,
  QueueStore,
  FollowedArtistsStore,
  SavedTracksStore,
  SavedAlbumsStore,
  UserPlaylistsStore,
} from '@common/interfaces';
import {
  currentUserSlice,
  navigationSlice,
  queueSlice,
  savedTracksSlice,
  followedArtistSlice,
  savedAlbumsSlice,
  userPlaylistsSlice,
} from './slices';

interface Store
  extends CurrentUserStore,
    NavigationStore,
    QueueStore,
    FollowedArtistsStore,
    SavedTracksStore,
    SavedAlbumsStore,
    UserPlaylistsStore {}

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...currentUserSlice(...args),
    ...navigationSlice(...args),
    ...queueSlice(...args),
    ...followedArtistSlice(...args),
    ...savedTracksSlice(...args),
    ...savedAlbumsSlice(...args),
    ...userPlaylistsSlice(...args),
  }))
);
