import { useArtistProfile } from '@hooks/artists';
import { ArtistProfile as ArtistProfileTemplate } from '@components/artists';

export const ArtistProfile = () => {
  const {
    artistData,
    topTracks,
    partialAlbums,
    isArtistFollowed,
    bioData,
    isLoading,
    contextMenuPosition,
    trackContext,
    handleOpenContextMenu,
    handleCloseContextMenu,
    handleAddTrack,
    handleAddTrackToQueue,
    handleAddTrackToPlaylist,
    handleCopyTrackLink,
  } = useArtistProfile();

  return (
    <ArtistProfileTemplate
      {...artistData}
      {...bioData}
      {...topTracks}
      {...partialAlbums}
      isFollowed={isArtistFollowed?.[0]}
      isLoading={isLoading}
      contextMenuPosition={contextMenuPosition}
      trackContext={trackContext}
      onOpenContextMenu={handleOpenContextMenu}
      onCloseContextMenu={handleCloseContextMenu}
      onAddTrack={handleAddTrack}
      onAddTrackToQueue={handleAddTrackToQueue}
      onAddTrackToPlaylist={handleAddTrackToPlaylist}
      onCopyTrackLink={handleCopyTrackLink}
    />
  );
};
