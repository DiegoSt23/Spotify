import { PlaylistsGrid } from '@components/playlists';
import { useGetCurrentUserPlaylists } from '@hooks/playlists';

export const CurrentUserPlaylists = () => {
  const { data, isFetching } = useGetCurrentUserPlaylists();

  return <PlaylistsGrid data={data?.items} loading={isFetching} displayOwner />;
};
