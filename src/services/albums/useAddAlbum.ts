import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Api } from '@common/utils';
import { useLanguage } from '@hooks/common';

const mutationFn = async ({ id }: { id: string }): Promise<void> =>
  await Api.put<void>(`me/albums?ids=${id}`);

export const useAddAlbum = () => {
  const { t } = useLanguage('albums');

  const mutation = useMutation({
    mutationFn,
    mutationKey: ['addAlbum'],
    onSuccess: () => {
      toast.success(t('albumDetails.actionsMessages.add.success'));
    },
    onError: () => {
      toast.error(t('albumDetails.actionsMessages.add.error'));
    },
  });

  return mutation;
};
