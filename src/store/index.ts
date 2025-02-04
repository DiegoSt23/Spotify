import { create } from 'zustand';
import { AuthStore, CurrentUserStore } from '@common/interfaces';
import { authSlice } from './auth';
import { currentUserSlice } from './currentUser';

type Store = AuthStore & CurrentUserStore;

export const useStore = create<Store>((...args) => ({
  ...authSlice(...args),
  ...currentUserSlice(...args),
}));
