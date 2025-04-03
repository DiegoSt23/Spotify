import { useOutletContext } from 'react-router-dom';
import { type ArtistContext } from '@components/artists';
import { useGetArtistCatalog } from '@services/artists';
import { Loading } from '@components/common';
import { AlbumsGrid } from '@components/albums';

export const ArtistSingles = () => {
  const { id, isFetchingArtistData } =
    useOutletContext<ArtistContext>();
  const { data, isFetching } = useGetArtistCatalog(id, 50, 'single');

  if (isFetchingArtistData || isFetching) {
    return <Loading />;
  }

  return <AlbumsGrid data={data?.items} displayReleaseDate />;
};
