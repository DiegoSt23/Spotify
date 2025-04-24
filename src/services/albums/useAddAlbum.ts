import { useMutation } from '@tanstack/react-query';
import { Api } from '@common/utils';

const handleAddAlbum = async ({ id }: { id: string }): Promise<void> =>
  await Api.put<void>(`me/albums?ids=${id}`);

export const useAddAlbum = () =>
  useMutation({
    mutationFn: handleAddAlbum,
    mutationKey: ['addAlbum'],
  });
