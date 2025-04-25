import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Api } from '@common/utils';
import { useLanguage } from '@hooks/common';

const mutationFn = async ({ id }: { id: string }): Promise<void> =>
  await Api.delete<void>(`me/albums?ids=${id}`);

export const useRemoveAlbum = () => {
  const { t } = useLanguage('albums');

  const mutation = useMutation({
    mutationFn,
    mutationKey: ['removeAlbum'],
    onSuccess: () => {
      toast.success(t('albumDetails.actionsMessages.remove.success'));
    },
    onError: () => {
      toast.error(t('albumDetails.actionsMessages.remove.error'));
    },
  });

  return mutation;
};
