import { useState, useEffect, type MouseEvent } from 'react';
import { ContextMenuPosition, Track } from '@common/interfaces';
import { useGetCurrentUserTracks } from '@services/tracks';
import { useTableInfiniteScroll } from '@hooks/common';
import { useStore } from '@store/index';

export const useCurrentUserSavedSongs = () => {
  const tracks = useStore((state) => state.savedTracks.tracks);
  const total = useStore((state) => state.savedTracks.total);
  const offset = useStore((state) => state.savedTracks.offset);
  const setTracksData = useStore((state) => state.savedTracks.setTracksData);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
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

  const handleOpenContextMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    const track = tracks?.find((item) => item.track.id === id);

    if (!track) return;

    setSelectedTrack(track?.track);
    setContextMenuPosition(
      contextMenuPosition === null
        ? {
            top: event.clientY - 6,
            left: event.clientX + 2,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenuPosition(null);
    setSelectedTrack(null);
  };

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
    selectedTrack,
    contextMenuPosition,
    handleOpenContextMenu,
    handleCloseContextMenu,
  };
};
