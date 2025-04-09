import { Tokens } from '../auth';

export interface AuthStore {
  session: {
    tokens: Tokens;
    setTokens: (newTokens: Tokens) => void;
  }
}
