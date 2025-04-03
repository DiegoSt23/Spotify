import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { PlaylistSavedResponse } from '@common/interfaces';

const handleCheckIsPlaylistSaved = async (
  id?: string
): Promise<PlaylistSavedResponse> => {
  const response = await Api.get<PlaylistSavedResponse>(
    `playlists/${id}/followers/contains`
  );

  return response;
};

export const useCheckIsPlaylistSaved = (id?: string) =>
  useQuery({
    queryKey: ['checkIsPlaylistSaved', id],
    enabled: !!id,
    queryFn: () => handleCheckIsPlaylistSaved(id),
  });
