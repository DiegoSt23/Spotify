import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { PlaylistsResponse } from '@common/interfaces';

const handleGetUserPlaylists = async (id?: string, limit?: number): Promise<PlaylistsResponse> => {
  const response = await Api.get<PlaylistsResponse>(
    `/users/${id}/playlists?limit=${limit || 10}`
  );

  return response;
};

export const useGetUserPlaylists = (id?: string, limit?: number) =>
  useQuery({
    queryKey: ['getUserPlaylists', id],
    queryFn: () => handleGetUserPlaylists(id, limit),
    enabled: !!id,
  });
