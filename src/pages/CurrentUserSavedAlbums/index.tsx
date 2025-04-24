import { Stack, Typography, CircularProgress } from '@mui/material';
import { useCurrentUserSavedAlbums } from '@hooks/albums';
import { AlbumsGrid } from '@components/albums';

import { Page } from '@components/layout';

export const CurrentUserSavedAlbums = () => {
  const { ref, albums, total, isFetching, loadingFirstTime } =
    useCurrentUserSavedAlbums();

  return (
    <Page
      title='Saved Albums'
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
      <AlbumsGrid data={albums} loading={loadingFirstTime} displayArtist />
      <div ref={ref} style={{ position: 'relative', top: '-500px' }} />
      {!!albums.length && isFetching && (
        <Stack sx={{ alignItems: 'center', paddingTop: 2 }}>
          <CircularProgress size={30} />
        </Stack>
      )}
    </Page>
  );
};
