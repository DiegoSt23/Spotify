import { Stack, CircularProgress } from '@mui/material';
import { useArtistCatalogCategory } from '@hooks/albums';
import { Loading } from '@components/common';
import { AlbumsGrid } from '@components/albums';

export const ArtistCatalogCategory = () => {
  const { ref, albums, isLoading, isLoadingFirstTime } =
    useArtistCatalogCategory();

  if (isLoadingFirstTime) {
    return <Loading />;
  }

  return (
    <>
      <AlbumsGrid data={albums} displayReleaseDate />
      <div ref={ref} style={{ position: 'relative', top: '-500px' }} />
      {albums.length && isLoading && (
        <Stack sx={{ alignItems: 'center', paddingTop: 2 }}>
          <CircularProgress size={30} />
        </Stack>
      )}
    </>
  );
};
