import { StateCreator } from 'zustand';
import { QueueStore } from '@common/interfaces';

export const queueSlice: StateCreator<QueueStore> = (set) => ({
  queue: {
    isQueueDrawerOpen: false,
    toggleQueueDrawer: (val) =>
      set((state) => ({ queue: { ...state.queue, isQueueDrawerOpen: val } })),
  },
});
