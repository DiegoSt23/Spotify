import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumsResponse } from '@common/interfaces';

export const handleGetArtistSingles = async (
  id?: string,
  limit?: number
): Promise<AlbumsResponse> => {
  const response = await Api.get<AlbumsResponse>(
    `artists/${id}/albums?limit=${limit || 10}&include_groups=single`
  );

  return response;
};

export const useGetArtistSingles = (id?: string, limit?: number) =>
  useQuery({
    queryKey: ['getArtistSingles', id],
    enabled: !!id,
    queryFn: () => handleGetArtistSingles(id, limit),
  });
