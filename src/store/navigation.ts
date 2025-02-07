import { StateCreator } from 'zustand';
import { NavigationStore } from '@common/interfaces';

export const navigationSlice: StateCreator<NavigationStore> = (set) => ({
  isSideNavBarOpen: false,
  toggleSideNavBar: (val) => set({ isSideNavBarOpen: val }),
});
