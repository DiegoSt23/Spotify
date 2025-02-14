import { Image } from '../images';
import { UserBase } from './user-base';

export interface CurrentUser extends UserBase {
  country: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };

  followers: {
    href: string | null;
    total: number;
  };
  images: Image[];
  product: string;
}
