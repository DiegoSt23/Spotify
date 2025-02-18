import { useParams } from 'react-router-dom';
import { useGetArtistAppearsOn } from '@hooks/artists';
import { AlbumsGrid } from '@components/albums';
import { Loading } from '@components/common';

export const ArtistAppearsOn = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGetArtistAppearsOn(id, 50);

  if (isFetching) {
    return <Loading />;
  }

  return <AlbumsGrid data={data?.items} />;
};
