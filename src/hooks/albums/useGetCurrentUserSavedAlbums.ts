import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { CurrentUserSavedAlbumsResponse } from '@common/interfaces';

const handleGetCurrentUserSavedAlbums =
  async (): Promise<CurrentUserSavedAlbumsResponse> => {
    const response = await Api.get<CurrentUserSavedAlbumsResponse>(
      '/me/albums?type=artist&limit=50'
    );

    return response;
  };

export const useGetCurrentUserSavedAlbums = () =>
  useQuery({
    queryKey: ['getCurrentUserSavedAlbums'],
    queryFn: handleGetCurrentUserSavedAlbums,
  });
