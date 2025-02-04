import { StateCreator } from 'zustand';
import { CurrentUserStore } from '@common/interfaces';

export const currentUserSlice: StateCreator<CurrentUserStore> = (set) => ({
  currentUser: null,
  setCurrentUser: (newuser) => set({ currentUser: newuser }),
});
