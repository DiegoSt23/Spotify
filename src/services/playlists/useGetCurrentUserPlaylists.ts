import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { PlaylistsResponse } from '@common/interfaces';

const handleGetCurrentUserPlaylists = async (
  offset: number | null
): Promise<PlaylistsResponse> => {
  const response = await Api.get<PlaylistsResponse>(
    `/me/playlists?limit=50&offset=${offset}`
  );

  return response;
};

export const useGetCurrentUserPlaylists = (offset: number | null) =>
  useQuery({
    queryKey: ['getCurrentUserPlaylists'],
    queryFn: () => handleGetCurrentUserPlaylists(offset),
    enabled: offset !== null,
  });
