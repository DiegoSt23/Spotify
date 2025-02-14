import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { UserTracksResponse } from '@common/interfaces';

const handleGetCurrentUserTracks = async (): Promise<UserTracksResponse> => {
  const response = await Api.get<UserTracksResponse>('/me/tracks?limit=50');

  return response;
};

export const useGetCurrentUserTracks = () =>
  useQuery({
    queryKey: ['getCurrentUserTracks'],
    queryFn: handleGetCurrentUserTracks,
  });
