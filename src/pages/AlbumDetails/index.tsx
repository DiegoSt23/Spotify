import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useAlbumDetails } from '@hooks/albums';
import { Page } from '@components/layout';
import { AlbumDetails as AlbumDetailsTemplate } from '@components/albums';
import { Loading } from '@components/common';

export const AlbumDetails = () => {
  const {
    albumData,
    tracks,
    isAlbumSaved,
    isLoading,
    isLoadingRemainingTracks,
  } = useAlbumDetails();

  if (isLoading) {
    return <Loading />;
  }

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
        isLoadingRemainingTracks={isLoadingRemainingTracks}
      />
    </Page>
  );
};
