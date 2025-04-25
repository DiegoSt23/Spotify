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

export const useCheckIsAlbumSaved = (
  id?: string,
  isAddSuccess?: boolean,
  isRemoveSuccess?: boolean
) =>
  useQuery({
    queryKey: ['checkIsAlbumSaved', id, isAddSuccess, isRemoveSuccess],
    enabled: !!id,
    queryFn: () => handleCheckIsAlbumSaved(id),
  });
