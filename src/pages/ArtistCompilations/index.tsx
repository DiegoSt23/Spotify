import { useParams } from 'react-router-dom';
import { useGetArtistCompilations } from '@hooks/artists';
import { AlbumsGrid } from '@components/albums';
import { Loading } from '@components/common';

export const ArtistCompilations = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetArtistCompilations(id, 50);

  if (isFetching) {
    return <Loading />;
  }

  return <AlbumsGrid data={data?.items} />;
};
