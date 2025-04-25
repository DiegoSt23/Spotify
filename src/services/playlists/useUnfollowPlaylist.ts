import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Api } from '@common/utils';
import { useLanguage } from '@hooks/common';

const mutationFn = async ({ id }: { id: string }): Promise<void> =>
  await Api.delete<void>(`playlists/${id}/followers`);

export const useUnfollowPlaylist = () => {
  const { t } = useLanguage('playlists');

  const mutation = useMutation({
    mutationFn,
    mutationKey: ['unfollowPlaylist'],
    onSuccess: () => {
      toast.success(t('playlistDetails.actionsMessages.remove.success'));
    },
    onError: () => {
      toast.error(t('playlistDetails.actionsMessages.remove.error'));
    },
  });

  return mutation;
};
