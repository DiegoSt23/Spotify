import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { CurrentUserFollowedArtistsResponse } from '@common/interfaces';

const handleGetCurrentUserFollowedArtists = async (
  after?: string | null
): Promise<CurrentUserFollowedArtistsResponse> => {
  const response = await Api.get<CurrentUserFollowedArtistsResponse>(
    `/me/following?type=artist&limit=50${after ? `&after=${after}` : ''}`
  );

  return response;
};

export const useGetCurrentUserFollowedArtists = (after?: string | null) =>
  useQuery({
    queryKey: ['getCurrentUserFollowedArtists'],
    queryFn: () => handleGetCurrentUserFollowedArtists(after),
    enabled: after !== null,
  });
