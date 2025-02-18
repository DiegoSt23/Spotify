import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumsResponse } from '@common/interfaces';

export const handleGetArtistAppearsOn = async (
  id?: string,
  limit?: number
): Promise<AlbumsResponse> => {
  const response = await Api.get<AlbumsResponse>(
    `artists/${id}/albums?limit=${limit || 10}&include_groups=appears_on`
  );

  return response;
};

export const useGetArtistAppearsOn = (id?: string, limit?: number) =>
  useQuery({
    queryKey: ['getArtistAppearsOn', id],
    enabled: !!id,
    queryFn: () => handleGetArtistAppearsOn(id, limit),
  });
