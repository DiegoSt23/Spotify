import { Tokens } from '../auth';

export interface AuthStore {
  tokens: Tokens;
  setTokens: (newTokens: Tokens) => void;
}
