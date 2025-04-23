import { useUser } from '@hooks/users';
import { UserProfile as UserProfileTemplate } from '@components/users';

export const UserProfile = () => {
  const {
    userData,
    userPlaylists,
    isCurrentUser,
    isFollowed,
    isLoading,
    handleFollowUnfollowUser,
  } = useUser();

  return (
    <UserProfileTemplate
      data={userData}
      userPlaylists={userPlaylists}
      isFollowed={isFollowed}
      isCurrentUser={isCurrentUser}
      isLoading={isLoading}
      onFollowUnfollowUser={handleFollowUnfollowUser}
    />
  );
};
