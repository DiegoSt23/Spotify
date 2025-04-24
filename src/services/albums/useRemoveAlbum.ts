import { useMutation } from '@tanstack/react-query';
import { Api } from '@common/utils';

const handleRemoveAlbum = async ({ id }: { id: string }): Promise<void> =>
  await Api.delete<void>(`me/albums?ids=${id}`);

export const useRemoveAlbum = () =>
  useMutation({
    mutationFn: handleRemoveAlbum,
    mutationKey: ['removeAlbum'],
  });
