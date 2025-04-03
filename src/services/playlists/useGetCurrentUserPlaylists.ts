import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { PlaylistsResponse } from '@common/interfaces';

const handleGetCurrentUserPlaylists = async (): Promise<PlaylistsResponse> => {
  const response = await Api.get<PlaylistsResponse>(
    '/me/playlists?type=artist&limit=50'
  );

  return response;
};

export const useGetCurrentUserPlaylists = () =>
  useQuery({
    queryKey: ['getCurrentUserPlaylists'],
    queryFn: handleGetCurrentUserPlaylists,
  });
