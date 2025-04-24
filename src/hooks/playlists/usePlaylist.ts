import { useState, useEffect, type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  PlaylistsTracksResponse,
  Playlist,
  TrackContext,
  ContextMenuPosition,
} from '@common/interfaces';
import { useStore } from '@store/index';
import {
  useGetPlaylistDetails,
  useGetPlaylistTracks,
  useCheckIsPlaylistSaved,
  useFollowPlaylist,
  useUnfollowPlaylist,
} from '@services/playlists';

const initialTrackContext: TrackContext = {
  id: '',
  name: '',
  artists: '',
};

export const usePlaylist = () => {
  const { id } = useParams<{ id: string }>();
  // mutations
  const {
    mutate: handleFollowPlaylist,
    isPending: loadingFollow,
    isSuccess: isSuccessFollowRequest,
  } = useFollowPlaylist();
  const {
    mutate: handleUnfollowPlaylist,
    isPending: loadingUnfollow,
    isSuccess: isSuccessUnfollowRequest,
  } = useUnfollowPlaylist();
  // store
  const currentUserId = useStore((state) => state?.currentUser?.id);
   const playlists = useStore((state) => state.userPlaylists.playlists);
   const totalPlaylists = useStore((state) => state.userPlaylists.total);
   const playlistOffset = useStore((state) => state.userPlaylists.offset);
   const setPlaylistsData = useStore(
     (state) => state.userPlaylists.setPlaylistsData
   );
  // state variables
  const [trackContext, setTrackContext] =
    useState<TrackContext>(initialTrackContext);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const [tracks, setTracks] = useState<PlaylistsTracksResponse>({
    items: [],
    total: 0,
  });
  const [offset, setOffset] = useState<number | null>(0);
  // queries
  const { data: playlistData, isFetching } = useGetPlaylistDetails(id);
  const { data: playlistTracks, isFetching: isLoadingPlaylistTracks } =
    useGetPlaylistTracks(offset, id);
  const { data: isPlaylistSaved, refetch: checkIsPlaylistSaved } =
    useCheckIsPlaylistSaved(id);

  // context menu
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

  // General actions
  const handleAddRemovePlaylist = () => {
    if (isPlaylistSaved?.[0]) {
      handleUnfollowPlaylist({ id: id ?? '' });

      if (
        playlists?.length &&
        playlists.some((playlist) => playlist.id === id)
      ) {
        const updatedPlaylists = playlists.filter(
          (playlist) => playlist.id !== id
        );

        setPlaylistsData({
          playlists: updatedPlaylists,
          total: totalPlaylists - 1,
          offset: playlistOffset,
        });
      }
    } else {
      handleFollowPlaylist({ id: id ?? '' });

      if (playlists?.length) {
        setPlaylistsData({
          playlists: [playlistData as Playlist, ...playlists],
          total: totalPlaylists + 1,
          offset: playlistOffset,
        });
      }
    }
  };

  const handlePlayPlaylist = () => {
    console.log('Play playlist');
  };

  const handleShufflePlaylist = () => {
    console.log('Play playlist on shuffle');
  };

  const handleEditPlaylist = () => {
    console.log('Playlist edit');
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
    if (playlistTracks?.items) {
      setTracks({
        items: [...tracks.items, ...(playlistTracks?.items || [])],
        total: playlistTracks?.total || 0,
      });
      setOffset(playlistTracks?.next ? (offset as number) + 50 : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistTracks?.items]);

  useEffect(() => {
    if (isSuccessFollowRequest || isSuccessUnfollowRequest) {
      checkIsPlaylistSaved();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessFollowRequest, isSuccessUnfollowRequest]);

  return {
    playlistData,
    tracks,
    isPlaylistSaved,
    isOwnPlaylist: playlistData?.owner.id === currentUserId,
    isLoading: isFetching,
    isLoadingTracks: isLoadingPlaylistTracks,
    isLoadingFollowUnfollowPlaylist: loadingFollow || loadingUnfollow,
    contextMenuPosition,
    trackContext,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddRemovePlaylist,
    handlePlayPlaylist,
    handleShufflePlaylist,
    handleEditPlaylist,
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  };
};
