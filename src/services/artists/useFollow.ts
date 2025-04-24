import { useMutation } from '@tanstack/react-query';
import { Api } from '@common/utils';

const handleFollow = async ({
  id,
  type,
}: {
  id: string;
  type: 'artist' | 'user';
}): Promise<void> =>
  await Api.put<void>(`me/following?type=${type}&ids=${id}`);

export const useFollow = () => useMutation({
  mutationFn: handleFollow,
  mutationKey: ['follow'],
});
