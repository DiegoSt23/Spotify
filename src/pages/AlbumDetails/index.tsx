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
    isLoadingAddRemove,
    contextMenuPosition,
    selectedTrack,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddRemoveAlbum,
    handlePlayAlbum,
    handleShuffleAlbum,
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
        isLoadingAddRemove={isLoadingAddRemove}
        contextMenuPosition={contextMenuPosition}
        selectedTrack={selectedTrack}
        onOpenContextMenu={handleOpenContextMenu}
        onCloseContextMenu={handleCloseContextMenu}
        onAddRemoveAlbum={handleAddRemoveAlbum}
        onPlayAlbum={handlePlayAlbum}
        onShuffleAlbum={handleShuffleAlbum}
      />
    </Page>
  );
};
