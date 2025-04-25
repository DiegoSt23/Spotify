import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Api } from '@common/utils';
import { useLanguage } from '@hooks/common';

const mutationFn = async ({ id }: { id: string }): Promise<void> =>
  await Api.delete<void>(`me/tracks?ids=${id}`);

export const useRemoveTrackFromSavedSongs = () => {
  const { t } = useLanguage('tracks');

  const mutation = useMutation({
    mutationFn,
    mutationKey: ['removeTrackFromSavedSongs'],
    onSuccess: () => {
      toast.success(t('actionMessages.delete.success'));
    },
    onError: () => {
      toast.error(t('actionMessages.delete.error'));
    },
  });

  return mutation;
};
