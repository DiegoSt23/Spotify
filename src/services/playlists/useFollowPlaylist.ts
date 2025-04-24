import { useMutation } from '@tanstack/react-query';
import { Api } from '@common/utils';

const handleFollowPlaylist = async ({ id }: { id: string }): Promise<void> =>
  await Api.put<void>(`playlists/${id}/followers`);

export const useFollowPlaylist = () =>
  useMutation({
    mutationFn: handleFollowPlaylist,
    mutationKey: ['followPlaylist'],
  });
