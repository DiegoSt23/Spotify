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

export const useCheckIsPlaylistSaved = (
  id?: string,
  isFollowSuccess?: boolean,
  isUnfollowSuccess?: boolean
) =>
  useQuery({
    queryKey: ['checkIsPlaylistSaved', id, isFollowSuccess, isUnfollowSuccess],
    enabled: !!id,
    queryFn: () => handleCheckIsPlaylistSaved(id),
  });
