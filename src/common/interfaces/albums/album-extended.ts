import { Album } from './album';
import { AlbumTrack } from '../tracks';

export interface AlbumExtended extends Album {
  copyrights: {
    text: string;
    type: string;
  }[];
  label: string;
  popularity: number;
  tracks: {
    items: AlbumTrack[];
  };
}
