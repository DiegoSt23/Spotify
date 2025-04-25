import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { ArtistFollowedResponse } from '@common/interfaces';

const handleCheckIsArtistFollowed = async (
  id?: string
): Promise<ArtistFollowedResponse> => {
  const response = await Api.get<ArtistFollowedResponse>(
    `me/following/contains?type=artist&ids=${id}`
  );

  return response;
};

export const useCheckIsArtistFollowed = (
  id?: string,
  isFollowSuccess?: boolean,
  isUnfollowSuccess?: boolean
) =>
  useQuery({
    queryKey: ['checkIsArtistFollowed', id, isFollowSuccess, isUnfollowSuccess],
    enabled: !!id,
    queryFn: () => handleCheckIsArtistFollowed(id),
  });
