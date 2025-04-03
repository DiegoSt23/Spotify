import { useParams, useOutletContext } from 'react-router-dom';
import { useCheckIsUserFollowed } from '@hooks/users';
import { useGetUserPlaylists } from '@hooks/playlists';
import { Loading } from '@components/common';
import { type UserContext } from '@components/users';
import { UserProfile as UserProfileTemplate } from '@components/users';

export const UserProfile = () => {
  const { id } = useParams();
  const { userData, isFetchingUserData } = useOutletContext<UserContext>();
  const { data: userPlaylists, isFetching: isFetchingUserPlaylists } =
    useGetUserPlaylists(id);
  const { data: isUserFollowed, isFetching: isFetchingUserFollowed } = useCheckIsUserFollowed(id);

  if (isFetchingUserData || isFetchingUserPlaylists || isFetchingUserFollowed) {
    return <Loading />;
  }

  return (
    <UserProfileTemplate
      data={userData}
      userPlaylists={userPlaylists}
      isFollowed={isUserFollowed?.[0]}
    />
  );
};
