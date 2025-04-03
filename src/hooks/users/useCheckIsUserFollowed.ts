import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { ArtistFollowedResponse } from '@common/interfaces';

const handleCheckIsUserFollowed = async (
  id?: string
): Promise<ArtistFollowedResponse> => {
  const response = await Api.get<ArtistFollowedResponse>(
    `me/following/contains?type=user&ids=${id}`
  );

  return response;
};

export const useCheckIsUserFollowed = (id?: string) =>
  useQuery({
    queryKey: ['checkIsUserFollowed', id],
    enabled: !!id,
    queryFn: () => handleCheckIsUserFollowed(id),
  });
