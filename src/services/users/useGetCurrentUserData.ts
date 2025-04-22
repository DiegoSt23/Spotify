import {useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import {
  CurrentUserResponse,
  CurrentUserFollowedArtistsResponse,
} from '@common/interfaces';

const handleGetCurrentUserData = async (): Promise<CurrentUserResponse> => {
  const response = await Api.get<CurrentUserResponse>(`/me`);

  return response;
};

const handleGetCurrentUserFollowedArtists =
  async (): Promise<CurrentUserFollowedArtistsResponse> => {
    const response = await Api.get<CurrentUserFollowedArtistsResponse>(
      '/me/following?type=artist&limit=1'
    );

    return response;
  };

export const useGetCurrentUserData = (accessToken?: string) => (
  useQuery({
    queryKey: ['getCurrentUserData', accessToken],
    queryFn: handleGetCurrentUserData,
    enabled: !!accessToken,
  })
);

export const useGetTotalFollowed = (enabled?: boolean) =>
  useQuery({
    queryKey: ['getCurrentTotalFollowed', enabled],
    queryFn: handleGetCurrentUserFollowedArtists,
    enabled,
  });
