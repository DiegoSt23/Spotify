import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { UserTracksResponse } from '@common/interfaces';

const handleGetCurrentUserTracks = async (
  offset: number | null
): Promise<UserTracksResponse> => {
  const response = await Api.get<UserTracksResponse>(
    `/me/tracks?limit=50&offset=${offset}`
  );

  return response;
};

export const useGetCurrentUserTracks = (offset: number | null) =>
  useQuery({
    queryKey: ['getCurrentUserTracks'],
    queryFn: () => handleGetCurrentUserTracks(offset),
    enabled: offset !== null,
  });
