import { useGetCurrentUserFollowedArtists } from '@hooks/artists';
import { Page } from '@components/layout';
import { ArtistsGrid } from '@components/artists';

export const Artists = () => {
  const { data, isFetching } = useGetCurrentUserFollowedArtists();

  return (
    <Page title='Artists'>
      <ArtistsGrid data={data?.artists?.items} loading={isFetching} />
    </Page>
  );
};
