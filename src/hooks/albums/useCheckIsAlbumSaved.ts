import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { AlbumSavedResponse } from '@common/interfaces';

const handleCheckIsAlbumSaved = async (
  id?: string
): Promise<AlbumSavedResponse> => {
  const response = await Api.get<AlbumSavedResponse>(
    `me/albums/contains?ids=${id}`
  );

  return response;
};

export const useCheckIsAlbumSaved = (id?: string) =>
  useQuery({
    queryKey: ['checkIsAlbumSaved', id],
    enabled: !!id,
    queryFn: () => handleCheckIsAlbumSaved(id),
  });
