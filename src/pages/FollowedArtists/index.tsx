import { useGetCurrentUserFollowedArtists } from '@hooks/artists';
import { Page } from '@components/layout';
import { ArtistsGrid } from '@components/artists';

export const FollowedArtists = () => {
  const { data, isFetching } = useGetCurrentUserFollowedArtists();

  return (
    <Page title='Followed Artists'>
      <ArtistsGrid data={data?.artists?.items} loading={isFetching} />
    </Page>
  );
};
