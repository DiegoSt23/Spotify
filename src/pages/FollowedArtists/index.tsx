import { Stack, Typography, CircularProgress } from '@mui/material';
import { Page } from '@components/layout';
import { ArtistsGrid } from '@components/artists';
import { useFollowedArtists } from '@hooks/artists';

export const FollowedArtists = () => {
  const { ref, artists, isFetching, total, loadingFirstTime } =
    useFollowedArtists();

  return (
    <Page
      title='Followed Artists'
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
      <ArtistsGrid data={artists} loading={loadingFirstTime} />
      <div ref={ref} style={{ position: 'relative', top: '-500px' }} />
      {artists.length && isFetching && (
        <Stack sx={{ alignItems: 'center', paddingTop: 2 }}>
          <CircularProgress size={30} />
        </Stack>
      )}
    </Page>
  );
};
