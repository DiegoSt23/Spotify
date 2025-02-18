import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumsResponse } from '@common/interfaces';

export const handleGetArtistAlbums = async (
  id?: string,
  limit?: number
): Promise<AlbumsResponse> => {
  const response = await Api.get<AlbumsResponse>(
    `artists/${id}/albums?limit=${limit || 10}&include_groups=album`
  );

  return response;
};

export const useGetArtistAlbums = (id?: string, limit?: number) =>
  useQuery({
    queryKey: ['getArtistAlbums', id],
    enabled: !!id,
    queryFn: () => handleGetArtistAlbums(id, limit),
  });
