import { Stack, Typography, CircularProgress } from '@mui/material';
import { useUserPlaylists } from '@hooks/playlists';
import { Page } from '@components/layout';
import { PlaylistsGrid } from '@components/playlists';

export const Playlists = () => {
  const { ref, playlists, total, isFetching, loadingFirstTime } =
    useUserPlaylists();

  return (
    <Page
      title='Playlists'
      headerElement={
        loadingFirstTime ? (
          <CircularProgress size={20} />
        ) : (
          <Typography
            variant='subtitle2'
            fontWeight='fontWeightBold'
            sx={{ color: (theme) => theme.palette.accent.main }}
          >
            {total}
          </Typography>
        )
      }
    >
      <PlaylistsGrid data={playlists} loading={loadingFirstTime} displayOwner />
      <div ref={ref} style={{ position: 'relative', top: '-500px' }} />
      {playlists.length && isFetching && (
        <Stack sx={{ alignItems: 'center', paddingTop: 2 }}>
          <CircularProgress size={30} />
        </Stack>
      )}
    </Page>
  );
};
