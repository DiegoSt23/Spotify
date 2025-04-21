import { useState, useEffect, type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  AlbumExtended,
  ContextMenuPosition,
  TrackContext,
} from '@common/interfaces';
import {
  useGetAlbumDetails,
  useGetAlbumTracks,
  useCheckIsAlbumSaved,
} from '@services/albums';

const initialTrackContext: TrackContext = {
  id: '',
  name: '',
  artists: '',
};

export const useAlbum = () => {
  const { id } = useParams<{ id: string }>();
  const [trackContext, setTrackContext] =
    useState<TrackContext>(initialTrackContext);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const [tracks, setTracks] = useState<AlbumExtended['tracks']>({
    items: [],
  });
  const [offset, setOffset] = useState<number | null>(0);
  const { data: albumData, isFetching } = useGetAlbumDetails(id);
  const { data: remainingTracksData, isFetching: isLoadingRemainingTracks } =
    useGetAlbumTracks(offset, id);
  const { data: isAlbumSaved, isFetching: isFetchingIsAlbumSaved } =
    useCheckIsAlbumSaved(id);

  const handleOpenContextMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();

    const name = tracks?.items?.find((track) => track.id === id)?.name ?? '';
    const artists =
      tracks?.items
        ?.find((track) => track.id === id)
        ?.artists?.map((artist) => artist.name)
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
  
  // General actions
  const handleAddRemoveAlbum = () => {
    console.log(isAlbumSaved ? 'Remove album' : ' Add album');
  };

  const handlePlayAlbum = () => {
    console.log('Play album');
  };

  const handleShuffleAlbum = () => {
    console.log('Play album on shuffle');
  };

  // Track actions
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
    contextMenuPosition,
    trackContext,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddRemoveAlbum,
    handlePlayAlbum,
    handleShuffleAlbum,
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  };
};
