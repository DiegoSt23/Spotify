import { useState, useEffect, type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  PlaylistsTracksResponse,
  TrackContext,
  ContextMenuPosition,
} from '@common/interfaces';
import {
  useGetPlaylistDetails,
  useGetPlaylistTracks,
  useCheckIsPlaylistSaved,
} from '@services/playlists';

const initialTrackContext: TrackContext = {
  id: '',
  name: '',
  artists: '',
};

export const usePlaylistDetails = () => {
  const { id } = useParams<{ id: string }>();
   const [trackContext, setTrackContext] =
     useState<TrackContext>(initialTrackContext);
   const [contextMenuPosition, setContextMenuPosition] =
     useState<ContextMenuPosition | null>(null);
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
  
  const handleOpenContextMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();

    const name =
      tracks?.items?.find((item) => item.track.id === id)?.track.name ?? '';
    const artists =
      tracks?.items
        ?.find((item) => item.track.id === id)
        ?.track?.artists?.map((artist) => artist.name)
        ?.join(', ') ?? '';

    setTrackContext({
      id: id ?? '',
      name,
      artists,
    });
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
    setTrackContext(initialTrackContext);
  };

  const handleAddTrack = () => {
    console.log('Add track', trackContext.id);
  };

  const handleAddTrackToQueue = () => {
    console.log('Add to queue', trackContext.id);
  };

  const handleAddTrackToPlaylist = () => {
    console.log('Add track to playlist', trackContext.id);
  };

  const handleCopyTrackLink = () => {
    console.log('Copy track link', trackContext.id);
  };

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
    contextMenuPosition,
    trackContext,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  };
};
