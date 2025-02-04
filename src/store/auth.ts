import { StateCreator } from 'zustand';
import { AuthStore } from '@common/interfaces';

export const authSlice: StateCreator<AuthStore> = (set) => ({
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  setTokens: (newTokens) => set({ tokens: newTokens }),
});
