import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumsResponse } from '@common/interfaces';

export const handleGetArtistCatalog = async (
  id?: string,
  limit?: number,
  category?: 'album' | 'appears_on' | 'compilation' | 'single'
): Promise<AlbumsResponse> => {
  const response = await Api.get<AlbumsResponse>(
    `artists/${id}/albums?limit=${limit || 10}&include_groups=${category}`
  );

  return response;
};

export const useGetArtistCatalog = (
  id?: string,
  limit?: number,
  category?: 'album' | 'appears_on' | 'compilation' | 'single',
) =>
  useQuery({
    queryKey: ['getArtistCatalog', id],
    enabled: !!id,
    queryFn: () => handleGetArtistCatalog(id, limit, category),
  });
