import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { usePlaylistDetails } from '@hooks/playlists';
import { Page } from '@components/layout';
import { PlaylistDetails as PlaylistDetailsTemplate } from '@components/playlists';

export const PlaylistDetails = () => {
  const { playlistData, tracks, isPlaylistSaved, isLoading, isLoadingTracks } =
    usePlaylistDetails();

  return (
    <Page
      title={playlistData?.name}
      headerElement={
        <IconButton sx={{ position: 'relative', right: 4 }}>
          <MoreVert />
        </IconButton>
      }
    >
      <PlaylistDetailsTemplate
        {...playlistData}
        tracks={tracks}
        isSaved={isPlaylistSaved?.[0]}
        isLoading={isLoading}
        isLoadingTracks={isLoadingTracks}
      />
    </Page>
  );
};
