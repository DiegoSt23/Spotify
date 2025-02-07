import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  AuthStore,
  CurrentUserStore,
  NavigationStore,
} from '@common/interfaces';
import { authSlice } from './auth';
import { currentUserSlice } from './currentUser';
import { navigationSlice } from './navigation';

interface Store extends AuthStore, CurrentUserStore, NavigationStore {};

export const useStore = create<Store>()(devtools((...args) => ({
  ...navigationSlice(...args),
  ...authSlice(...args),
  ...currentUserSlice(...args),
})));
