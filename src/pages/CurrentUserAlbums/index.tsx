import { AlbumsGrid } from '@components/albums';
import { useGetCurrentUserSavedAlbums } from '@hooks/albums';

export const CurrentUserAlbums = () => {
  const { data, isFetching } = useGetCurrentUserSavedAlbums();
  const parsedData = data
    ? { ...data, items: data.items.map((item) => item.album) }
    : undefined;

  return (
    <AlbumsGrid data={parsedData?.items} loading={isFetching} displayArtist />
  );
};
