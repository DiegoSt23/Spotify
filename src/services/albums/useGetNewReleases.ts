import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumResponse } from '@common/interfaces';

const handleGetNewReleases = async (): Promise<AlbumResponse> => {
  const response = await Api.get<AlbumResponse>(`browse/new-releases?limit=10`);

  return response;
};

export const useGetNewReleases = () =>
  useQuery({
    queryKey: ['getNewReleases'],
    queryFn: () => handleGetNewReleases(),
  });
