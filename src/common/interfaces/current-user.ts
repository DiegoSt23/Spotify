export interface CurrentUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
};

export interface CurrentUserStore {
  currentUser: CurrentUser | null;
  setCurrentUser: (currentUser: CurrentUser | null) => void;
}
