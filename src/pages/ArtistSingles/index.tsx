import { useParams } from 'react-router-dom';
import { useGetArtistSingles } from '@hooks/artists';
import { AlbumsGrid } from '@components/albums';
import { Loading } from '@components/common';

export const ArtistSingles = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetArtistSingles(id, 50);

  if (isFetching) {
    return <Loading />;
  }

  return <AlbumsGrid data={data?.items} displayReleaseDate />;
};
