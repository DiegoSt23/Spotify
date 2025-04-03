import { Image } from '../images';
import { UserBase } from './user-base';

export interface User extends UserBase {
  followers: {
    href: string | null;
    total: number;
  };
  images: Image[];
}
