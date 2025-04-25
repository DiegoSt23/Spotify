import { useState, useEffect, type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  AlbumExtended,
  ContextMenuPosition,
  Track,
} from '@common/interfaces';
import { useStore } from '@store/index';
import {
  useGetAlbumDetails,
  useGetAlbumTracks,
  useCheckIsAlbumSaved,
  useAddAlbum,
  useRemoveAlbum,
} from '@services/albums';

export const useAlbum = () => {
  const { id } = useParams<{ id: string }>();
  // store
  const albums = useStore((state) => state.savedAlbums.albums);
  const totalAlbums = useStore((state) => state.savedAlbums.total);
  const albumsOffset = useStore((state) => state.savedAlbums.offset);
  const setAlbumsData = useStore((state) => state.savedAlbums.setAlbumsData);
  // mutations
  const {
    mutate: handleAddAlbum,
    isPending: loadingAdd,
    isSuccess: isAddSuccess,
  } = useAddAlbum();
  const {
    mutate: handleRemoveAlbum,
    isPending: loadingRemove,
    isSuccess: isRemoveSuccess,
  } = useRemoveAlbum();
  // state variables
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
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
  const { data: isAlbumSaved } = useCheckIsAlbumSaved(
    id,
    isAddSuccess,
    isRemoveSuccess
  );

  const handleOpenContextMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    const track = tracks?.items?.find((track) => track.id === id);

    if (!track) return;

    setSelectedTrack({
      ...track,
      album: {
        album_type: albumData?.album_type ?? '',
        href: albumData?.href ?? '',
        id: albumData?.id ?? '',
        name: albumData?.name ?? '',
        images: albumData?.images ?? [],
        artists: albumData?.artists ?? [],
        release_date: albumData?.release_date ?? '',
        release_date_precision: albumData?.release_date_precision ?? '',
        type: albumData?.type ?? '',
        uri: albumData?.uri ?? '',
        external_urls: albumData?.external_urls ?? { spotify: '' },
        total_tracks: albumData?.total_tracks ?? 0,
        available_markets: albumData?.available_markets ?? [],
      },
    } as Track);
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
    isLoading: isFetching,
    isLoadingRemainingTracks,
    isLoadingAddRemove: loadingAdd || loadingRemove,
    contextMenuPosition,
    selectedTrack,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddRemoveAlbum,
    handlePlayAlbum,
    handleShuffleAlbum,
  };
};
