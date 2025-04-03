import { useOutletContext } from 'react-router-dom';
import { type UserContext } from '@components/users';
import { useGetUserPlaylists } from '@services/playlists';
import { Loading } from '@components/common';
import { PlaylistsGrid } from '@components/playlists';

export const UserPlaylists = () => {
  const { id, isFetchingUserData } = useOutletContext<UserContext>();
  const { data: userPlaylists, isFetching: isFetchingUserPlaylists } =
    useGetUserPlaylists(id, 50);

  if (isFetchingUserData || isFetchingUserPlaylists) {
    return <Loading />;
  }

  return <PlaylistsGrid data={userPlaylists?.items} displayTotalTracks />;
};
