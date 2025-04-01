import { useOutletContext } from 'react-router-dom';
import { type ArtistContext } from '@components/layout';
import { useGetArtistCatalog } from '@hooks/artists';
import { Loading } from '@components/common';
import { AlbumsGrid } from '@components/albums';

export const ArtistCompilations = () => {
  const { id, isFetchingArtistData } =
    useOutletContext<ArtistContext>();
  const { data, isFetching } = useGetArtistCatalog(id, 50, 'compilation');

  if (isFetchingArtistData || isFetching) {
    return <Loading />;
  }

  return <AlbumsGrid data={data?.items} displayReleaseDate />;
};
