import { useState, useEffect, type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  AlbumExtended,
  ContextMenuPosition,
  TrackContext,
} from '@common/interfaces';
import { useStore } from '@store/index';
import {
  useGetAlbumDetails,
  useGetAlbumTracks,
  useCheckIsAlbumSaved,
  useAddAlbum,
  useRemoveAlbum,
} from '@services/albums';
import { useLanguage } from '@hooks/common';

const initialTrackContext: TrackContext = {
  id: '',
  name: '',
  artists: '',
};

export const useAlbum = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage('albums');
  // store
  const albums = useStore((state) => state.savedAlbums.albums);
  const totalAlbums = useStore((state) => state.savedAlbums.total);
  const albumsOffset = useStore((state) => state.savedAlbums.offset);
  const setAlbumsData = useStore((state) => state.savedAlbums.setAlbumsData);
  // mutations
  const {
    mutate: handleAddAlbum,
    isPending: loadingAdd,
    isSuccess: isSuccessAddRequest,
  } = useAddAlbum();
  const {
    mutate: handleRemoveAlbum,
    isPending: loadingRemove,
    isSuccess: isSuccessRemoveRequest,
  } = useRemoveAlbum();
  // state variables
  const [trackContext, setTrackContext] =
    useState<TrackContext>(initialTrackContext);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const [tracks, setTracks] = useState<AlbumExtended['tracks']>({
    items: [],
  });
  const [offset, setOffset] = useState<number | null>(0);
  // queries
  const { data: albumData, isFetching } = useGetAlbumDetails(id);
  const { data: remainingTracksData, isFetching: isLoadingRemainingTracks } =
    useGetAlbumTracks(offset, id);
  const { data: isAlbumSaved, refetch: checkIsAlbumAdded } =
    useCheckIsAlbumSaved(id);

  // context menu
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
    if (isAlbumSaved?.[0]) {
      handleRemoveAlbum({ id: id ?? '' });

      if (albums?.length && albums.some((album) => album.id === id)) {
        const updatedAlbums = albums.filter((album) => album.id !== id);

        setAlbumsData({
          albums: updatedAlbums,
          total: totalAlbums - 1,
          offset: albumsOffset,
        });
      }
    } else {
      handleAddAlbum({ id: id ?? '' });

      if (albums?.length) {
        setAlbumsData({
          albums: [albumData as AlbumExtended, ...albums],
          total: totalAlbums + 1,
          offset: albumsOffset,
        });
      }
    }
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

  useEffect(() => {
    if (isSuccessAddRequest || isSuccessRemoveRequest) {
      checkIsAlbumAdded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessAddRequest, isSuccessRemoveRequest]);

  useEffect(() => {
    if (isSuccessAddRequest) {
      checkIsAlbumAdded();
      toast.success(
        `${albumData?.name} ${t('albumDetails.actionsMessages.add.success')}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessAddRequest]);

  useEffect(() => {
    if (isSuccessRemoveRequest) {
      checkIsAlbumAdded();
      toast.success(
        `${albumData?.name} ${t('albumDetails.actionsMessages.remove.success')}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessRemoveRequest]);

  return {
    albumData,
    tracks,
    isAlbumSaved,
    isLoading: isFetching,
    isLoadingRemainingTracks,
    isLoadingAddRemove: loadingAdd || loadingRemove,
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
