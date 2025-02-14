import { Image } from '../images';
import { ArtistBase } from './artist-base';

export interface ArtistExtended extends Partial<ArtistBase> {
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  images: Image[];
  popularity: number;
}
