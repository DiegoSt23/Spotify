import { StateCreator } from 'zustand';
import { QueueStore } from '@common/interfaces';

export const queueSlice: StateCreator<QueueStore> = (set) => ({
  isQueueDrawerOpen: false,
  toggleQueueDrawer: (val) => set({ isQueueDrawerOpen: val }),
});
