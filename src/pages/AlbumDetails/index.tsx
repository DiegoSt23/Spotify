import { Skeleton } from '@mui/material';
import { useAlbum } from '@hooks/albums';
import { Page } from '@components/layout';
import { AlbumDetails as AlbumDetailsTemplate } from '@components/albums';

export const AlbumDetails = () => {
  const {
    albumData,
    tracks,
    isAlbumSaved,
    isLoading,
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
  } = useAlbum();

  return (
    <Page
      title={
        isLoading ? <Skeleton width={150} height={30} /> : albumData?.name ?? ''
      }
    >
      <AlbumDetailsTemplate
        {...albumData}
        tracks={tracks}
        isSaved={isAlbumSaved?.[0]}
        isLoading={isLoading}
        isLoadingRemainingTracks={isLoadingRemainingTracks}
        contextMenuPosition={contextMenuPosition}
        trackContext={trackContext}
        onOpenContextMenu={handleOpenContextMenu}
        onCloseContextMenu={handleCloseContextMenu}
        onAddRemoveAlbum={handleAddRemoveAlbum}
        onPlayAlbum={handlePlayAlbum}
        onShuffleAlbum={handleShuffleAlbum}
        onAddTrack={handleAddTrack}
        onAddTrackToQueue={handleAddTrackToQueue}
        onAddTrackToPlaylist={handleAddTrackToPlaylist}
        onCopyTrackLink={handleCopyTrackLink}
      />
    </Page>
  );
};
