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
}): Promise<void> =>
  await Api.delete<void>(`me/following?type=${type}&ids=${id}`);

export const useUnfollow = () => {
  const { t } = useLanguage('artists');

  const mutation = useMutation({
    mutationFn,
    mutationKey: ['unfollow'],
    onSuccess: (_, payload) => {
      toast.success(
        `${t('artistProfile.actionsMessages.unfollow.success')} ${payload.name}`
      );
    },
    onError: () => {
      toast.error(t('artistProfile.actionsMessages.unfollow.error'));
    },
  });

  return mutation;
};
