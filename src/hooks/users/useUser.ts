import { useParams, useOutletContext } from 'react-router-dom';
import { useCheckIsUserFollowed } from '@services/users';
import { useGetUserPlaylists } from '@services/playlists';
import { useStore } from '@store/index';
import { type UserContext } from '@components/users';

export const useUser = () => {
  const { id } = useParams();
  const currentUserId = useStore((state) => state?.currentUser?.id);
  const { userData, isFetchingUserData } = useOutletContext<UserContext>();
  const { data: userPlaylists, isFetching: isFetchingUserPlaylists } =
    useGetUserPlaylists(0, id);
  const { data: isUserFollowed, isFetching: isFetchingUserFollowed } =
    useCheckIsUserFollowed(id);

  const handleFollowUnfollowUser = () => {
    console.log(isUserFollowed?.[0] ? 'Unfollow' : 'Follow');
  };

  return {
    userData,
    userPlaylists,
    isFollowed: isUserFollowed?.[0],
    isCurrentUser: currentUserId === id,
    isLoading:
      isFetchingUserData || isFetchingUserPlaylists || isFetchingUserFollowed,
    handleFollowUnfollowUser,
  };
};
