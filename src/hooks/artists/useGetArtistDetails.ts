import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { ArtistResponse } from '@common/interfaces';

const handleGetArtistDetails = async (id?: string): Promise<ArtistResponse> => {
  const response = await Api.get<ArtistResponse>(`artists/${id}`);

  return response;
};

export const useGetArtistDetails = (id?: string) =>
  useQuery({
    queryKey: ['getArtistDetails', id],
    enabled: !!id,
    queryFn: () => handleGetArtistDetails(id),
  });
