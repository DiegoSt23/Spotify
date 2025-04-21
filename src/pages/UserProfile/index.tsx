import { useUser } from '@hooks/users';
import { UserProfile as UserProfileTemplate } from '@components/users';

export const UserProfile = () => {
  const {
    userData,
    userPlaylists,
    isFollowed,
    isLoading,
    handleFollowUnfollowUser,
  } = useUser();

  return (
    <UserProfileTemplate
      data={userData}
      userPlaylists={userPlaylists}
      isFollowed={isFollowed}
      isLoading={isLoading}
      onFollowUnfollowUser={handleFollowUnfollowUser}
    />
  );
};
