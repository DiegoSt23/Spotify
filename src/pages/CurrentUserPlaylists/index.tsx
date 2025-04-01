import { useGetCurrentUserPlaylists } from '@hooks/playlists';
import { Page } from '@components/layout';
import { PlaylistsGrid } from '@components/playlists';

export const CurrentUserPlaylists = () => {
  const { data, isFetching } = useGetCurrentUserPlaylists();

  return (
    <Page title="Playlists">
      <PlaylistsGrid data={data?.items} loading={isFetching} displayOwner />
    </Page>
  );
};
