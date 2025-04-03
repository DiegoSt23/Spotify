import { AlbumsGrid } from '@components/albums';
import { useGetCurrentUserSavedAlbums } from '@services/albums';
import { Page } from '@components/layout';

export const SavedAlbums = () => {
  const { data, isFetching } = useGetCurrentUserSavedAlbums();
  const parsedData = data
    ? { ...data, items: data.items.map((item) => item.album) }
    : undefined;

  return (
    <Page title="Saved Albums">
      <AlbumsGrid data={parsedData?.items} loading={isFetching} displayArtist />
    </Page>
  );
};
