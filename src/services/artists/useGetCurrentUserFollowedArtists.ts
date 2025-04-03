import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { CurrentUserFollowedArtistsResponse } from '@common/interfaces';

const handleGetCurrentUserFollowedArtists =
  async (): Promise<CurrentUserFollowedArtistsResponse> => {
    const response = await Api.get<CurrentUserFollowedArtistsResponse>(
      '/me/following?type=artist&limit=50'
    );

    return response;
  };

export const useGetCurrentUserFollowedArtists = () =>
  useQuery({
    queryKey: ['getCurrentUserFollowedArtists'],
    queryFn: handleGetCurrentUserFollowedArtists,
  });
