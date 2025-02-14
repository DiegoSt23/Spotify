import { ResponseBase } from './base';
import { Show } from '../shows';

export interface ShowsResponse extends ResponseBase {
  items: Show[];
}
