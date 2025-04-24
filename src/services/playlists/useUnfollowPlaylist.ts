import { useMutation } from '@tanstack/react-query';
import { Api } from '@common/utils';

const handleUnfollowPlaylist = async ({ id }: { id: string }): Promise<void> =>
  await Api.delete<void>(`playlists/${id}/followers`);

export const useUnfollowPlaylist = () =>
  useMutation({
    mutationFn: handleUnfollowPlaylist,
    mutationKey: ['unfollowPlaylist'],
  });
