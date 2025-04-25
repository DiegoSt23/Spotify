import { Skeleton } from '@mui/material';
import { usePlaylist } from '@hooks/playlists';
import { Page } from '@components/layout';
import { PlaylistDetails as PlaylistDetailsTemplate } from '@components/playlists';

export const PlaylistDetails = () => {
  const {
    playlistData,
    tracks,
    isPlaylistSaved,
    isOwnPlaylist,
    isLoading,
    isLoadingTracks,
    isLoadingFollowUnfollowPlaylist,
    contextMenuPosition,
    selectedTrack,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddRemovePlaylist,
    handlePlayPlaylist,
    handleShufflePlaylist,
    handleEditPlaylist,
  } = usePlaylist();

  return (
    <Page
      title={
        isLoading ? (
          <Skeleton width={150} height={30} />
        ) : (
          playlistData?.name ?? ''
        )
      }
    >
      <PlaylistDetailsTemplate
        {...playlistData}
        tracks={tracks}
        isSaved={isPlaylistSaved?.[0]}
        isOwnPlaylist={isOwnPlaylist}
        isLoading={isLoading}
        isLoadingTracks={isLoadingTracks}
        isLoadingFollowUnfollowPlaylist={isLoadingFollowUnfollowPlaylist}
        contextMenuPosition={contextMenuPosition}
        selectedTrack={selectedTrack}
        onOpenContextMenu={handleOpenContextMenu}
        onCloseContextMenu={handleCloseContextMenu}
        onAddRemovePlaylist={handleAddRemovePlaylist}
        onPlayPlaylist={handlePlayPlaylist}
        onShufflePlaylist={handleShufflePlaylist}
        onEditPlaylist={handleEditPlaylist}
      />
    </Page>
  );
};
