import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useAlbumDetails } from '@hooks/albums';
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
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  } = useAlbumDetails();

  return (
    <Page
      title={albumData?.name}
      headerElement={
        <IconButton sx={{ position: 'relative', right: 4 }}>
          <MoreVert />
        </IconButton>
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
        onAddTrack={handleAddTrack}
        onAddTrackToQueue={handleAddTrackToQueue}
        onAddTrackToPlaylist={handleAddTrackToPlaylist}
        onCopyTrackLink={handleCopyTrackLink}
      />
    </Page>
  );
};
