import { CurrentUser } from '../users';

export interface CurrentUserStore {
  currentUser: CurrentUser | null;
  setCurrentUser: (currentUser: CurrentUser | null) => void;
}
