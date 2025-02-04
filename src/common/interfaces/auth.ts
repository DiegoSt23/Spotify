export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthStore {
  tokens: Tokens;
  setTokens: (newTokens: Tokens) => void;
}

