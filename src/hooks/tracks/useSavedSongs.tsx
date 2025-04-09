import { useEffect } from 'react';
import { useGetCurrentUserTracks } from '@services/tracks';
import { useTableInfiniteScroll } from '@hooks/common';
import { useStore } from '@store/index';

export const useSavedSongs = () => {
  const savedTracks = useStore((state) => state.savedTracks.tracks);
  const totalSavedTracks = useStore((state) => state.savedTracks.total);
  const savedTracksOffset = useStore((state) => state.savedTracks.offset);
  const setOffset = useStore((state) => state.savedTracks.setOffset);
  const setSavedTracks = useStore((state) => state.savedTracks.setTracks);
  const { data, isFetching } = useGetCurrentUserTracks(savedTracksOffset);
  const { gridApiRef } = useTableInfiniteScroll({
    isLoading: isFetching,
    onNextPage: () => {
      setOffset(data?.next ? (savedTracksOffset as number) + 50 : null);
    },
  });

  useEffect(() => {
    setSavedTracks({
      tracks: [ ...savedTracks, ...data?.items || []],
      total: data?.total || 0,
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
