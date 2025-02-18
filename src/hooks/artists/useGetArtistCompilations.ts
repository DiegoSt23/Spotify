import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumsResponse } from '@common/interfaces';

export const handleGetArtistCompilations = async (
  id?: string,
  limit?: number
): Promise<AlbumsResponse> => {
  const response = await Api.get<AlbumsResponse>(
    `artists/${id}/albums?limit=${limit || 10}&include_groups=compilation`
  );

  return response;
};

export const useGetArtistCompilations = (id?: string, limit?: number) =>
  useQuery({
    queryKey: ['getArtistCompilations', id],
    enabled: !!id,
    queryFn: () => handleGetArtistCompilations(id, limit),
  });
