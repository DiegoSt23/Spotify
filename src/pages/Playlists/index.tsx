import { useGetCurrentUserPlaylists } from '@services/playlists';
import { Page } from '@components/layout';
import { PlaylistsGrid } from '@components/playlists';

export const Playlists = () => {
  const { data, isFetching } = useGetCurrentUserPlaylists();

  return (
    <Page title='Playlists'>
      <PlaylistsGrid data={data?.items} loading={isFetching} displayOwner />
    </Page>
  );
};
