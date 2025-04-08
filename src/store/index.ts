import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  AuthStore,
  CurrentUserStore,
  NavigationStore,
  QueueStore,
  ArtistsStore,
} from '@common/interfaces';
import { authSlice } from './auth';
import { currentUserSlice } from './currentUser';
import { navigationSlice } from './navigation';
import { queueSlice } from './queue';
import { artistSlice } from './artists';

interface Store
  extends AuthStore,
    CurrentUserStore,
    NavigationStore,
    QueueStore,
    ArtistsStore {};

export const useStore = create<Store>()(
  devtools((...args) => ({
    ...navigationSlice(...args),
    ...authSlice(...args),
    ...currentUserSlice(...args),
    ...queueSlice(...args),
    ...artistSlice(...args)
  }))
);
