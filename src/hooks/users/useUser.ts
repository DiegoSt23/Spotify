import { useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useCheckIsUserFollowed } from '@services/users';
import { useFollow, useUnfollow } from '@services/artists';
import { useGetUserPlaylists } from '@services/playlists';
import { useStore } from '@store/index';
import { type UserContext } from '@components/users';

export const useUser = () => {
  const { id } = useParams();
  const {
    mutate: handleFollow,
    isPending: loadingFollow,
    isSuccess: isSuccessFollowRequest,
  } = useFollow();
  const {
    mutate: handleUnfollow,
    isPending: loadingUnfollow,
    isSuccess: isSuccessUnfollowRequest,
  } = useUnfollow();
  const currentUserId = useStore((state) => state?.currentUser?.id);
  const { userData, isFetchingUserData } = useOutletContext<UserContext>();
  const { data: userPlaylists, isFetching: isFetchingUserPlaylists } =
    useGetUserPlaylists(0, id);
  const {
    data: isUserFollowed,
    refetch: checkIsUserFollowed,
  } = useCheckIsUserFollowed(id);

  const handleFollowUnfollowUser = () => {
   if (isUserFollowed?.[0]) {
     handleUnfollow({ id: id ?? '', type: 'user' });
   } else {
     handleFollow({ id: id ?? '', type: 'user' });
   }
  };

  useEffect(() => {
    if (isSuccessFollowRequest || isSuccessUnfollowRequest) {
      checkIsUserFollowed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessFollowRequest, isSuccessUnfollowRequest]);

  return {
    userData,
    userPlaylists,
    isFollowed: isUserFollowed?.[0],
    isCurrentUser: currentUserId === id,
    isLoading:
      isFetchingUserData || isFetchingUserPlaylists,
    isLoadingFollowUnfollow: loadingFollow || loadingUnfollow,
    handleFollowUnfollowUser,
  };
};
