import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Api } from '@common/utils';
import { useLanguage } from '@hooks/common';

const mutationFn = async ({
  id,
  type,
}: {
  id: string;
  type: 'artist' | 'user';
  name: string;
}): Promise<void> => await Api.put<void>(`me/following?type=${type}&ids=${id}`);

export const useFollow = () => {
  const { t } = useLanguage('artists');

  const mutation = useMutation({
    mutationFn,
    mutationKey: ['follow'],
    onSuccess: (_, payload) => {
      toast.success(
        `${t('artistProfile.actionsMessages.follow.success')} ${payload.name}`
      );
    },
    onError: () => {
      toast.error(t('artistProfile.actionsMessages.follow.error'));
    },
  });

  return mutation;
};
