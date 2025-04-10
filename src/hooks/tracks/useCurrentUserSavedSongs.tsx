import { useEffect } from 'react';
import { useGetCurrentUserTracks } from '@services/tracks';
import { useTableInfiniteScroll } from '@hooks/common';
import { useStore } from '@store/index';

export const useCurrentUserSavedSongs = () => {
  const tracks = useStore((state) => state.savedTracks.tracks);
  const total = useStore((state) => state.savedTracks.total);
  const offset = useStore((state) => state.savedTracks.offset);
  const setTracksData = useStore((state) => state.savedTracks.setTracksData);
  const { data, refetch, isFetching, isFetchedAfterMount } = useGetCurrentUserTracks(offset);
  const { gridApiRef } = useTableInfiniteScroll({
    isLoading: isFetching,
    onNextPage: () => {
      const latestOffset = useStore.getState().savedTracks.offset;

      if (latestOffset) {
        refetch();
      }
    },
  });

  useEffect(() => {
    if (data && isFetchedAfterMount) {
      setTracksData({
        tracks: [...tracks, ...(data?.items || [])],
        total: data?.total || 0,
        offset: data?.next ? (offset as number) + 50 : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetchedAfterMount]);

  return {
    gridApiRef,
    tracks,
    total,
    isFetching,
  };
};
