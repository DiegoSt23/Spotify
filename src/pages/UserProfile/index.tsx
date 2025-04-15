import { useParams, useOutletContext } from 'react-router-dom';
import { useCheckIsUserFollowed } from '@services/users';
import { useGetUserPlaylists } from '@services/playlists';
import { type UserContext } from '@components/users';
import { UserProfile as UserProfileTemplate } from '@components/users';

export const UserProfile = () => {
  const { id } = useParams();
  const { userData, isFetchingUserData } = useOutletContext<UserContext>();
  const { data: userPlaylists, isFetching: isFetchingUserPlaylists } =
    useGetUserPlaylists(0, id);
  const { data: isUserFollowed, isFetching: isFetchingUserFollowed } = useCheckIsUserFollowed(id);
  const isLoading =
    isFetchingUserData || isFetchingUserPlaylists || isFetchingUserFollowed;

  return (
    <UserProfileTemplate
      data={userData}
      userPlaylists={userPlaylists}
      isFollowed={isUserFollowed?.[0]}
      isLoading={isLoading}
    />
  );
};
