import { useEffect } from 'react';
import { useGetCurrentUserTracks } from '@services/tracks';
import { useTableInfiniteScroll } from '@hooks/common';
import { useStore } from '@store/index';

export const useSavedSongs = () => {
  const savedTracks = useStore((state) => state.savedTracks);
  const totalSavedTracks = useStore((state) => state.totalSavedTracks);
  const savedTracksOffset = useStore((state) => state.savedTracksOffset);
  const setSavedTracks = useStore((state) => state.setSavedTracks);
  const setOffset = useStore((state) => state.setSavedTracksOffset);
  const { data, isFetching } = useGetCurrentUserTracks(savedTracksOffset);
  const { gridApiRef } = useTableInfiniteScroll({
    isLoading: isFetching,
    onNextPage: () => {
      setOffset(data?.next ? (savedTracksOffset as number) + 50 : null);
    },
  });

  useEffect(() => {
    setSavedTracks({
      savedTracks: [ ...savedTracks, ...data?.items || []],
      totalSavedTracks: data?.total || 0,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.items]);

  return {
    gridApiRef,
    savedTracks,
    totalSavedTracks,
    isFetching,
  };
};
