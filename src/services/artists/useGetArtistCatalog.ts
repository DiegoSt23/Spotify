import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumsResponse, AlbumCategory } from '@common/interfaces';

export const handleGetArtistCatalog = async (
  offset: number | null,
  id?: string,
  limit?: number,
  category?: AlbumCategory
): Promise<AlbumsResponse> => {
  const response = await Api.get<AlbumsResponse>(
    `artists/${id}/albums?limit=${
      limit || 10
    }&include_groups=${category}&offset=${offset}`
  );

  return response;
};

export const useGetArtistCatalog = (
  offset: number | null,
  id?: string,
  limit?: number,
  category?: AlbumCategory
) =>
  useQuery({
    queryKey: ['getArtistCatalog', id],
    enabled: !!(id && offset !== null),
    queryFn: () => handleGetArtistCatalog(offset, id, limit, category),
  });
