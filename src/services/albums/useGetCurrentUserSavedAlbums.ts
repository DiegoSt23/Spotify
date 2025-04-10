import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { CurrentUserSavedAlbumsResponse } from '@common/interfaces';

const handleGetCurrentUserSavedAlbums = async (
  offset: number | null
): Promise<CurrentUserSavedAlbumsResponse> => {
  const response = await Api.get<CurrentUserSavedAlbumsResponse>(
    `/me/albums?type=artist&limit=50&offset=${offset}`
  );

  return response;
};

export const useGetCurrentUserSavedAlbums = (offset: number | null) =>
  useQuery({
    queryKey: ['getCurrentUserSavedAlbums'],
    queryFn: () => handleGetCurrentUserSavedAlbums(offset),
    enabled: offset !== null,
  });
