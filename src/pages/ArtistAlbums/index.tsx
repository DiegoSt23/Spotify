import { useParams } from 'react-router-dom';
import { useGetArtistAlbums } from '@hooks/artists';
import { AlbumsGrid } from '@components/albums';
import { Loading } from '@components/common';

export const ArtistAlbums = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetArtistAlbums(id, 50);

  if (isFetching) {
    return <Loading />;
  }

  return <AlbumsGrid data={data?.items} displayReleaseDate />;
};
