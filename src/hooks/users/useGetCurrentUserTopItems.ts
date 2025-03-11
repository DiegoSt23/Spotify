import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { CurrentUserFollowedArtistsResponse } from '@common/interfaces';

const handleGetCurrentUserTopContent =
  async (): Promise<CurrentUserFollowedArtistsResponse> => {
    const response = await Api.get<CurrentUserFollowedArtistsResponse>(
      '/me/top/tracks?limit=50'
    );

    return response;
  };

export const useGetCurrentUserTopItems = () =>
  useQuery({
    queryKey: ['getCurrentUserTopItems'],
    queryFn: () => handleGetCurrentUserTopContent(),
  });
