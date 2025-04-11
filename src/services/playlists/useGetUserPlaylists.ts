import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { PlaylistsResponse } from '@common/interfaces';

const handleGetUserPlaylists = async (
  offset: number | null,
  id?: string,
  limit?: number
): Promise<PlaylistsResponse> => {
  const response = await Api.get<PlaylistsResponse>(
    `/users/${id}/playlists?limit=${limit || 10}&offset=${offset}`
  );

  return response;
};

export const useGetUserPlaylists = (offset: number | null, id?: string, limit?: number) =>
  useQuery({
    queryKey: ['getUserPlaylists', id],
    queryFn: () => handleGetUserPlaylists(offset, id, limit),
    enabled: !!(id && offset !== null),
  });
