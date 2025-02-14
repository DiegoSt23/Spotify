import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumResponse } from '@common/interfaces';

const handleGetAlbumDetails = async (id?: string): Promise<AlbumResponse> => {
  const response = await Api.get<AlbumResponse>(`albums/${id}`);

  return response;
};

export const useGetAlbumDetails = (id?: string) =>
  useQuery({
    queryKey: ['getAlbumDetails', id],
    enabled: !!id,
    queryFn: () => handleGetAlbumDetails(id),
  });
