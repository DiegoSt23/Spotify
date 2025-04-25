import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Api } from '@common/utils';
import { useLanguage } from '@hooks/common';

const mutationFn = async ({ id }: { id: string }): Promise<void> =>
  await Api.put<void>(`me/tracks?ids=${id}`);

export const useAddTrackToSavedSongs = () => {
  const { t } = useLanguage('tracks');

  const mutation = useMutation({
    mutationFn,
    mutationKey: ['addTrackToSavedSongs'],
    onSuccess: () => {
      toast.success(t('actionMessages.add.success'));
    },
    onError: () => {
      toast.error(t('actionMessages.add.error'));
    },
  });

  return mutation;
};
