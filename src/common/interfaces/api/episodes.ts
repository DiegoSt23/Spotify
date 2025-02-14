import { ResponseBase } from './base';
import { Episode } from '../episodes';

export interface EpisodesResponse extends ResponseBase {
  items: Episode[];
}
