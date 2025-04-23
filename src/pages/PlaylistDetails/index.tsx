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
  } = usePlaylist();

  return (
    <Page
      title={
        isLoading ? <Skeleton width={150} height={30} /> : playlistData?.name ?? ''
      }
    >
      <PlaylistDetailsTemplate
        {...playlistData}
        tracks={tracks}
        isSaved={isPlaylistSaved?.[0]}
        isOwnPlaylist={isOwnPlaylist}
        isLoading={isLoading}
        isLoadingTracks={isLoadingTracks}
        contextMenuPosition={contextMenuPosition}
        trackContext={trackContext}
        onOpenContextMenu={handleOpenContextMenu}
        onCloseContextMenu={handleCloseContextMenu}
        onAddRemovePlaylist={handleAddRemovePlaylist}
        onPlayPlaylist={handlePlayPlaylist}
        onShufflePlaylist={handleShufflePlaylist}
        onEditPlaylist={handleEditPlaylist}
        onAddTrack={handleAddTrack}
        onAddTrackToQueue={handleAddTrackToQueue}
        onAddTrackToPlaylist={handleAddTrackToPlaylist}
        onCopyTrackLink={handleCopyTrackLink}
      />
    </Page>
  );
};
