export interface NavigationStore {
  navigation: {
    isSideNavBarOpen: boolean;
    toggleSideNavBar: (val: boolean) => void;
  }
}
