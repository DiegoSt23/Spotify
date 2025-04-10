import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumExtended } from '@common/interfaces';
import {
  useGetAlbumDetails,
  useGetAlbumTracks,
  useCheckIsAlbumSaved,
} from '@services/albums';

export const useAlbumDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<AlbumExtended['tracks']>({
    items: [],
  });
  const [offset, setOffset] = useState<number | null>(0);
  const { data: albumData, isFetching } = useGetAlbumDetails(id);
  const { data: remainingTracksData, isFetching: isLoadingRemainingTracks } =
    useGetAlbumTracks(offset, id);
  const { data: isAlbumSaved, isFetching: isFetchingIsAlbumSaved } =
    useCheckIsAlbumSaved(id);

  useEffect(() => {
    if (albumData?.tracks) {
      setTracks({
        items: [...tracks.items, ...(albumData?.tracks?.items || [])],
      });
      setOffset(albumData?.tracks?.next ? (offset as number) + 50 : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumData?.tracks]);

  useEffect(() => {
    if (remainingTracksData?.items) {
      setTracks({
        items: [...tracks.items, ...(remainingTracksData?.items || [])],
      });
      setOffset(remainingTracksData?.next ? (offset as number) + 50 : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTracksData?.items]);

  return {
    albumData,
    tracks,
    isAlbumSaved,
    isLoading: isFetching || isFetchingIsAlbumSaved,
    isLoadingRemainingTracks,
  };
};
