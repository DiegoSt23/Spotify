import { StateCreator } from 'zustand';
import { NavigationStore } from '@common/interfaces';

export const navigationSlice: StateCreator<NavigationStore> = (set) => ({
  navigation: {
    isSideNavBarOpen: false,
    toggleSideNavBar: (val) =>
      set((state) => ({
        navigation: { ...state.navigation, isSideNavBarOpen: val },
      })),
  },
});
