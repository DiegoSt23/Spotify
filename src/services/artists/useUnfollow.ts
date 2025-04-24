import { useMutation } from '@tanstack/react-query';
import { Api } from '@common/utils';

const handleUnfollow = async ({
  id,
  type,
}: {
  id: string;
  type: 'artist' | 'user';
}): Promise<void> =>
  await Api.delete<void>(`me/following?type=${type}&ids=${id}`);

export const useUnfollow = () =>
  useMutation({
    mutationFn: handleUnfollow,
    mutationKey: ['unfollow'],
  });
