import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { PlaylistResponse } from '@common/interfaces';

const handleGetPlaylistDetails = async (
  id?: string
): Promise<PlaylistResponse> => {
  const response = await Api.get<PlaylistResponse>(`playlists/${id}`);

  return response;
};

export const useGetPlaylistDetails = (id?: string) =>
  useQuery({
    queryKey: ['getPlaylistDetails', id],
    enabled: !!id,
    queryFn: () => handleGetPlaylistDetails(id),
  });
