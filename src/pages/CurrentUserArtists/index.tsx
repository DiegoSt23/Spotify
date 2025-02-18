import { useGetCurrentUserFollowedArtists } from '@hooks/artists';
import { ArtistsGrid } from '@components/artists';

export const CurrentUserArtists = () => {
  const { data, isFetching } = useGetCurrentUserFollowedArtists();

  return <ArtistsGrid data={data?.artists?.items} loading={isFetching} />;
};
