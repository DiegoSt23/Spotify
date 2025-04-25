import { useState, useEffect, type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  PlaylistsTracksResponse,
  Playlist,
  Track,
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

export const usePlaylist = () => {
  const { id } = useParams<{ id: string }>();
  // mutations
  const {
    mutate: handleFollowPlaylist,
    isPending: loadingFollow,
    isSuccess: isFollowSuccess,
  } = useFollowPlaylist();
  const {
    mutate: handleUnfollowPlaylist,
    isPending: loadingUnfollow,
    isSuccess: isUnfollowSuccess,
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
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
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
  const { data: isPlaylistSaved } = useCheckIsPlaylistSaved(
    id,
    isFollowSuccess,
    isUnfollowSuccess
  );

  const handleOpenContextMenu = (
    event: MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    const track = tracks?.items?.find((item) => item.track.id === id);

    if (!track) return;

    setSelectedTrack(track.track);
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
    isOwnPlaylist: playlistData?.owner.id === currentUserId,
    isLoading: isFetching,
    isLoadingTracks: isLoadingPlaylistTracks,
    isLoadingFollowUnfollowPlaylist: loadingFollow || loadingUnfollow,
    contextMenuPosition,
    selectedTrack,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddRemovePlaylist,
    handlePlayPlaylist,
    handleShufflePlaylist,
    handleEditPlaylist,
  };
};
