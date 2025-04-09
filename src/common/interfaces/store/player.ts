export interface QueueStore {
  queue: {
    isQueueDrawerOpen: boolean;
    toggleQueueDrawer: (val: boolean) => void;
  };
}
