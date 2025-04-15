import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlaylistsTracksResponse } from '@common/interfaces';
import {
  useGetPlaylistDetails,
  useGetPlaylistTracks,
  useCheckIsPlaylistSaved,
} from '@services/playlists';

export const usePlaylistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<PlaylistsTracksResponse>({
    items: [],
    total: 0,
  });
  const [offset, setOffset] = useState<number | null>(0);
  const { data: playlistData, isFetching } = useGetPlaylistDetails(id);
  const {
    data: playlistTracks,
    isFetching: isLoadingPlaylistTracks,
  } = useGetPlaylistTracks(offset, id);
  const { data: isPlaylistSaved, isFetching: isLoadingIsPlaylistSaved } =
    useCheckIsPlaylistSaved(id);

  useEffect(() => {
    if (playlistTracks?.items) {
      setTracks({
        items: [...tracks.items, ...(playlistTracks?.items || [])],
        total: playlistTracks?.total || 0,
      });
      setOffset(playlistTracks?.next ? (offset as number) + 50 : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistTracks?.items]);

  return {
    playlistData,
    tracks,
    isPlaylistSaved,
    isLoading: isFetching || isLoadingIsPlaylistSaved,
    isLoadingTracks: isLoadingPlaylistTracks,
  };
};
